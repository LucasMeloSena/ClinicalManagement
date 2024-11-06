import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateClient } from "../use-cases/client/update";
import { CreateClient } from "../use-cases/client/create";
import { FindAllClients } from "../use-cases/client/find-all";
import { CreateClientDto } from "../dtos/client/create-client.dto";
import { Client } from "../models/Client";

@ApiTags("client")
@Controller("client")
export class ClientController {
  constructor(
    private readonly create: CreateClient,
    private readonly update: UpdateClient,
    private readonly findAll: FindAllClients,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create new client" })
  @ApiResponse({
    status: 201,
    description: "Client created successfully.",
  })
  @ApiResponse({ status: 400, description: "Bad request." })
  async createClient(
    @Body() createClient: CreateClientDto,
  ): Promise<HttpResponse<Client>> {
    const createdClient = await this.create.execute(createClient);
    return {
      message: "Client registered successfully.",
      data: createdClient,
    };
  }
}