import { Inject, Injectable } from '@nestjs/common';
import { UpdateConsultationDto } from 'src/domain/dtos/consultation/update-consultation.dto';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';
import { ValidateConsultationTimeProvider } from 'src/utils/validate-consultation-time';

@Injectable()
export class UpdateConsultation {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
    private readonly validatorProvider: ValidateConsultationTimeProvider,
  ) {}

  async execute(consultation: UpdateConsultationDto) {
    if (consultation.startAt || consultation.endAt) {
      const foundConsultation = await this.consultationRepository.findById(
        consultation.id,
      );
      foundConsultation.startAt = consultation.startAt
        ? consultation.startAt
        : foundConsultation.startAt;
      foundConsultation.endAt = consultation.endAt
        ? consultation.endAt
        : foundConsultation.endAt;
      await this.validatorProvider.execute(foundConsultation);
    }
    return await this.consultationRepository.update(consultation);
  }
}
