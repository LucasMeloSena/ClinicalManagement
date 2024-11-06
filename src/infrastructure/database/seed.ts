import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Nutritionist,
  NutritionistSchema,
} from 'src/domain/models/Nutritionist';
import { Model } from 'mongoose';
import { ConsultationSchema } from 'src/domain/models/Consultation';
import { HashProvider } from 'src/utils/encryption';

@Injectable()
export class Seed {
  constructor(
    @InjectModel(NutritionistSchema.name)
    private readonly nutritionistModel: Model<NutritionistSchema>,
    @InjectModel(ConsultationSchema.name)
    private readonly consultationModel: Model<ConsultationSchema>,
    private readonly hashProvider: HashProvider,
  ) {}

  @Command({
    command: 'create:nutritionist',
    describe: 'create a nutritionist',
  })
  async exec() {
    const nutricionists = await this.nutritionistModel.find();
    if (nutricionists.length === 0) {
      await this.nutritionistModel.deleteMany();
      await this.consultationModel.deleteMany();

      const salt = await this.hashProvider.genSalt();
      const nutritionists: Nutritionist[] = [
        {
          name: 'John Doe',
          email: 'johndoe@email.com',
          password: await this.hashProvider.hashPassword('123456', salt),
        },
        {
          name: 'Artur Oliveira',
          email: 'artur@email.com',
          password: await this.hashProvider.hashPassword('123456', salt),
        },
      ];
      await this.nutritionistModel.insertMany(nutritionists);
    }
  }
}
