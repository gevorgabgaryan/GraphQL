import express from 'express';
import cors from 'cors';
import http from 'http';
import config from '../config';
import {checkAuthorization} from '../middlewares/checkAuthorization';

const port = config.port

class API {
   static async init() {
   const app = express();
   app.use(express.json())
   app.use(cors())
   app.use(checkAuthorization)
   const httpServer = http.createServer(app);
   httpServer.listen({ port: config.port}, () => {
      console.log(`Server ready at http://localhost:${config.port}`);
    });
  }
}

export default API;
