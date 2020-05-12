import { Table, Column, HasMany, Model, DataType } from "sequelize-typescript";
import { Post } from "./post";

@Table({ timestamps: false })
export class Category extends Model<Category> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;
  @Column({ type: DataType.STRING, unique: true })
  category: string;
  @HasMany(() => Post)
  posts: Post[];
}
