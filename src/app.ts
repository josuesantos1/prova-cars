import * as dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()


import express from "express";
import { router } from "./router";
import "reflect-metadata"

export class App{
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
    this.log();
    this.cors();
  }

  private middleware(){
    this.server.use(express.json());
  }

  private router(){
    this.server.use(router);
  }

  private log() {
    this.server.use(morgan('common'))
  }

  private cors() {
    this.server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        this.server.use(cors());
        next();
    });
  }
}
