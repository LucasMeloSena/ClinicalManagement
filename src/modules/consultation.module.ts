import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultationController } from 'src/controllers/consultation';
import { ClientSchema, ClientSchemaFactory } from 'src/domain/models/Client';
import {
  ConsultationSchema,
  ConsultationSchemaFactory,
} from 'src/domain/models/Consultation';
import { CreateConsultation } from 'src/domain/use-cases/consultation/create';
import { MongooseConsultationRepository } from 'src/infrastructure/repositories/consultation.mongoose';
import { NutritionistModule } from './nutritionist.module';
import { FindAllConsultations } from 'src/domain/use-cases/consultation/find-all';
import { DateProvider } from 'src/utils/dates';

@Module({
  controllers: [ConsultationController],
  imports: [
    MongooseModule.forFeature([
      { name: ConsultationSchema.name, schema: ConsultationSchemaFactory },
      { name: ClientSchema.name, schema: ClientSchemaFactory },
    ]),
    NutritionistModule,
  ],
  providers: [
    {
      provide: 'IConsultationRepository',
      useClass: MongooseConsultationRepository,
    },
    CreateConsultation,
    FindAllConsultations,
    DateProvider,
  ],
  exports: ['IConsultationRepository'],
})
export class ConsultationModule {}
