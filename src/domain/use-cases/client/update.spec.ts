import { vi } from 'vitest';
import {
  clientRepositoryMock,
  createdClientMock,
  updateClientMock,
  updatedClientMock,
} from 'src/testing/mocks/client';
import { ClientSchema } from 'src/domain/models/Client';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateClient } from './update';
import { InternalServerErrorException } from '@nestjs/common';

describe('Update Client', () => {
  let updateClient: UpdateClient;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClient,
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

    updateClient = module.get<UpdateClient>(UpdateClient);
  });

  it('should update client', async () => {
    const updatedClient = await updateClient.execute(updatedClientMock);

    expect(updatedClient).toBeDefined();
    expect(createdClientMock.name).not.toEqual(updatedClient.name);
    expect(clientRepositoryMock.update).toHaveBeenCalledTimes(1);
  });
  it('should throw exception if client not exists', async () => {
    await expect(async () => {
      await updateClient.execute(updateClientMock);
    }).rejects.toBeInstanceOf(InternalServerErrorException);

    expect(clientRepositoryMock.update).toHaveBeenCalledTimes(0);
  });
});
