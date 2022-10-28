import { Request, Response } from "express";

class AppEndpoint{

    public home(req:Request, res:Response) {
      return res.json({
        response: 'HI!'
      });
    }
}

export const appEndpoint = new AppEndpoint();

