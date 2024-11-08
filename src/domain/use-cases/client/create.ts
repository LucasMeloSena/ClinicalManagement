import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from 'src/domain/dtos/client/create-client.dto';
import { IClientRepository } from 'src/domain/interfaces/client.repository';
import { Client } from 'src/domain/models/Client';

@Injectable()
export class CreateClient {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(client: CreateClientDto): Promise<Client> {
    const existingClients = await this.clientRepository.findAll({
      email: client.email,
      phone: client.phone,
      cpf: client.cpf,
    });
    if (existingClients.length > 0) {
      throw new BadRequestException(
        'Already exists a client with provided data.',
      );
    }

    const createdClient = await this.clientRepository.create(client);
    return createdClient;
  }
}
