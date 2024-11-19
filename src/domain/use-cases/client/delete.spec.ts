import { vi } from 'vitest';
import {
  clientRepositoryMock,
  createdClientMock,
  deletedClientMock,
} from 'src/testing/mocks/client';
import { ClientSchema } from 'src/domain/models/Client';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { DeleteClient } from './delete';

describe('Delete Client', () => {
  let deleteClient: DeleteClient;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClient,
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

    deleteClient = module.get<DeleteClient>(DeleteClient);
  });

  it('should delete a client', async () => {
    await deleteClient.execute(createdClientMock._id);

    expect(clientRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(clientRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw exception if client already been deleted', async () => {
    clientRepositoryMock.findById.mockResolvedValue(deletedClientMock);
    await expect(async () => {
      await deleteClient.execute(createdClientMock._id);
    }).rejects.toBeInstanceOf(InternalServerErrorException);

    expect(clientRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(clientRepositoryMock.delete).toHaveBeenCalledTimes(0);
  });
});
