import { CreateConsultationDto } from '../dtos/consultation/create-consultation.dto';
import { UpdateConsultationDto } from '../dtos/consultation/update-consultation.dto';
import { Consultation } from '../models/Consultation';

export interface IConsultationRepository {
  findById(id: string): Promise<Consultation>;
  findAll(filters: ConsultationFilters): Promise<Consultation[]>;
  create(consultation: CreateConsultationDto): Promise<Consultation>;
  update(consultation: UpdateConsultationDto): Promise<Consultation>;
  delete(id: string): Promise<void>;
}
