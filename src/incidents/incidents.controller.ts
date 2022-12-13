// nest
import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';

// services
import { IncidentsService } from './incidents.service';

// inputs
import { AddIncidentInput } from './dto/inputs/add-incident.input';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @ApiOperation({
    summary: 'Report an incident',
    description: `Via this endpoint a client can report an incident`,
  })
  @ApiBody({ type: AddIncidentInput })
  @ApiOkResponse({
    description: 'Operation Sucessful',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @Post()
  async addIncident(@Body() body: AddIncidentInput) {
    return this.incidentsService.addIncident(body);
  }
}
