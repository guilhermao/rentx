import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  createUser(userData: ICreateUserDTO): Promise<void>;
  findUserByEmail(email: string): Promise<User>;
  findById(userId: string): Promise<User>;
}

export { IUsersRepository };
