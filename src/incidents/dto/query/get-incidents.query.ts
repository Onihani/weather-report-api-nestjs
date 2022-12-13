// imports
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetIncidentsQuery {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Number of items/incidents to return per request',
  })
  take?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Number of items/incidents to skip per request',
  })
  skip?: number;
}
