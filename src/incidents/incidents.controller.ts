// nest
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

// services
import { IncidentsService } from './incidents.service';

// inputs
import { AddIncidentInput } from './dto/inputs/add-incident.input';

// queries
import { GetIncidentsQuery } from './dto/query/get-incidents.query';

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

  @ApiOperation({
    summary: 'Get all reported incidents',
    description: `Via this endpoint a client can get all reported incidents in a paginated format`,
  })
  @ApiOkResponse({
    description: 'Operation Sucessful',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @Get()
  async getIncidents(@Query() query: GetIncidentsQuery) {
    return this.incidentsService.getIncidents(query);
  }
}
