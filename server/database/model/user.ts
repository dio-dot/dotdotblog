import {
  Table,
  Column,
  Model,
  BeforeSave,
  DataType,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { ENV } from "../../config";

@Table({ timestamps: false })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.ENUM("ADMIN", "GEUST"), defaultValue: "GEUST" })
  type: string;

  jwt: string;
  is_login: boolean;

  @BeforeSave
  static async hashPassword(user: User) {
    try {
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async comparePassword(pw) {
    let pass = await bcrypt.compare(pw, this.password);

    if (!pass) {
      throw "Invalid password";
    }

    return this;
  }

  getJwt() {
    return (
      "Bearer " +
      jsonwebtoken.sign(
        {
          id: this.id,
        },
        ENV.JWT_ENCRYPTION,
        { expiresIn: ENV.JWT_EXPIRATION }
      )
    );
  }
}
