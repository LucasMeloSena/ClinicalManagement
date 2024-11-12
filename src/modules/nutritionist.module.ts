import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { NutritionistController } from 'src/controllers/nutritionist';
import {
  NutritionistSchema,
  NutritionistSchemaFactory,
} from 'src/domain/models/Nutritionist';
import { MongooseNutritionistRepository } from 'src/infrastructure/repositories/nutritionist.mongoose';
import { HashProvider } from 'src/utils/encryption';
import { JwtAuthToken, JwtProvider } from 'src/utils/jwt';
import { ClientModule } from './client.module';
import { LoginNutritionist } from 'src/domain/use-cases/nutritionist/login';
import { FindAllNutritionists } from 'src/domain/use-cases/nutritionist/find-all';

@Module({
  controllers: [NutritionistController],
  imports: [
    MongooseModule.forFeature([
      { name: NutritionistSchema.name, schema: NutritionistSchemaFactory },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '60min',
      },
    }),
    PassportModule,
    ClientModule,
  ],
  providers: [
    {
      provide: 'INutritionistRepository',
      useClass: MongooseNutritionistRepository,
    },
    HashProvider,
    JwtProvider,
    JwtAuthToken,
    LoginNutritionist,
    FindAllNutritionists,
  ],
  exports: ['INutritionistRepository'],
})
export class NutritionistModule {}
