import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConsultationSchema } from 'src/domain/models/Consultation';
import {
  consultationRepositoryMock,
  createdConsultationMock,
} from 'src/testing/mocks/consultation';
import { DateProvider } from 'src/utils/dates';
import { DeleteConsultation } from './delete';
import { randomUUID } from 'crypto';

describe('Delete Consultation', () => {
  let deleteConsultation: DeleteConsultation;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteConsultation,
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

    deleteConsultation = module.get<DeleteConsultation>(DeleteConsultation);
  });

  it('should delete consultation', async () => {
    await deleteConsultation.execute(createdConsultationMock._id);
    expect(consultationRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw exception if consultation not found', async () => {
    consultationRepositoryMock.findById.mockImplementation(() => {
      throw new Error();
    });
    await expect(async () => {
      await deleteConsultation.execute(randomUUID());
    }).rejects.toBeInstanceOf(Error);

    expect(consultationRepositoryMock.delete).toHaveBeenCalledTimes(0);
  });
});
