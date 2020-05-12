import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";

const types = fileLoader(__dirname + "/**/*.graphql");
const resolvers = fileLoader(__dirname + "/**/*.ts");

export const schema = makeExecutableSchema({
  typeDefs: mergeTypes(types),
  resolvers: mergeResolvers(resolvers),
});
