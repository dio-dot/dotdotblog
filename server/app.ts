import express, { Request, Response } from "express";
import { ENV } from "./config";
import next from "next";
import morgan from "morgan";
import jwt from "express-jwt";
import cors from "cors";

import { ApolloServer } from "apollo-server-express";
import { sequelize } from "./database";
import { schema } from "./graphql";

import router from "./routers";

const dev = ENV.NODE_ENV !== "production";
const port = ENV.PORT;
const jwtMiddleware = jwt({
  secret: ENV.JWT_ENCRYPTION,
  credentialsRequired: false,
});
const apolloServer = new ApolloServer({
  schema,
  playground: true,
  context: ({ req }) => {
    let nreq = <any>req;
    return { user: nreq.user };
  },
});
/** next setting */
const nextServer = next({ dir: "./client", dev });
const handle = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
  const app = express();
  /** middleware */
  app.use(jwtMiddleware);
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, // <-- REQUIRED backend setting
    })
  );
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", router);
  apolloServer.applyMiddleware({ app });

  app.get("*", (req: Request, res: Response) => {
    return handle(req, res);
  });
  app.listen(port, async () => {
    try {
      console.log(
        `server running on http://localhost:${port} mode:${ENV.NODE_ENV}`
      );
      sequelize.sync();
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});
