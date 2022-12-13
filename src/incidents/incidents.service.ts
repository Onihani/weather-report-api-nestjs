// nest
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

// services
import { PrismaService } from '../prisma/prisma.service';

// inputs
import { AddIncidentInput } from './dto/inputs/add-incident.input';

// axios instances
import {
  weatherApiAxios,
  geocodingApiAxios,
} from '../common/lib/axios-instances';

@Injectable()
export class IncidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async addIncident(incident: AddIncidentInput) {
    try {
      // get lat and lon from city and country
      const { data: geocodeData } = await geocodingApiAxios.get(
        `/direct?q=${incident.city},${incident.country}&limit=1&appid=${process.env.OPEN_WEATHER_MAPS_API_KEY}`,
      );

      const { lat, lon } = geocodeData[0];

      // get weather report from lat and lon
      const { data: weatherData } = await weatherApiAxios.get(
        `/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAPS_API_KEY}`,
      );

      // add incident to database
      const newIncident = await this.prisma.incidents.create({
        data: {
          client_id: incident.client_id,
          incident_desc: incident.incident_desc,
          city: incident.city,
          country: incident.country,
          weather_report: weatherData,
        },
      });

      // return success response
      return {
        status: 'success',
        message: 'Incident reported successfully',
        data: newIncident,
      };
    } catch (error) {
      console.log('addIncident error: ', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
