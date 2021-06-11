import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface ICategoryRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICategoryRequest): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesRepository.findCategoryByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists.");
    }

    this.categoriesRepository.createCategory({ name, description });
  }
}

export { CreateCategoryUseCase };
