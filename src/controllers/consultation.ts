import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import {
  Consultation,
  ConsultationSchema,
} from 'src/domain/models/Consultation';
import { CreateConsultation } from 'src/domain/use-cases/consultation/create';
import { FindAllConsultations } from 'src/domain/use-cases/consultation/find-all';

@ApiTags('consultation')
@Controller('consultation')
export class ConsultationController {
  constructor(
    private readonly create: CreateConsultation,
    private readonly findAll: FindAllConsultations,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all consultations' })
  @ApiResponse({
    status: 200,
    description: 'All consultations retrieved successfully.',
  })
  @ApiQuery({
    name: 'nutritionist_id',
    description: 'The id of the nutritionist',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'client_id',
    description: 'The id of the client',
    required: false,
    type: String,
  })
  async getAll(
    @Query('nutritionist_id') nutritionistId?: string,
    @Query('client_id') clientId?: string,
  ): Promise<HttpResponse<Consultation[]>> {
    const filters: ConsultationFilters = {
      nutritionistId,
      clientId,
    };
    const consultations = await this.findAll.execute(filters);
    return {
      data: consultations,
      message: 'All consultations retrieved successfully.',
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new consultation' })
  @ApiResponse({
    status: 201,
    description: 'Consultation created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createConsultation(
    @Body() createConsultationDto: CreateConsultationDto,
  ): Promise<HttpResponse<ConsultationSchema>> {
    const createdConsultation = await this.create.execute(
      createConsultationDto,
    );
    return {
      data: createdConsultation,
      message: 'Consultation registered successfully.',
    };
  }
}
