import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateClient } from '../domain/use-cases/client/update';
import { CreateClient } from '../domain/use-cases/client/create';
import { FindAllClients } from '../domain/use-cases/client/find-all';
import { CreateClientDto } from '../domain/dtos/client/create-client.dto';
import { Client } from '../domain/models/Client';
import { FindClientById } from 'src/domain/use-cases/client/find-by-id';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(
    private readonly findAll: FindAllClients,
    private readonly findById: FindClientById,
    private readonly create: CreateClient,
    private readonly update: UpdateClient,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get client by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Client retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Client not found.' })
  async getClientById(@Param('id') id: string): Promise<HttpResponse<Client>> {
    return {
      message: 'Client retrieved successfully.',
      data: await this.findById.execute(id),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new client' })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createClient(
    @Body() createClient: CreateClientDto,
  ): Promise<HttpResponse<Client>> {
    const createdClient = await this.create.execute(createClient);
    return {
      message: 'Client registered successfully.',
      data: createdClient,
    };
  }
}
