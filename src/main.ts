import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WrapHeadersInterceptor } from './common/interceptors/header.interceptor';
import helmet from 'helmet';
import { CommonFilter } from './common/filters/common.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalInterceptors(new WrapHeadersInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new CommonFilter());
  const config = new DocumentBuilder()
    .setTitle('Employee Management')
    .setDescription('V1 of the Employee Management API Collection')
    .setVersion('1.0')
    .addServer(process.env.SERVER_URL)
    .setExternalDoc('Postman Collection', '/collection-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('collection', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
