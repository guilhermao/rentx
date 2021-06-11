import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalByCarId = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return rentalByCarId;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUserId = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return rentalByUserId;
  }

  async findById(id: string): Promise<Rental> {
    const rentalById = await this.repository.findOne(id);

    return rentalById;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.repository.find({
      where: {
        user_id,
      },
      relations: ["car"],
    });

    return rentalsByUser;
  }
}

export { RentalsRepository };
