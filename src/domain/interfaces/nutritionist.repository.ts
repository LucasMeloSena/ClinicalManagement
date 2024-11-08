import { Nutritionist } from '../models/Nutritionist';

export interface INutritionistRepository {
  findById(id: string): Promise<Nutritionist>;
}
