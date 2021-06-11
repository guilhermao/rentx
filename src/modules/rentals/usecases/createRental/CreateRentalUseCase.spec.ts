import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/inmemory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inmemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateprovider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayPlus24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test car description",
      daily_rate: 100,
      license_plate: "TEST-1234",
      fine_amount: 25,
      category_id: "123abc",
      brand: "Test",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "010101",
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if another one exists to the same user.", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayPlus24Hours,
      user_id: "010101",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "010101",
        car_id: "010101",
        expected_return_date: dayPlus24Hours,
      })
    ).rejects.toEqual(
      new AppError("Currently already exists a rental for user.")
    );
  });

  it("Should not be able to create a new rental if another one exists to the same car.", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayPlus24Hours,
      user_id: "010101",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayPlus24Hours,
      })
    ).rejects.toEqual(new AppError("Car is not available."));
  });

  it("Should not be able to create a new rental with invalid minimum time interval.", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time."));
  });
});
