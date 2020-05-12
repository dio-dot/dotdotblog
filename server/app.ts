import express, { Request, Response } from "express";
import { ENV } from "./config";
import next from "next";
import morgan from "morgan";

import { ApolloServer } from "apollo-server-express";
import { sequelize } from "./database";
import { schema } from "./graphql";

import router from "./routers";

const dev = ENV.NODE_ENV !== "production";
const port = ENV.PORT;

/** next setting */
const nextServer = next({ dir: "./client", dev });
const handle = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req: Request }) => {
      return {};
    },
  });
  apolloServer.applyMiddleware({ app });
  /** middleware */
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", router);

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
