import { CreateClientDto } from "../dtos/client/create-client.dto";
import { UpdateClientDto } from "../dtos/client/update-client.dto";
import { Client } from "../models/Client";

export interface IClientRepository {
    findById(id: string): Promise<Client>
    findAll(filters: ClientFilters): Promise<Client[]>
    create(client: CreateClientDto): Promise<Client>
    update(client: UpdateClientDto): Promise<Client>
    delete(id: string): Promise<void>
}