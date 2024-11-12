import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { BodyBiotype } from 'src/domain/models/Client';

export class UpdateClientDto {
  @ApiProperty({
    type: 'string',
    description: 'Patient Name',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    type: 'string',
    description: 'Patient Name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'Patient Email',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: 'string',
    description: 'Patient Phone',
  })
  @IsString()
  @IsOptional()
  @Length(11)
  phone?: string;

  @ApiProperty({
    description: 'Patient Birth Date',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  birth_date?: Date;

  @ApiProperty({
    type: 'string',
    description: 'Patient CPF',
  })
  @IsString()
  @IsOptional()
  @Length(11)
  cpf?: string;

  @ApiProperty({
    description: 'Patient Body Biotype',
  })
  @IsOptional()
  @IsString()
  body_biotype?: BodyBiotype;
}
