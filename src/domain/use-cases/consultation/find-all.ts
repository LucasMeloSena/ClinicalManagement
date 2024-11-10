import { Inject, Injectable } from '@nestjs/common';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';
import { Consultation } from 'src/domain/models/Consultation';

@Injectable()
export class FindAllConsultations {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
  ) {}

  async execute(filters: ConsultationFilters): Promise<Consultation[]> {
    const consultations = await this.consultationRepository.findAll(filters);
    return consultations;
  }
}
