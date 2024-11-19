import { randomUUID } from 'node:crypto';
import { Mocked, vi } from 'vitest';
import { Nutritionist } from 'src/domain/models/Nutritionist';
import { INutritionistRepository } from 'src/domain/interfaces/nutritionist.repository';
import { LoginNutritionistDto } from 'src/domain/dtos/nutritionist/login-nutritionist.dto';

export const nutritionistMock: Nutritionist = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: '$2b$10$GgTwAM4H354rwX3/v1Iws.lvqX/vHHSpduy6jdi0j1ZSjGh8mKPWy',
};

export const createdNutrititonistMock: Nutritionist = {
  _id: randomUUID(),
  ...nutritionistMock,
};

export const loginNutritionistMock: LoginNutritionistDto = {
  email: createdNutrititonistMock.email,
  password: createdNutrititonistMock.password,
};

export const nutritionistsMocks = [
  createdNutrititonistMock,
  createdNutrititonistMock,
];

export const hashProviderMock = {
  comparePassword: vi.fn().mockResolvedValue(true),
};

export const authProviderMock = {
  genToken: vi.fn().mockReturnValue('mocked-token'),
};

export const nutritionistRepositoryMock: Mocked<INutritionistRepository> = {
  findById: vi.fn().mockResolvedValue(createdNutrititonistMock),
  findAll: vi.fn().mockResolvedValue(nutritionistsMocks),
  findByEmail: vi.fn().mockResolvedValue(createdNutrititonistMock),
};
