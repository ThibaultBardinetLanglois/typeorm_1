import User from "../entities/user.entity";
import databaseConfig from "../config/database/config";

const userRepository = databaseConfig.getRepository(User);

export class UserService {

  public static async getAll(): Promise<Array<User>> {
    return await userRepository.find();
  }

  public static async getById(id: number): Promise<User | null> {
    return await userRepository.findOneBy({
      id: id
    });
  }

  public static async create(user: User): Promise<User> {
    return await userRepository.save(user);
  }

  public static async update(userId: number, user: User): Promise<User> {
    const userToUpdate = await userRepository.findOneBy({
      id: userId
    });
    const updatedUser = {...userToUpdate, ...user};
    return await userRepository.save(updatedUser);
  }

  public static async delete(userId: number) {
    const userToRemove = await userRepository.findOneBy({id: userId});
    if (userToRemove) {
      return await userRepository.remove(userToRemove);
    } else {
      throw new Error("Problem to remove user or user doesn't exist in database")
    }
  }
}