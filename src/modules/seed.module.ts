import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import {
  ConsultationSchema,
  ConsultationSchemaFactory,
} from 'src/domain/models/Consultation';
import {
  NutritionistSchema,
  NutritionistSchemaFactory,
} from 'src/domain/models/Nutritionist';
import { Seed } from 'src/infrastructure/database/seed';
import { HashProvider } from 'src/infrastructure/encryption';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([
      { name: ConsultationSchema.name, schema: ConsultationSchemaFactory },
      { name: NutritionistSchema.name, schema: NutritionistSchemaFactory },
    ]),
  ],
  providers: [Seed, HashProvider],
  exports: [Seed],
})
export class SeedModule {}
