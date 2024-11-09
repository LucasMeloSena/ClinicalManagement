import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INutritionistRepository } from 'src/domain/interfaces/nutritionist.repository';
import {
  Nutritionist,
  NutritionistSchema,
} from 'src/domain/models/Nutritionist';

@Injectable()
export class MongooseNutritionistRepository implements INutritionistRepository {
  constructor(
    @InjectModel(NutritionistSchema.name)
    private nutritionistModel: Model<Nutritionist>,
  ) {}

  async findById(id: string): Promise<Nutritionist> {
    try {
      const nutritionist = await this.nutritionistModel.findById(id);

      if (!nutritionist) {
        throw new BadRequestException(`Nutritionist with ${id} wasn't found.`);
      }

      return nutritionist;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error searching nutritionist by id.',
      );
    }
  }

  async findByEmail(email: string): Promise<Nutritionist> {
    try {
      const nutritionist = await this.nutritionistModel.findOne({
        email,
      });

      if (!nutritionist) {
        throw new BadRequestException(
          `Nutritionist with ${email} wasn't found.`,
        );
      }

      return nutritionist;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error searching nutritionist by email.',
      );
    }
  }
}
