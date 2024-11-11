import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'All clients retrieved successfully.',
  })
  @ApiQuery({
    name: 'name',
    description: 'The name of the client',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'email',
    description: 'The email of the client',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'phone',
    description: 'The phone of the client',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'cpf',
    description: 'The cpf of the client',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'deleted_at',
    description: 'The the deactivation date of the client',
    required: false,
    type: Date,
  })
  async getAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('cpf') cpf?: string,
    @Query('deleted_at') deletedAt?: Date,
  ): Promise<HttpResponse<Client[]>> {
    const filters: ClientFilters = {
      name,
      email,
      phone,
      cpf,
      deleted_at: deletedAt,
    };
    const clients = await this.findAll.execute(filters);
    return {
      data: clients,
      message: 'All clients retrieved successfully.',
    };
  }

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
