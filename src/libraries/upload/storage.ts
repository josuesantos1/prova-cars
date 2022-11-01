import path from 'path';
import fs from 'fs';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';


const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');


export class Storage {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-2',
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey
        });
    }

    async save(file: Express.Multer.File) {
        const originalPath = path.resolve(tmpFolder, file.filename);

        const fileContent = await fs.promises.readFile(originalPath);

        const bucket = process.env.BUCKET as string

        this.client
        .putObject({
            Bucket: bucket,
            Key: file.filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: file.mimetype,
        })
        .promise();

        await fs.promises.unlink(originalPath);
        return file.filename
    }

    async delete(filename: string): Promise<void> {
        const bucket = process.env.BUCKET as string

        await this.client
        .deleteObject({
            Bucket: bucket,
            Key: filename,
        })
        .promise();
    }

    async view(key: string) {
        const bucket = process.env.BUCKET as string

        var file = require('fs').createWriteStream('/tmp/'+key);

        return await this.client.getSignedUrl('getObject', {
            Key: key,
            Bucket: bucket,
            Expires: 60 * 60
        })
    }
}

