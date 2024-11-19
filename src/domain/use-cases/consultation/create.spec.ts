import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { CreateConsultation } from './create';
import { ConsultationSchema } from 'src/domain/models/Consultation';
import {
  consultationRepositoryMock,
  createConsultationMock,
  createdConsultationMock,
  validateConsultationTimeProviderMock,
} from 'src/testing/mocks/consultation';
import { DateProvider } from 'src/utils/dates';

describe('Create Consultation', () => {
  let createConsultation: CreateConsultation;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateConsultation,
        {
          provide: getModelToken(ConsultationSchema.name),
          useValue: createdConsultationMock,
        },
        {
          provide: 'IConsultationRepository',
          useValue: consultationRepositoryMock,
        },
        {
          provide: 'ConsultationValidator',
          useValue: validateConsultationTimeProviderMock,
        },
        DateProvider,
      ],
    }).compile();

    createConsultation = module.get<CreateConsultation>(CreateConsultation);
  });

  it('should create a new consultation', async () => {
    const createdConsultation = await createConsultation.execute(
      createConsultationMock,
    );

    expect(createdConsultation).toBeDefined();
    expect(validateConsultationTimeProviderMock.execute).toHaveBeenCalledWith(
      createConsultationMock,
    );
    expect(consultationRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it('should throw exception with wrong data', async () => {
    validateConsultationTimeProviderMock.execute.mockImplementation(() => {
      throw new UnprocessableEntityException(
        'The provided dates are before today.',
      );
    });
    await expect(async () => {
      await createConsultation.execute({
        ...createConsultationMock,
        startAt: new Date(2024, 9, 10),
      });
    }).rejects.toBeInstanceOf(UnprocessableEntityException);
  });
});
