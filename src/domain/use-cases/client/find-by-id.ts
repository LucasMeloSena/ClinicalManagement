import { Inject, Injectable } from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/client.repository';
import { Client } from 'src/domain/models/Client';

@Injectable()
export class FindClientById {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string): Promise<Client> {
    const client = await this.clientRepository.findById(id);
    return client;
  }
}
