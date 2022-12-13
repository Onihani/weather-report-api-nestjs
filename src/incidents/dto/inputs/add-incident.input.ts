// imports
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsISO31661Alpha2,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddIncidentInput {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Id of client reporting incident',
  })
  client_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Description of incident',
  })
  incident_desc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'City where incident occurred',
    example: 'Accra',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsISO31661Alpha2({
    message:
      'Country must be a valid ISO 3166-1 alpha-2 code. Example: GH for Ghana, US for United States, etc.',
  })
  @ApiProperty({
    required: true,
    description: 'Country where incident occurred',
    example: 'GH',
  })
  country: string;
}
