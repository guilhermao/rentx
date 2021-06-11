import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class RentalDevolutionUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: RentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimumDaily = 1;

    if (!rental) {
      throw new AppError("This rental does not exists.");
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareDateInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );
    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareDateInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}

export { RentalDevolutionUseCase };
