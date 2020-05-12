import {
  Model,
  Table,
  Column,
  BelongsToMany,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { PostTag } from "./posttag";
import { Category } from "./category";
import { Tag } from "./tag";

@Table({ timestamps: true })
export class Post extends Model<Post> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;
  @Column({ type: DataType.STRING })
  title: string;
  @Column({ type: DataType.TEXT })
  content: string;
  @Column({ type: DataType.STRING })
  description: string;
  @Column({ type: DataType.STRING })
  thumbnail: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_temp: boolean;
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_open: boolean;

  @ForeignKey(() => Category)
  category_id: string;
  @BelongsToMany(() => Tag, () => PostTag)
  tags: Tag[];
  @BelongsTo(() => Category)
  category: Category;

  async addTag(tags) {
    let res = await Promise.all(
      tags.map((v) => {
        return Tag.findOrCreate({
          where: {
            tag: v,
          },
        });
      })
    );
    await Promise.all(
      res.map((r) => {
        return this.$add("tags", r[0]);
      })
    );
  }
}

export type PostModel = {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail: string;
  is_temp: boolean;
  is_open: boolean;
  tags?: [TagModel];
  category?: CategoryModel;
};

export type TagModel = {
  id: string;
  tag: string;
  posts?: [PostModel];
};

export type CategoryModel = {
  id: string;
  category: string;
  posts?: [PostModel];
};
