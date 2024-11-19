import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FindNutritionistById } from './find-by-id';
import { randomUUID } from 'crypto';
import { NutritionistSchema } from 'src/domain/models/Nutritionist';
import {
  createdNutrititonistMock,
  nutritionistRepositoryMock,
} from 'src/testing/mocks/nutritionist';

describe('Find Nutritionist By Id', () => {
  let findNutritionistById: FindNutritionistById;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindNutritionistById,
        {
          provide: getModelToken(NutritionistSchema.name),
          useValue: createdNutrititonistMock,
        },
        {
          provide: 'INutritionistRepository',
          useValue: nutritionistRepositoryMock,
        },
      ],
    }).compile();

    findNutritionistById =
      module.get<FindNutritionistById>(FindNutritionistById);
  });

  it('should find nutritionist by id', async () => {
    const nutritionist = await findNutritionistById.execute(
      createdNutrititonistMock._id,
    );

    expect(nutritionist).toBeDefined();
    expect(nutritionist).toHaveProperty('name');
    expect(nutritionistRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(nutritionistRepositoryMock.findById).toHaveBeenCalledWith(
      createdNutrititonistMock._id,
    );
  });

  it('should throw error if id not exists', async () => {
    nutritionistRepositoryMock.findById.mockImplementation(() => {
      throw new Error();
    });
    const id = randomUUID();
    await expect(async () => {
      await findNutritionistById.execute(id);
    }).rejects.toBeInstanceOf(Error);

    expect(nutritionistRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(nutritionistRepositoryMock.findById).toHaveBeenCalledWith(id);
  });
});
