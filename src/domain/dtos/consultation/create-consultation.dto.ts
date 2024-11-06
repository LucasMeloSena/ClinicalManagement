import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Consultation } from '../../models/Consultation';
import { Transform } from 'class-transformer';

export class CreateConsultationDto implements Consultation {
  @ApiProperty({
    description: 'The client that will be attended',
  })
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    description: 'The nutritionist that will guide consultation',
  })
  @IsNotEmpty()
  nutritionistId: string;

  @ApiProperty({
    description: 'When consultation start',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  start_at: Date;

  @ApiProperty({
    description: 'When consultation end',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  end_at: Date;
}
