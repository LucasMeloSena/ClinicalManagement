import { vi } from 'vitest';
import {
  clientRepositoryMock,
  createdClientMock,
} from 'src/testing/mocks/client';
import { ClientSchema } from 'src/domain/models/Client';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FindAllClients } from './find-all';

describe('Find All Client', () => {
  let findAllClients: FindAllClients;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllClients,
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

    findAllClients = module.get<FindAllClients>(FindAllClients);
  });

  it('should find all registered clients', async () => {
    const filters: ClientFilters = {
      name: 'John Doe',
    };
    const clients = await findAllClients.execute(filters);

    expect(clients).toBeDefined();
    expect(clientRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});
