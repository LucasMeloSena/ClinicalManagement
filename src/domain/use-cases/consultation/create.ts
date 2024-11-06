import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';
import { DateProvider } from 'src/utils/dates';

@Injectable()
export class CreateConsultation {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
    private readonly dateProvider: DateProvider,
  ) {}

  async execute(consultation: CreateConsultationDto) {
    const isInvalidTime =
      this.dateProvider.blockCreateANewConsultationBeforeToday(
        consultation.start_at,
        consultation.end_at,
      );
    if (isInvalidTime)
      throw new BadRequestException('The provided dates are before today.');

    const consultationsByClient = await this.consultationRepository.findAll({
      clientId: consultation.clientId,
    });
    const consultationsByNutritionist =
      await this.consultationRepository.findAll({
        nutritionistId: consultation.nutritionistId,
      });

    const isInvalidNutricionistTime =
      this.dateProvider.verifyIfUserAlreadyHasAConsultation(
        consultationsByNutritionist,
        consultation.start_at,
        consultation.end_at,
      );

    const isInvalidClientTime =
      this.dateProvider.verifyIfUserAlreadyHasAConsultation(
        consultationsByClient,
        consultation.start_at,
        consultation.end_at,
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

    const createdCnsultation =
      await this.consultationRepository.create(consultation);
    return createdCnsultation;
  }
}
