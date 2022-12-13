// nest
import { Module } from '@nestjs/common';

// controllers
import { IncidentsController } from './incidents.controller';

// services
import { IncidentsService } from './incidents.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [IncidentsController],
  providers: [IncidentsService, PrismaService],
})
export class IncidentsModule {}
