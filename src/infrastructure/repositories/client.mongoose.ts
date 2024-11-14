import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from 'src/domain/dtos/client/create-client.dto';
import { UpdateClientDto } from 'src/domain/dtos/client/update-client.dto';
import { IClientRepository } from 'src/domain/interfaces/client.repository';
import { Client, ClientDocument, ClientSchema } from 'src/domain/models/Client';

@Injectable()
export class MongooseClientRepository implements IClientRepository {
  constructor(
    @InjectModel(ClientSchema.name)
    private clientModel: Model<ClientSchema>,
  ) {}

  async findById(id: string): Promise<Client> {
    try {
      const client = await this.clientModel.findById<ClientDocument>(id);
      return client;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving client with ${id}`,
      );
    }
  }

  async findAll(filters: ClientFilters): Promise<Client[]> {
    try {
      const { name, email, phone, cpf } = filters;
      const filtersNonNull: ClientFilters = {};
      if (name) filtersNonNull.name = name;
      if (email) filtersNonNull.email = email;
      if (phone) filtersNonNull.phone = phone;
      if (cpf) filtersNonNull.cpf = cpf;

      const clients = await this.clientModel.find<ClientDocument>({
        ...filtersNonNull,
      });

      return clients;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving clients');
    }
  }

  async create(clientDto: CreateClientDto): Promise<Client> {
    try {
      const createdClient =
        await this.clientModel.create<ClientDocument>(clientDto);
      return createdClient;
    } catch (error) {
      throw new InternalServerErrorException('Error creating client.');
    }
  }

  async update(client: UpdateClientDto): Promise<Client> {
    try {
      const createdClient =
        await this.clientModel.findByIdAndUpdate<ClientDocument>(
          client.id,
          client,
        );
      return createdClient;
    } catch (error) {
      throw new InternalServerErrorException('Error updating client.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.clientModel.findByIdAndUpdate<ClientDocument>(id, {
        deletedAt: new Date(),
      });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting client.');
    }
  }
}
