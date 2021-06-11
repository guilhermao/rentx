import csvParse from "csv-parse";
import fileSystem from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const fileStream = fileSystem.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const fileParse = csvParse();

      fileStream.pipe(fileParse);

      fileParse
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fileSystem.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExistsOnImport =
        await this.categoriesRepository.findCategoryByName(name);

      if (!categoryAlreadyExistsOnImport) {
        await this.categoriesRepository.createCategory({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
