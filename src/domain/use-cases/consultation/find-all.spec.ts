import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConsultationSchema } from 'src/domain/models/Consultation';
import {
  consultationRepositoryMock,
  createdConsultationMock,
} from 'src/testing/mocks/consultation';
import { DateProvider } from 'src/utils/dates';
import { FindAllConsultations } from './find-all';
import { createdClientMock } from 'src/testing/mocks/client';

describe('Find All Consultations', () => {
  let findAllConsultations: FindAllConsultations;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllConsultations,
        {
          provide: getModelToken(ConsultationSchema.name),
          useValue: createdConsultationMock,
        },
        {
          provide: 'IConsultationRepository',
          useValue: consultationRepositoryMock,
        },
        DateProvider,
      ],
    }).compile();

    findAllConsultations =
      module.get<FindAllConsultations>(FindAllConsultations);
  });

  it('should find all consultations', async () => {
    const filters: ConsultationFilters = { client: createdClientMock._id };
    const consultations = await findAllConsultations.execute(filters);

    expect(consultations).toBeDefined();
    expect(consultations).toHaveLength(2);
    expect(consultations[0]).toHaveProperty('client');
    expect(consultationRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(consultationRepositoryMock.findAll).toHaveBeenCalledWith(filters);
  });
});
