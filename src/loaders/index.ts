import { Express } from "express";
import expressLoader from "./express.loader";
import { DataBaseLoader } from "./database.loader";

export default async function(expressApp: Express) {
  await DataBaseLoader.openConnection();
  
  await expressLoader(expressApp);
  console.log('Express Intialized');
}