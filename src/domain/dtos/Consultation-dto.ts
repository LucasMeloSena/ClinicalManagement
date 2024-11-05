import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { BodyBiotype, Consultation } from '../models/Consultation';
import { Nutritionist } from '../models/Nutritionist';
import { Transform } from 'class-transformer';

export class ConsultationDto implements Consultation {
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
  @Length(11)
  phone: string;

  @ApiProperty({
    description: 'Patient Birth Date',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  birth_date: Date;

  @ApiProperty({
    type: 'string',
    description: 'Patient CPF',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11)
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

  @ApiProperty({
    description: 'The nutritionist that will guide consultation',
  })
  @IsNotEmpty()
  nutritionist: Nutritionist;
}
