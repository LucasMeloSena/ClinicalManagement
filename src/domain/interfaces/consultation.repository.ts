import { ConsultationDto } from '../dtos/Consultation-dto';
import { Consultation } from '../models/Consultation';

export interface IConsultationRepository {
  findAll(filters: ConsultationFilters): Promise<Consultation[]>;
  create(consultation: ConsultationDto): Promise<Consultation>;
}
