import express from "express";
import dotenv from "dotenv";
import { connection } from "./database.js";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@as-integrations/express4";
import UserResolver from "./Resolver/UserResolver.js";

dotenv.config();

const app = express();
const schema = await buildSchema({resolvers :[UserResolver]})
const server = new ApolloServer({schema})
server.start()

app.use(express.json());
await connection();
app.use("/graphql",express.json(),expressMiddleware(server))
app.listen(process.env.PORT, () => {
  console.log("server started");
});
