import { CreateClientDto } from "../dtos/client/create-client.dto";
import { UpdateClientDto } from "../dtos/client/update-client.dto";
import { Client } from "../models/Client";

export interface IClientRepository {
    create(client: CreateClientDto): Promise<Client>
    findAll(filters: ClientFilters): Promise<Client[]>
    update(client: UpdateClientDto): Promise<Client>
}