import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver } from "graphql";
import { User } from "../../database/model/user";

export class IsAuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      let userInfo;
      [, {}, { user: userInfo }] = args;
      if (!userInfo) {
        throw new Error("User not authenticated");
      }
      let authUser = await User.findOne({ where: { id: userInfo.id } });
      if (!authUser) {
        throw new Error(
          "JWT token received, User not found, and not authenticated"
        );
      }

      args[2].authUser = authUser;
      return resolve.apply(this, args);
    };
  }
}
