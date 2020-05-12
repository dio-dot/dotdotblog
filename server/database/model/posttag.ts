import { Model, Table, Column, ForeignKey } from "sequelize-typescript";
import { Post } from "./post";
import { Tag } from "./tag";

@Table({ timestamps: false })
export class PostTag extends Model<PostTag> {
  @ForeignKey(() => Post)
  @Column
  fk_post_id: string;

  @ForeignKey(() => Tag)
  @Column
  fk_tag_id: string;
}
