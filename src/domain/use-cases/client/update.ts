import { Inject, Injectable } from '@nestjs/common';
import { UpdateClientDto } from 'src/domain/dtos/client/update-client.dto';
import { IClientRepository } from 'src/domain/interfaces/client.repository';
import { Client } from 'src/domain/models/Client';

@Injectable()
export class UpdateClient {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(client: UpdateClientDto): Promise<Client> {
    const updatedClient = await this.clientRepository.update(client);
    return updatedClient;
  }
}
