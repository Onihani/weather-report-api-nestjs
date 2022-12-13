// nest
import { Module, Global } from '@nestjs/common';

// serivces
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
