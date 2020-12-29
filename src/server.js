import "./env"
import "./passport";
import schema from "./schema"
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan"
import passport from "passport";
import { authenticateJwt } from "./passport";

const {query} = require('../sql/mybatis')
const PORT = process.env.PORT||4000;
const server = new GraphQLServer({schema,context: ({ request }) => ({ request,query })});


server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);