import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import { UpdateConsultationDto } from 'src/domain/dtos/consultation/update-consultation.dto';
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
      return this.consultationModel
        .findById<ConsultationDocument>(id)
        .populate('client')
        .populate('nutritionist')
        .lean();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving consultation with id ${id}`,
      );
    }
  }

  async findAll(filters: ConsultationFilters): Promise<Consultation[]> {
    try {
      const { client, nutritionist } = filters;
      const filtersNonNull: ConsultationFilters = {};
      if (client) filtersNonNull.client = client;
      if (nutritionist) filtersNonNull.nutritionist = nutritionist;

      const consultations = await this.consultationModel
        .find<ConsultationDocument>(filtersNonNull)
        .populate('client')
        .populate('nutritionist')
        .exec();
      return consultations;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving consultations');
    }
  }

  async create(consultationDto: CreateConsultationDto): Promise<Consultation> {
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

  async update(consultation: UpdateConsultationDto): Promise<Consultation> {
    try {
      return await this.consultationModel.findByIdAndUpdate(
        consultation.id,
        consultation,
      );
    } catch (error) {
      throw new InternalServerErrorException('Error updating consultation');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.consultationModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException('Erro deleting consultation');
    }
  }
}
