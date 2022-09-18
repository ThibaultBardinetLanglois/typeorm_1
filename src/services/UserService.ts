import User from "../entities/user.entity";
import databaseConfig from "../config/database/config";

const userRepository = databaseConfig.getRepository(User);

export class UserService {

  public static async getAll(): Promise<Array<User>> {
    const users: User[] = await userRepository.find();
    return users;
  }

  public static async getById(id: number) {
    const user = await userRepository.findOneBy({
      id: id
    });
    return user;
  }

  public static async create(user: User) {
    const createdUser = await userRepository.save(user);
    return createdUser;
  }
}