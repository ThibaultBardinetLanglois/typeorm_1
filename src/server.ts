import loaders from "./loaders";
import express, { Express } from "express";


const startServer = async () => { 

  const app: Express = express();

  await loaders(app);
}

void startServer();




