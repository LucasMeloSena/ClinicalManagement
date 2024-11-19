import { randomUUID } from 'node:crypto';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import { Mocked, vi } from 'vitest';
import { createdClientMock } from '../client/index';
import { UpdateConsultationDto } from 'src/domain/dtos/consultation/update-consultation.dto';
import { Consultation } from 'src/domain/models/Consultation';
import { IConsultationRepository } from 'src/domain/interfaces/consultation.repository';

export const createConsultationMock: CreateConsultationDto = {
  client: createdClientMock._id,
  nutritionist: '1',
  startAt: new Date(),
  endAt: new Date(),
  intervalOfDaysToRepeat: undefined,
};

export const updateConsultationMock: UpdateConsultationDto = {
  nutritionist: '2',
};

export const createdConsultationMock: Consultation = {
  _id: randomUUID(),
  ...createConsultationMock,
};

export const updatedConsultationMock: UpdateConsultationDto = {
  id: createdConsultationMock._id,
  ...updateConsultationMock,
};

export const consultationsMock = [
  createdConsultationMock,
  createdConsultationMock,
];

export const validateConsultationTimeProviderMock = {
  execute: vi.fn().mockResolvedValue(true),
};

export const consultationRepositoryMock: Mocked<IConsultationRepository> = {
  create: vi.fn().mockResolvedValue(createdConsultationMock),
  findById: vi.fn().mockResolvedValue(createdConsultationMock),
  delete: vi.fn().mockResolvedValue(undefined),
  findAll: vi.fn().mockResolvedValue(consultationsMock),
  update: vi.fn().mockResolvedValue(updatedConsultationMock),
};
