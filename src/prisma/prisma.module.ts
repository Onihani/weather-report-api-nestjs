// nest
import { Module } from '@nestjs/common';

// serivces
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
