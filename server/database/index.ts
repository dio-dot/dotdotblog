import { Sequelize } from "sequelize-typescript";
import { ENV } from "../config";
export { Post } from "./model/post";
export { Category } from "./model/category";
export { Tag } from "./model/tag";
export { PostTag } from "./model/posttag";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: ENV.DB_HOST,
  database: ENV.DB_NAME,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  port: +ENV.DB_PORT,
  logging: false,
  storage: ":memory:",
  modelPaths: [__dirname + "/model/*.ts"],
  modelMatch: (filename, member) => {
    return filename === member.toLowerCase();
  },
});
