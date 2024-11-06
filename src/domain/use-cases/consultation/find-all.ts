import { Inject, Injectable } from '@nestjs/common';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';
import { Consultation } from 'src/domain/models/Consultation';
import { PaginationDefaultsEnum } from 'src/utils/enums/pagination-default.enum';

@Injectable()
export class FindAllConsultations {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
  ) {}

  async execute(filters: ConsultationFilters): Promise<Consultation[]> {
    filters.page = filters.page || PaginationDefaultsEnum.PAGE;
    filters.limit = filters.limit || PaginationDefaultsEnum.LIMIT;
    const consultations = await this.consultationRepository.findAll(filters);
    return consultations;
  }
}
