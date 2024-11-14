import { Inject, Injectable } from '@nestjs/common';
import { INutritionistRepository } from 'src/domain/interfaces/nutritionist.repository';
import { Nutritionist } from 'src/domain/models/Nutritionist';

@Injectable()
export class FindNutritionistById {
  constructor(
    @Inject('INutritionistRepository')
    private readonly nutritionistRepository: INutritionistRepository,
  ) {}

  async execute(id: string): Promise<Nutritionist> {
    return await this.nutritionistRepository.findById(id);
  }
}
