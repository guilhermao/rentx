import { CarsRepositoryInMemory } from "@modules/cars/repositories/inmemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car description 3.",
      daily_rate: 150,
      license_plate: "XYZ-0000",
      fine_amount: 100,
      brand: "Brand 3",
      category_id: "cat3",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Car description 4.",
      daily_rate: 150,
      license_plate: "XYZ-0000",
      fine_amount: 100,
      brand: "Brand TEST",
      category_id: "cat4",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand TEST",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 5",
      description: "Car description 5.",
      daily_rate: 150,
      license_plate: "XYZ-0001",
      fine_amount: 100,
      brand: "Brand TEST",
      category_id: "cat4",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 5",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 6",
      description: "Car description 6.",
      daily_rate: 150,
      license_plate: "XYZ-0002",
      fine_amount: 100,
      brand: "Brand TEST",
      category_id: "cat6",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "cat6",
    });

    expect(cars).toEqual([car]);
  });
});
