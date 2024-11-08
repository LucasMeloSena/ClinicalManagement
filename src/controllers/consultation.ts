import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConsultationDto } from 'src/domain/dtos/Consultation-dto';
import { ConsultationSchema } from 'src/domain/models/Consultation';
import { CreateConsultation } from 'src/domain/use-cases/consultation/create';

@ApiTags('consultation')
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly create: CreateConsultation) {}

  @Post()
  @ApiOperation({ summary: 'Create new consultation' })
  @ApiResponse({
    status: 201,
    description: 'Consultation created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createConsultation(
    @Body() createConsultationDto: ConsultationDto,
  ): Promise<HttpResponse<ConsultationSchema>> {
    const createdDepartment = await this.create.execute(createConsultationDto);
    return {
      data: createdDepartment,
      message: 'Department registered successfully.',
    };
  }
}
