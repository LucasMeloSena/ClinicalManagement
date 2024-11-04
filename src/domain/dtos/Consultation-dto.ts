import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BodyBiotype } from '../models/Consultation';
import { Nutritionist } from '../models/Nutritionist';

export class ConsultationDto {
  @ApiProperty({
    type: 'string',
    description: 'Patient Name',
  })
  @IsString()
  @IsNotEmpty()
  patient: string;

  @ApiProperty({
    type: 'string',
    description: 'Patient Email',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Patient Phone',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Patient Birth Date',
  })
  @IsDate()
  @IsNotEmpty()
  birth_date: Date;

  @ApiProperty({
    type: 'string',
    description: 'Patient CPF',
  })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Patient Body Biotype',
  })
  @IsNotEmpty()
  @IsString()
  body_biotype: BodyBiotype;

  @ApiProperty({
    description: 'When consultation start',
  })
  @IsDate()
  @IsNotEmpty()
  start_at: Date;

  @ApiProperty({
    description: 'When consultation end',
  })
  @IsDate()
  @IsNotEmpty()
  end_at: Date;

  @ApiProperty({
    description: 'The nutritionist that will guide consultation',
  })
  @IsNotEmpty()
  nutritionist: Nutritionist;
}
