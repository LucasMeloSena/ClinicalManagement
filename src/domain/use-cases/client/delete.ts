import { Inject, Injectable } from "@nestjs/common";
import { IClientRepository } from "src/domain/interfaces/client.repository";

@Injectable()
export class DeleteClient {
    constructor (
        @Inject("IClientRepository")
        private readonly clientRepository: IClientRepository
    ) {}

    async execute(id: string) {
        await this.clientRepository.findById(id)
        await this.clientRepository.delete(id)
    }
}