import { resolver } from "graphql-sequelize";
import { Post, Tag, Category } from "../../database";
import { Op } from "sequelize";

export default {
  Query: {
    getPost: resolver(Post, {
      before: (findOptions, { title }) => {
        findOptions.where = { title };
        return findOptions;
      },
      after: (res) => {
        return res;
      },
    }),
    getPosts: resolver(Post),
    getPostsByCategory: resolver(Post, {
      before: async (findOptions, { category, createdAt }) => {
        if (createdAt) {
          findOptions.where.createdAt = { [Op.lt]: createdAt };
        }
        findOptions = {
          include: [{ model: Category, where: { category } }],
          limit: 10,
          order: [["createdAt", "DESC"]],
        };
        return findOptions;
      },
      after: (res) => {
        return res;
      },
    }),
    getPostsByTag: resolver(Post, {
      before: async (findOptions, { tag, createdAt }) => {
        if (createdAt) {
          findOptions.where.createdAt = { [Op.lt]: createdAt };
        }
        findOptions = {
          include: [{ model: Tag, where: { tag } }],
          limit: 10,
          order: [["createdAt", "DESC"]],
        };
        return findOptions;
      },
      after: (res) => {
        return res;
      },
    }),
  },
  Mutation: {
    createPost: async (parent, { data }) => {
      try {
        let post = await Post.create(data);
        if (data.tags) {
          await post.addTag(data.tags);
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    editPost: async (parent, { data }) => {
      try {
        let post = await Post.findOne({
          where: {
            id: data.id,
          },
          include: [{ model: Tag }],
        });

        post.tags.map((r: Tag) => {
          post.$remove("tags", r);
        });
        if (data.tags) {
          await post.addTag(data.tags);
        }
        await Post.update(data, { where: { id: data.id } });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    deletePost: async (parent, { id }) => {
      try {
        let res = await Post.destroy({
          where: {
            id,
          },
        });
        return res ? true : false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  Post: {
    tags: resolver(Post.associations.tags),
    category: resolver(Post.associations.category, {
      after: (res) => {
        return res.category;
      },
    }),
  },
};
