import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NutritionistDto {
  @ApiProperty({
    type: 'string',
    description: 'Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Email',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
