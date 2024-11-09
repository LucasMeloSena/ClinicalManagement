import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from 'src/controllers/client';
import { ClientSchema, ClientSchemaFactory } from 'src/domain/models/Client';
import { CreateClient } from 'src/domain/use-cases/client/create';
import { FindAllClients } from 'src/domain/use-cases/client/find-all';
import { FindClientById } from 'src/domain/use-cases/client/find-by-id';
import { UpdateClient } from 'src/domain/use-cases/client/update';
import { MongooseClientRepository } from 'src/infrastructure/repositories/client.mongoose';

@Module({
  controllers: [ClientController],
  imports: [
    MongooseModule.forFeature([
      { name: ClientSchema.name, schema: ClientSchemaFactory },
    ]),
  ],
  providers: [
    {
      provide: 'IClientRepository',
      useClass: MongooseClientRepository,
    },
    CreateClient,
    UpdateClient,
    FindAllClients,
    FindClientById,
  ],
  exports: ['IClientRepository'],
})
export class ClientModule {}
