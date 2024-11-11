import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
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

  async findById(id: string): Promise<Consultation> {
    try {
      return this.consultationModel.findById<ConsultationDocument>(id).populate('client').populate('nutritionist')
    } catch (error) {
      throw new InternalServerErrorException(`Error retrieving consultation with id ${id}`)
    }
  }

  async findAll(filters: ConsultationFilters): Promise<Consultation[]> {
    try {
      const { client, nutritionist } = filters;
      const filtersNonNull: ConsultationFilters = {};
      if (client) filtersNonNull.client = client;
      if (nutritionist) filtersNonNull.nutritionist = nutritionist;

      const consultations =
        await this.consultationModel.find<ConsultationDocument>(filtersNonNull).populate('client').populate('nutritionist').exec();
      return consultations;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving consultations');
    }
  }

  // async findById(id: string): Promise<Consultation> {}

  async create(consultationDto: CreateConsultationDto): Promise<Consultation> {
    try {
      const createdConsultation =
        await this.consultationModel.create<ConsultationDocument>(
          consultationDto,
        );
      return createdConsultation;
    } catch (error) {
      console.log((error as Error).message);
      throw new InternalServerErrorException('Error creating consultation.');
    }
  }

  // async update(consultation: Consultation): Promise<Consultation> {}

  // async delete(id: string): Promise<void> {}
}
