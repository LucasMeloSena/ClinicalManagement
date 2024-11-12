import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateConsultationDto {
  @ApiProperty({
    description: 'The consultation id',
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'The client that will be attended',
  })
  @IsOptional()
  client?: string;

  @ApiProperty({
    description: 'The nutritionist that will guide consultation',
  })
  @IsOptional()
  nutritionist: string;

  @ApiProperty({
    description: 'When consultation start',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  startAt: Date;

  @ApiProperty({
    description: 'When consultation end',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  endAt: Date;
}
