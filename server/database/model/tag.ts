import {
  Model,
  Table,
  Column,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import { Post } from "./post";
import { PostTag } from "./posttag";

@Table({ timestamps: false })
export class Tag extends Model<Tag> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;
  @Column
  tag: string;
  @BelongsToMany(() => Post, () => PostTag)
  posts: Post[];
}
