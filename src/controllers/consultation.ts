import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateConsultationDto } from 'src/domain/dtos/consultation/create-consultation.dto';
import { UpdateConsultationDto } from 'src/domain/dtos/consultation/update-consultation.dto';
import { Consultation } from 'src/domain/models/Consultation';
import { CreateConsultation } from 'src/domain/use-cases/consultation/create';
import { DeleteConsultation } from 'src/domain/use-cases/consultation/delete';
import { FindAllConsultations } from 'src/domain/use-cases/consultation/find-all';
import { FindConsultationByid } from 'src/domain/use-cases/consultation/find-by-id';
import { UpdateConsultation } from 'src/domain/use-cases/consultation/update';

@ApiTags('consultation')
@Controller('consultation')
export class ConsultationController {
  constructor(
    private readonly create: CreateConsultation,
    private readonly findAll: FindAllConsultations,
    private readonly findById: FindConsultationByid,
    private readonly update: UpdateConsultation,
    private readonly deleteConsultation: DeleteConsultation,
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

  @Get(':id')
  @ApiOperation({ summary: 'Get consultation by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Consultation retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Consultation not found.' })
  async findConsultationById(
    @Param('id') id: string,
  ): Promise<HttpResponse<Consultation>> {
    const consultation = await this.findById.execute(id);
    return {
      data: consultation,
      message: 'Consultation retrieved successfully.',
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
  ): Promise<HttpResponse<Consultation>> {
    const createdConsultation = await this.create.execute(
      createConsultationDto,
    );
    return {
      data: createdConsultation,
      message: 'Consultation registered successfully.',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update consultation data' })
  @ApiResponse({
    status: 200,
    description: 'Consultation successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async updateDepartment(
    @Param('id') id: string,
    @Body() consultation: UpdateConsultationDto,
  ): Promise<HttpResponse<Consultation>> {
    consultation.id = id;
    const updatedConsultation = await this.update.execute(consultation);
    return {
      message: 'Consultation updated successfully.',
      data: updatedConsultation,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a consultation' })
  @ApiResponse({
    status: 204,
    description: 'Consultation deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiParam({ name: 'id', description: 'Consultation id' })
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteConsultation.execute(id);
  }
}
