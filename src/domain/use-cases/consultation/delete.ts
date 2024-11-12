import { Inject, Injectable } from '@nestjs/common';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';

@Injectable()
export class DeleteConsultation {
  constructor(
    @Inject('IConsultationRepository')
    private readonly consultationRepository: IConsultationRepository,
  ) {}

  async execute(id: string) {
    await this.consultationRepository.delete(id);
  }
}
