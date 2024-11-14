import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDto } from './create-consultation.dto';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
  @ApiProperty({
    description: 'The consultation id',
  })
  @IsOptional()
  id?: string;
}
