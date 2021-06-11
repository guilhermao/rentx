import { Request, Response } from "express";
import { container } from "tsyringe";

import { RentalDevolutionUseCase } from "./rentalDevolutionUseCase";

class RentalDevolutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const rentalDevolutionUseCase = container.resolve(RentalDevolutionUseCase);

    const rentalDevolution = await rentalDevolutionUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(rentalDevolution);
  }
}

export { RentalDevolutionController };
