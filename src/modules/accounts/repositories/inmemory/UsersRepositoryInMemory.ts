import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async createUser({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    });

    this.users.push(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(userId: string): Promise<User> {
    return this.users.find((user) => user.id === userId);
  }
}

export { UsersRepositoryInMemory };
