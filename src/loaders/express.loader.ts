import express from "express";
import { Request, Response, Express } from 'express';
import cors from 'cors';
import apiRouter from '../api/routes/api.routes';
import logger from '../middlewares/console/logger.middleware';
import morganMdw from '../middlewares/console/morgan.middleware';

import config from "../config/index";

export default async function(app: Express) {
  
  app.enable('trust proxy');

  app.use(cors());
  app.use(logger);
  app.use(morganMdw)
  app.use(express.json());
  app.use('/api', apiRouter);

  app.get('/status', (req: Request, res: Response) => { 
    res.status(200).send(`The server responds well on port ${config.server_port}`); 
  });
}




