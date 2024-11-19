import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConsultationSchema } from 'src/domain/models/Consultation';
import {
  consultationRepositoryMock,
  createdConsultationMock,
} from 'src/testing/mocks/consultation';
import { DateProvider } from 'src/utils/dates';
import { FindConsultationByid } from './find-by-id';
import { randomUUID } from 'crypto';

describe('Find Consultations By Id', () => {
  let findConsultationById: FindConsultationByid;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindConsultationByid,
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

    findConsultationById =
      module.get<FindConsultationByid>(FindConsultationByid);
  });

  it('should find consultation by id', async () => {
    const consultation = await findConsultationById.execute(
      createdConsultationMock._id,
    );

    expect(consultation).toBeDefined();
    expect(consultation).toHaveProperty('client');
    expect(consultationRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(consultationRepositoryMock.findById).toHaveBeenCalledWith(
      createdConsultationMock._id,
    );
  });

  it('should throw error if id not exists', async () => {
    consultationRepositoryMock.findById.mockImplementation(() => {
      throw new Error();
    });
    const id = randomUUID();
    await expect(async () => {
      await findConsultationById.execute(id);
    }).rejects.toBeInstanceOf(Error);

    expect(consultationRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(consultationRepositoryMock.findById).toHaveBeenCalledWith(id);
  });
});
