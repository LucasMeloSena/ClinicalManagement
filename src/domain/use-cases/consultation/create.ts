import { Inject, Injectable } from '@nestjs/common';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';
import { ValidateConsultationTimeProvider } from 'src/utils/validate-consultation-time';

@Injectable()
export class CreateConsultation {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
    private readonly validatorProvider: ValidateConsultationTimeProvider,
  ) {}

  async execute(consultation: CreateConsultationDto) {
    await this.validatorProvider.execute(consultation);
    return await this.consultationRepository.create(consultation);
  }
}
