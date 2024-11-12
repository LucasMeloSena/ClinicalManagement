import { Inject, Injectable } from '@nestjs/common';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';
import { ValidateConsultationTimeProvider } from 'src/utils/validate-consultation-time';
import * as dayjs from 'dayjs';

@Injectable()
export class CreateConsultation {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
    private readonly validatorProvider: ValidateConsultationTimeProvider,
  ) {}

  async execute(consultation: CreateConsultationDto) {
    await this.validatorProvider.execute(consultation);
    const createdConsultation =
      await this.consultationRepository.create(consultation);

    if (consultation.intervalOfDaysToRepeat) {
      let nextStartDate = dayjs(consultation.startAt);
      let nextEndDate = dayjs(consultation.endAt);
      const maxRecords = 10;

      for (let i = 0; i <= maxRecords; i++) {
        nextStartDate = nextStartDate.add(
          consultation.intervalOfDaysToRepeat,
          'day',
        );
        nextEndDate = nextEndDate.add(
          consultation.intervalOfDaysToRepeat,
          'day',
        );

        consultation.startAt = nextStartDate.toDate();
        consultation.endAt = nextEndDate.toDate();
        await this.validatorProvider.execute(consultation);
        await this.consultationRepository.create(consultation);
      }
    }

    return createdConsultation;
  }
}
