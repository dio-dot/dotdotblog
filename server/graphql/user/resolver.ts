import { User } from "../../database/model/user";
import { resolver } from "graphql-sequelize";
export default {
  Query: {
    getUser: resolver(User, {
      before: async (findOptions, {}, { user, authUser }) => {
        console.log(user, authUser);
        // findOptions.where = { id: user.id };
        return findOptions;
      },
      after: (res) => {
        return res;
      },
    }),
    loginUser: resolver(User, {
      before: async (findOptions, { email }) => {
        findOptions.where = { email };
        return findOptions;
      },
      after: async (user: User, { password }) => {
        user = await user.comparePassword(password);
        user.is_login = true;
        return user;
      },
    }),
  },
  Mutation: {
    createUser: async (parent, { data }) => {
      try {
        let user = await User.create(data);
        user.is_login = true;
        return user;
      } catch (error) {
        return false;
      }
    },
  },
  User: {
    jwt: (user: User) => user.getJwt(),
  },
};
