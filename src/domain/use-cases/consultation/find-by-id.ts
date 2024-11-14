import { Inject, Injectable } from '@nestjs/common';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';

@Injectable()
export class FindConsultationByid {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
  ) {}

  async execute(id: string) {
    return await this.consultationRepository.findById(id);
  }
}
