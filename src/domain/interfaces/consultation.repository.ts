import { Consultation } from '../models/Consultation';

export interface IConsultationRepository {
  findAll(filters: ConsultationFilters): Promise<Consultation[]>;
  findById(id: string): Promise<Consultation>;
  create(consultation: Consultation): Promise<Consultation>;
  update(consultation: Consultation): Promise<Consultation>;
  delete(id: string): Promise<void>;
}
