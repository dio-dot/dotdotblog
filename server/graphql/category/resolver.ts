import { Post, Tag, Category } from "../../database";

export default {
  Query: {},
  Mutation: {
    createCategory: async (parent, { category }) => {
      try {
        await Category.create({ category });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  Post: {},
};
