import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/client.repository';

@Injectable()
export class DeleteClient {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string) {
    const client = await this.clientRepository.findById(id);
    if (client.deletedAt) {
      throw new InternalServerErrorException(
        'This client already has been deleted.',
      );
    }
    await this.clientRepository.delete(id);
  }
}
