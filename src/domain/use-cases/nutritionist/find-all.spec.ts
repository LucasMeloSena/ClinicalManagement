import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FindAllNutritionists } from './find-all';
import { NutritionistSchema } from 'src/domain/models/Nutritionist';
import {
  createdNutrititonistMock,
  nutritionistRepositoryMock,
} from 'src/testing/mocks/nutritionist';

describe('Find All Consultations', () => {
  let findAllNutritionists: FindAllNutritionists;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllNutritionists,
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

    findAllNutritionists =
      module.get<FindAllNutritionists>(FindAllNutritionists);
  });

  it('should find all nutritionists', async () => {
    const nutritionists = await findAllNutritionists.execute();

    expect(nutritionists).toBeDefined();
    expect(nutritionists).toHaveLength(2);
    expect(nutritionists[0]).toHaveProperty('name');
    expect(nutritionistRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});
