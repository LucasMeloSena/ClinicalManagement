import { vi } from 'vitest';
import {
  clientRepositoryMock,
  createdClientMock,
} from 'src/testing/mocks/client';
import { ClientSchema } from 'src/domain/models/Client';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FindClientById } from './find-by-id';

describe('Find Client By Id', () => {
  let findClientById: FindClientById;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindClientById,
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

    findClientById = module.get<FindClientById>(FindClientById);
  });

  it('should find client by id', async () => {
    const client = await findClientById.execute(createdClientMock._id);

    expect(client).toBeDefined();
    expect(clientRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });
});
