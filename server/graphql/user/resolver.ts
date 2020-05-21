import { User } from "../../database/model/user";
import { resolver } from "graphql-sequelize";
import { to } from "await-to-js";
export default {
  Query: {
    getUser: resolver(User, {
      before: async (findOptions, {}, { user, authUser }) => {
        if (authUser) {
          findOptions.where = { id: user.id };
        }
        return findOptions;
      },
      after: (res) => {
        return res;
      },
    }),
    loginUser: resolver(User, {
      before: async (findOptions, { email }) => {
        console.log(email);
        findOptions.where = { email };

        return findOptions;
      },
      after: async (user: User, { password }, { res }) => {
        let [err, result] = await to(user.comparePassword(password));
        if (err) {
          return err;
        } else {
          res.cookie("token", user.getJwt().split(" ")[1], {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
          });
          user.is_login = true;
          return user;
        }
      },
    }),
  },
  Mutation: {
    createUser: async (parent, { data }, { res }) => {
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
