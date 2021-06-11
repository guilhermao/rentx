import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface ISpecificationRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ISpecificationRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findSpecificationByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists.");
    }

    await this.specificationsRepository.createSpecification({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
