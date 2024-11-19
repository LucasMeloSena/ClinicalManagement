import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NutritionistSchema } from 'src/domain/models/Nutritionist';
import {
  authProviderMock,
  createdNutrititonistMock,
  hashProviderMock,
  loginNutritionistMock,
  nutritionistRepositoryMock,
} from 'src/testing/mocks/nutritionist';
import { LoginNutritionist } from './login';
import { BadRequestException } from '@nestjs/common';

describe('Nutritionist Login', () => {
  let loginNutritionist: LoginNutritionist;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginNutritionist,
        {
          provide: getModelToken(NutritionistSchema.name),
          useValue: createdNutrititonistMock,
        },
        {
          provide: 'INutritionistRepository',
          useValue: nutritionistRepositoryMock,
        },
        {
          provide: 'HashProvider',
          useValue: hashProviderMock,
        },
        {
          provide: 'JwtAuthToken',
          useValue: authProviderMock,
        },
      ],
    }).compile();

    loginNutritionist = module.get<LoginNutritionist>(LoginNutritionist);
  });

  it('should make login successfully', async () => {
    const login = await loginNutritionist.execute(loginNutritionistMock);

    expect(login).toBeDefined();
    expect(login).toHaveProperty('token');
    expect(nutritionistRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(nutritionistRepositoryMock.findByEmail).toHaveBeenCalledWith(
      loginNutritionistMock.email,
    );
    expect(hashProviderMock.comparePassword).toHaveBeenCalledTimes(1);
  });

  it('should throw error if invalid credentials', async () => {
    hashProviderMock.comparePassword.mockResolvedValue(false);
    await expect(async () => {
      await loginNutritionist.execute({
        ...loginNutritionistMock,
        password: '1234567',
      });
    }).rejects.toBeInstanceOf(BadRequestException);
  });
});
