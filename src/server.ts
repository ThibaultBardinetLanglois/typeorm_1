import loaders from "./loaders";
import config from "./config"
import express from "express";


const startServer = async () => { 

  const app = express();

  await loaders(app);

  app.listen(config.server_port, () => {
    console.log(`The application is listening on port ${config.server_port}!`);
  })
}

startServer();




