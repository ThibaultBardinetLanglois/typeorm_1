import { Request, Response } from "express";
import clc from "cli-color";


export function loggerMdw(req: Request, res: Response, next: Function) {
  const getVerbColor = (verb: string) => {
    if (verb === "GET" || verb === "POST") {
      return clc.green(verb)
    } else if (verb === "PUT" || "PATCH") {
      return clc.yellow(verb)
    } else if (verb === "DELETE") {
      return clc.cyan(verb)
    } 
    return verb;
  }

  console.log(clc.magenta('\n-------------------------------\n Logger request description :\n-------------------------------'));
  console.log(clc.cyan('Referer :'), req.headers.referer);
  console.log(clc.cyan('Host :'), req.headers.host);
  console.log(clc.cyan('Hostname :'), req.hostname);
  console.log(clc.cyan('Headers content type :'), JSON.stringify(req.headers));
  console.log(clc.cyan('Remote address :'), JSON.stringify(req.socket.remoteAddress || req.headers['x-forwarded-for']));
  console.log(clc.cyan('Http version :'), req.httpVersion);
  console.log(clc.cyan('Method :'), getVerbColor(req.method));

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(clc.cyan('Url :'), getVerbColor(fullUrl));
  console.log(clc.cyan("Request body :", req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : "empty"));
  console.log(clc.cyan("User agent :", req.headers["user-agent"]));
  
  next();
}

