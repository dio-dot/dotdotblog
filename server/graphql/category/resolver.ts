import { Post, Tag, Category } from "../../database";

export default {
  Query: {},
  Mutation: {
    createCategory: async (parent, { category }) => {
      try {
        let res = await Category.create({ category });
        return res;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  Post: {},
};
