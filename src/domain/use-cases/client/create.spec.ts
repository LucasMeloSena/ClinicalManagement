import { vi } from 'vitest';
import { CreateClient } from './create';
import {
  clientRepositoryMock,
  clientsMock,
  createClientMock,
  createdClientMock,
} from 'src/testing/mocks/client';
import { ClientSchema } from 'src/domain/models/Client';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

describe('Create Client', () => {
  let createClient: CreateClient;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClient,
        {
          provide: getModelToken(ClientSchema.name),
          useValue: createdClientMock,
        },
        {
          provide: 'IClientRepository',
          useValue: clientRepositoryMock,
        },
      ],
    }).compile();

    createClient = module.get<CreateClient>(CreateClient);
  });

  it('should create a new client', async () => {
    clientRepositoryMock.findAll.mockResolvedValue([]);
    const createdClient = await createClient.execute(createClientMock);

    expect(createdClient).toBeDefined();
    expect(clientRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(clientRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it('should throw exception if already exists user with provided data', async () => {
    clientRepositoryMock.findAll.mockResolvedValue(clientsMock);
    await expect(async () => {
      await createClient.execute(createClientMock);
    }).rejects.toBeInstanceOf(ConflictException);

    expect(clientRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(clientRepositoryMock.create).toHaveBeenCalledTimes(0);
  });
});
