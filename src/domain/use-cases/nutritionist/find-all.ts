import { Inject, Injectable } from '@nestjs/common';
import { INutritionistRepository } from 'src/domain/interfaces/nutritionist.repository';
import { Nutritionist } from 'src/domain/models/Nutritionist';

@Injectable()
export class FindAllNutritionists {
  constructor(
    @Inject('INutritionistRepository')
    private readonly nutritionistRepository: INutritionistRepository,
  ) {}

  async execute(): Promise<Nutritionist[]> {
    const nutritionists = await this.nutritionistRepository.findAll();
    return nutritionists;
  }
}
