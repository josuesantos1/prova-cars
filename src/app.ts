import * as dotenv from 'dotenv'
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
  }

  private middleware(){
    this.server.use(express.json());
  }

  private router(){
    this.server.use(router);
  }
}
