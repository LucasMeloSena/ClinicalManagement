import { Inject, Injectable } from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/client.repository';
import { Client } from 'src/domain/models/Client';

@Injectable()
export class FindAllClients {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(filters: ClientFilters): Promise<Client[]> {
    const clients = await this.clientRepository.findAll(filters);
    return clients;
  }
}
