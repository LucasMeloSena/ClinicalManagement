import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema, ClientSchemaFactory } from 'src/domain/models/Client';
import {
  ConsultationSchema,
  ConsultationSchemaFactory,
} from 'src/domain/models/Consultation';
import { CreateConsultation } from 'src/domain/use-cases/consultation/create';
import { MongooseConsultationRepository } from 'src/infrastructure/repositories/consultation.mongoose';
import { FindAllConsultations } from 'src/domain/use-cases/consultation/find-all';
import { DateProvider } from 'src/utils/dates';
import { ConsultationController } from 'src/controllers/consultation';
import { FindConsultationByid } from 'src/domain/use-cases/consultation/find-by-id';
import { UpdateConsultation } from 'src/domain/use-cases/consultation/update';
import { DeleteConsultation } from 'src/domain/use-cases/consultation/delete';
import { ValidateConsultationTimeProvider } from 'src/utils/validate-consultation-time';

@Module({
  controllers: [ConsultationController],
  imports: [
    MongooseModule.forFeature([
      { name: ConsultationSchema.name, schema: ConsultationSchemaFactory },
      { name: ClientSchema.name, schema: ClientSchemaFactory },
    ]),
  ],
  providers: [
    {
      provide: 'IConsultationRepository',
      useClass: MongooseConsultationRepository,
    },
    CreateConsultation,
    FindConsultationByid,
    FindAllConsultations,
    UpdateConsultation,
    DeleteConsultation,
    DateProvider,
    ValidateConsultationTimeProvider,
  ],
  exports: ['IConsultationRepository'],
})
export class ConsultationModule {}
