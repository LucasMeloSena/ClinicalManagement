import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { BodyBiotype, Client } from 'src/domain/models/Client';

export class CreateClientDto implements Client {
  @ApiProperty({
    type: 'string',
    description: 'Patient Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

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
  birthDate: Date;

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
  bodyBiotype: BodyBiotype;
}
