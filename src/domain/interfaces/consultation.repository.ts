import { CreateConsultationDto } from '../dtos/consultation/create-consultation.dto';
import { Consultation } from '../models/Consultation';

export interface IConsultationRepository {
  findById(id: string): Promise<Consultation>
  findAll(filters: ConsultationFilters): Promise<Consultation[]>;
  create(consultation: CreateConsultationDto): Promise<Consultation>;
}
