import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform :true,
      forbidNonWhitelisted:true,
      transformOptions : {
        enableImplicitConversion : true,
      }
    })
   );

   // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
  .setTitle('Munily-Test API')
  .setDescription('Documentación Munily-Test API')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);

// URL API
SwaggerModule.setup('docs', app, document);
  await app.listen(7000);
}
bootstrap();
