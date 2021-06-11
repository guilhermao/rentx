import { CarsRepositoryInMemory } from "@modules/cars/repositories/inmemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car.", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Some description.",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 75,
      brand: "Brand",
      category_id: "cat",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with an existent license plate.", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Some description.",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 75,
      brand: "Brand",
      category_id: "cat",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Some description.",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 75,
        brand: "Brand",
        category_id: "cat",
      })
    ).rejects.toEqual(new AppError("Car already exists."));
  });

  it("Should not be able to create a car with available set to true by default.", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Some description.",
      daily_rate: 100,
      license_plate: "ABCD1234",
      fine_amount: 75,
      brand: "Brand",
      category_id: "cat",
    });

    expect(car.available).toBe(true);
  });
});
