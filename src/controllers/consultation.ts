import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import {
  Consultation,
  ConsultationSchema,
} from 'src/domain/models/Consultation';
import { CreateConsultation } from 'src/domain/use-cases/consultation/create';
import { FindAllConsultations } from 'src/domain/use-cases/consultation/find-all';
import { FindConsultationByid } from 'src/domain/use-cases/consultation/find-by-id';

@ApiTags('consultation')
@Controller('consultation')
export class ConsultationController {
  constructor(
    private readonly create: CreateConsultation,
    private readonly findAll: FindAllConsultations,
    private readonly findById: FindConsultationByid
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all consultations' })
  @ApiResponse({
    status: 200,
    description: 'All consultations retrieved successfully.',
  })
  @ApiQuery({
    name: 'nutritionist',
    description: 'The id of the nutritionist',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'client',
    description: 'The id of the client',
    required: false,
    type: String,
  })
  async getAll(
    @Query('nutritionist') nutritionist?: string,
    @Query('client') client?: string,
  ): Promise<HttpResponse<Consultation[]>> {
    const filters: ConsultationFilters = {
      nutritionist,
      client,
    };
    const consultations = await this.findAll.execute(filters);
    return {
      data: consultations,
      message: 'All consultations retrieved successfully.',
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get consultation by id" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({
    status: 200,
    description: "Consultation retrieved successfully.",
  })
  @ApiResponse({ status: 404, description: "Consultation not found." })
  async findConsultationById(@Param("id") id: string): Promise<HttpResponse<Consultation>> {
    const consultation = await this.findById.execute(id);
    return {
      data: consultation,
      message: "Consultation retrieved successfully."
    }
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
  ): Promise<HttpResponse<Consultation>> {
    const createdConsultation = await this.create.execute(
      createConsultationDto,
    );
    return {
      data: createdConsultation,
      message: 'Consultation registered successfully.',
    };
  }
}
