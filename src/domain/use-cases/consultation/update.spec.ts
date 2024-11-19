import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConsultationSchema } from 'src/domain/models/Consultation';
import {
  consultationRepositoryMock,
  createdConsultationMock,
  updateConsultationMock,
  validateConsultationTimeProviderMock,
} from 'src/testing/mocks/consultation';
import { DateProvider } from 'src/utils/dates';
import { UpdateConsultation } from './update';

describe('Update Consultation', () => {
  let updateConsultation: UpdateConsultation;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateConsultation,
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

    updateConsultation = module.get<UpdateConsultation>(UpdateConsultation);
  });

  it('should update consultation', async () => {
    const updated = await updateConsultation.execute(updateConsultationMock);

    expect(updated).toBeDefined();
    expect(updated.nutritionist).not.toEqual(
      createdConsultationMock.nutritionist,
    );
    expect(consultationRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(consultationRepositoryMock.findById).toHaveBeenCalledWith(
      updateConsultationMock.id,
    );
    expect(consultationRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(consultationRepositoryMock.update).toHaveBeenCalledWith(
      updateConsultationMock,
    );
  });

  it('should throw exception if consultation not found', async () => {
    consultationRepositoryMock.findById.mockImplementation(() => {
      throw new Error();
    });
    await expect(async () => {
      await updateConsultation.execute(updateConsultationMock);
    }).rejects.toBeInstanceOf(Error);

    expect(consultationRepositoryMock.update).toHaveBeenCalledTimes(0);
  });
});
