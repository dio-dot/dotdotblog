import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import { IsAuthDirective, IsAuthUserDirective } from "./directives";

const types = fileLoader(__dirname + "/**/type.graphql");
const resolvers = fileLoader(__dirname + "/**/resolver.ts");

export const schema = makeExecutableSchema({
  typeDefs: mergeTypes(types),
  resolvers: mergeResolvers(resolvers),
  schemaDirectives: {
    //@ts-ignore
    isAuth: IsAuthDirective,
    //@ts-ignore
    isAuthUser: IsAuthUserDirective,
  },
});
