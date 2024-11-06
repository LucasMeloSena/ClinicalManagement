import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsultationDto } from 'src/domain/dtos/Consultation-dto';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';
import {
  Consultation,
  ConsultationDocument,
  ConsultationSchema,
} from 'src/domain/models/Consultation';

@Injectable()
export class MongooseConsultationRepository implements IConsultationRepository {
  constructor(
    @InjectModel(ConsultationSchema.name)
    private consultationModel: Model<ConsultationSchema>,
  ) {}
  async findAll(filters: ConsultationFilters): Promise<Consultation[]> {
    try {
      const { clientId, nutritionistId, page, limit } = filters;
      const filtersNonNull: ConsultationFilters = {};
      if (clientId) filtersNonNull.clientId = clientId;
      if (nutritionistId) filtersNonNull.nutritionistId = nutritionistId;

      const consultations = await this.consultationModel
        .find<ConsultationDocument>(filtersNonNull)
        .skip((page - 1) * limit)
        .limit(limit);

      return consultations;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving departments');
    }
  }

  // async findById(id: string): Promise<Consultation> {}

  async create(consultationDto: ConsultationDto): Promise<Consultation> {
    try {
      const createdConsultation =
        await this.consultationModel.create<ConsultationDocument>(
          consultationDto,
        );
      return createdConsultation;
    } catch (error) {
      throw new InternalServerErrorException('Error creating consultation.');
    }
  }

  // async update(consultation: Consultation): Promise<Consultation> {}

  // async delete(id: string): Promise<void> {}
}
