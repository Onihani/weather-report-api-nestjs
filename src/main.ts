import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors();

  // get app url
  const serverUrl = await app.getUrl();
  await app.listen(3000);

  console.log(`Application is running on: ${serverUrl}`);
}
bootstrap();
