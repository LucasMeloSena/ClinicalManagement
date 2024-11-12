import {
  BadRequestException,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Consultation } from 'src/domain/models/Consultation';
import { DateProvider } from './dates';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';

export class ValidateConsultationTimeProvider {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
    private readonly dateProvider: DateProvider,
  ) {}

  async execute(consultation: Consultation) {
    const isInvalidTime = this.dateProvider.blockDateBeforeToday(
      consultation.startAt,
      consultation.endAt,
    );
    if (isInvalidTime)
      throw new UnprocessableEntityException(
        'The provided dates are before today.',
      );

    const consultationsByClient = await this.consultationRepository.findAll({
      client: consultation.client as string,
    });
    const consultationsByNutritionist =
      await this.consultationRepository.findAll({
        nutritionist: consultation.nutritionist as string,
      });

    const isInvalidNutricionistTime =
      this.dateProvider.verifyIfUserAlreadyHasAConsultation(
        consultationsByNutritionist,
        consultation.startAt,
        consultation.endAt,
      );

    const isInvalidClientTime =
      this.dateProvider.verifyIfUserAlreadyHasAConsultation(
        consultationsByClient,
        consultation.startAt,
        consultation.endAt,
      );

    if (isInvalidNutricionistTime) {
      throw new BadRequestException(
        'This nutritionist already has a consultation in this time.',
      );
    } else if (isInvalidClientTime) {
      throw new BadRequestException(
        'This client already has a consultation in this time.',
      );
    }
  }
}
