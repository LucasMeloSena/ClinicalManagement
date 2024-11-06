import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientSchema, ClientSchemaFactory } from "src/domain/models/Client";
import { CreateClient } from "src/domain/use-cases/client/create";
import { FindAllClients } from "src/domain/use-cases/client/find-all";
import { UpdateClient } from "src/domain/use-cases/client/update";
import { MongooseClientRepository } from "src/infrastructure/repositories/client.mongoose";


@Module({
  controllers: [],
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
    FindAllClients
  ],
  exports: ['IConsultationRepository'],
})
export class ConsultationModule {}
