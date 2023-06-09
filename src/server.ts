import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import {createConnection, getRepository} from "typeorm";
import helmet from "helmet";
import bodyParser from "body-parser";
import routes from "./routes";

const main = async () => {

  //db connection
  try {
    await createConnection({
      "type": "mariadb",
      "host": "idp-mariadb",
      "port": 3306,
      "username": "socialnetwork",
      "password": "socialnetwork",
      "database": "socialnetwork",
      "synchronize": true,
      "logging": true,
      "entities": [
          "src/entity/*.ts"
      ]
    });
    console.log("Database connection status: \x1b[32mSUCCESSFUL\x1b[0m");
  } catch (e) {
    console.log("Database connection status: \x1b[35mUNSUCCESSFUL\x1b[0m")
  }

  const upload = require('express-fileupload');
  const http = require('http');
  const app = express();
  const server = http.createServer(app);
  const port = 8081;

  //middlewares
  app.use(helmet());
  // app.use(cors({
  //   origin: ['http://localhost:4200']
  // }))
  // app.use(cors());
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(upload());

  //routes
  app.use("/api", routes);

  //listen
  server.listen(port, () => {
    console.log(`App running on port: \x1b[32m${port}\x1b[0m`);
  });
}

main()
