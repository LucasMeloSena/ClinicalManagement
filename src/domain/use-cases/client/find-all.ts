import { Inject, Injectable } from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/client.repository';
import { Client } from 'src/domain/models/Client';
import { PaginationDefaultsEnum } from 'src/utils/enums/pagination-default.enum';

@Injectable()
export class FindAllClients {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(filters: ClientFilters): Promise<Client[]> {
    filters.page = filters.page || PaginationDefaultsEnum.PAGE;
    filters.limit = filters.limit || PaginationDefaultsEnum.LIMIT;
    const clients = await this.clientRepository.findAll(filters);
    return clients;
  }
}
