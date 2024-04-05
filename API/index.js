import express from 'express';
import cors from 'cors';
import http from 'http';
import config from '../config';
import {checkAuthorization} from '../middlewares/checkAuthorization';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import schemas from '../schemas';
import resolvers from '../resolvers';


class API {
   static async init() {
   const app = express();
   app.use(express.json())
   app.use(cors())
   app.use(checkAuthorization)
   const httpServer = http.createServer(app);

   const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    expressMiddleware(server, {
      context: async ({ req }) => ({
          user: req.user,
      }),
    })
   );

   httpServer.listen({ port: config.port}, () => {
      console.log(`Server ready at http://localhost:${config.port}`);
    });
  }
}

export default API;
