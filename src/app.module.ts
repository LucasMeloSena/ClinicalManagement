import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultationModule } from './modules/consultation.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './modules/seed.module';
import { ClientModule } from './modules/client.module';
import { NutritionistModule } from './modules/nutritionist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    SeedModule,
    ConsultationModule,
    ClientModule,
    NutritionistModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
