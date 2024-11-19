import { randomUUID } from 'node:crypto';
import { CreateClientDto } from 'src/domain/dtos/client/create-client.dto';
import { UpdateClientDto } from 'src/domain/dtos/client/update-client.dto';
import { IClientRepository } from 'src/domain/interfaces/client.repository';
import { BodyBiotype, Client } from 'src/domain/models/Client';
import { Mocked, vi } from 'vitest';

export const createClientMock: CreateClientDto = {
  name: 'John Doe',
  email: 'johnclient@email.com',
  phone: '00900000000',
  birthDate: new Date(2000, 11, 10),
  cpf: '00000000000',
  bodyBiotype: BodyBiotype.Ectomorfo,
};

export const updateClientMock: UpdateClientDto = {
  name: 'John Doe II',
};

export const createdClientMock: Client = {
  _id: randomUUID(),
  ...createClientMock,
};

export const deletedClientMock: Client = {
  ...createdClientMock,
  deletedAt: new Date(),
};

export const updatedClientMock: UpdateClientDto = {
  id: createdClientMock._id,
  ...updateClientMock,
};

export const clientsMock = [createdClientMock, createdClientMock];

export const clientRepositoryMock: Mocked<IClientRepository> = {
  create: vi.fn().mockResolvedValue(createdClientMock),
  findById: vi.fn().mockResolvedValue(createdClientMock),
  delete: vi.fn().mockResolvedValue(undefined),
  findAll: vi.fn().mockResolvedValue(clientsMock),
  update: vi.fn().mockResolvedValue(updatedClientMock),
};
