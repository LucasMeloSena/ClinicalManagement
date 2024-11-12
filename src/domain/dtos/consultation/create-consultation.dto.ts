import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Consultation } from '../../models/Consultation';
import { Transform } from 'class-transformer';

export class CreateConsultationDto implements Consultation {
  @ApiProperty({
    description: 'The client that will be attended',
  })
  @IsNotEmpty()
  client: string;

  @ApiProperty({
    description: 'The nutritionist that will guide consultation',
  })
  @IsNotEmpty()
  nutritionist: string;

  @ApiProperty({
    description: 'When consultation start',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  startAt: Date;

  @ApiProperty({
    description: 'When consultation end',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  endAt: Date;

  @ApiProperty({
    description: 'The interval of days to repeat',
  })
  @IsNumber()
  @IsOptional()
  intervalOfDaysToRepeat?: number;
}
