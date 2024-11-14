import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { BodyBiotype, Client } from 'src/domain/models/Client';

export class CreateClientDto implements Client {
  @ApiProperty({
    type: 'string',
    description: 'Client Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Client Email',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Client Phone',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11)
  phone: string;

  @ApiProperty({
    description: 'Client Birth Date',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({
    type: 'string',
    description: 'Client CPF',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11)
  cpf: string;

  @ApiProperty({
    description: 'Client Body Biotype',
  })
  @IsNotEmpty()
  @IsString()
  bodyBiotype: BodyBiotype;
}
