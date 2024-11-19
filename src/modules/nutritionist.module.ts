import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionistController } from 'src/controllers/nutritionist';
import {
  NutritionistSchema,
  NutritionistSchemaFactory,
} from 'src/domain/models/Nutritionist';
import { MongooseNutritionistRepository } from 'src/infrastructure/repositories/nutritionist.mongoose';
import { HashProvider } from 'src/utils/encryption';
import { JwtAuthToken, JwtStrategy } from 'src/utils/jwt';
import { ClientModule } from './client.module';
import { LoginNutritionist } from 'src/domain/use-cases/nutritionist/login';
import { FindAllNutritionists } from 'src/domain/use-cases/nutritionist/find-all';
import { FindNutritionistById } from 'src/domain/use-cases/nutritionist/find-by-id';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [NutritionistController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: NutritionistSchema.name, schema: NutritionistSchemaFactory },
    ]),
    ClientModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN,
      },
    }),
  ],
  providers: [
    {
      provide: 'INutritionistRepository',
      useClass: MongooseNutritionistRepository,
    },
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
    {
      provide: 'JwtAuthToken',
      useClass: JwtAuthToken,
    },
    JwtStrategy,
    LoginNutritionist,
    FindAllNutritionists,
    FindNutritionistById,
  ],
  exports: ['INutritionistRepository'],
})
export class NutritionistModule {}
