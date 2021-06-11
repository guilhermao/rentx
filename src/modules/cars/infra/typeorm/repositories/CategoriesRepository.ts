import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async createCategory({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  async listCategories(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findCategoryByName(name: string): Promise<Category> {
    // SELECT * FROM categories WHERE name = "name" LIMIT 1
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
