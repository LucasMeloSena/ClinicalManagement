import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Consultation } from '../models/Consultation';
import { Nutritionist } from '../models/Nutritionist';
import { Transform } from 'class-transformer';
import { Client } from '../models/Client';

export class ConsultationDto implements Consultation {
  @ApiProperty({
    description: 'The client that will be attended',
  })
  @IsNotEmpty()
  client: Client;

  @ApiProperty({
    description: 'The nutritionist that will guide consultation',
  })
  @IsNotEmpty()
  nutritionist: Nutritionist;

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
