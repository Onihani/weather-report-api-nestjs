//core
import { resolve } from 'path';
import { writeFileSync } from 'fs';
// nest
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
// imports
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// prisma service - DB ORM
import { PrismaService } from './prisma/prisma.service';

// app module
import { AppModule } from './app.module';

// Exception filter
import { PrismaClientExceptionFilter } from './prisma/filters/prisma.filter';

// iterfaces
import { SwaggerCustomOptions } from './common/interfaces';

// load env
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // binds ValidationPipe to the entire application
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // apply transform to all responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 👇 apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // configure prisma
  const prismaService = app.get(PrismaService);
  // enable prisma shut down hooks
  await prismaService.enableShutdownHooks(app);

  // configure swagger
  const config = new DocumentBuilder()
    .setTitle('Weather Report API Documentation')
    .setDescription(
      'This documentation includes API description of restful endpoints in the weather report API',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Weather Report API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('/swagger', app, document, swaggerCustomOptions);

  // enable cors
  app.enableCors();

  // start server
  await app.listen(process.env.PORT || 3000);
  // get app url
  const serverUrl = await app.getUrl();
  console.log(`Application is running on: ${serverUrl}`);

  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
  }
}
bootstrap();
