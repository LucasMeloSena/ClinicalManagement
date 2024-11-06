import { CreateConsultationDto } from '../dtos/consultation/create-consultation.dto';
import { Consultation } from '../models/Consultation';

export interface IConsultationRepository {
  findAll(filters: ConsultationFilters): Promise<Consultation[]>;
  create(consultation: CreateConsultationDto): Promise<Consultation>;
}
