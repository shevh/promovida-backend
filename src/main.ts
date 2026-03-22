// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import fastifyCookie from '@fastify/cookie';
// import { ValidationPipe } from '@nestjs/common'; // vamos usar + Zod pipe depois

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // opções Fastify aqui (ex: logger, trustProxy para Lambda)
      logger: true,
      // trustProxy: true, // útil em serverless
    }),
  );

  // Registre o cookie plugin
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'sua-chave-secreta-muito-longa-aqui', // para signed cookies (opcional, mas recomendado)
  });

  // Prefixo global opcional para API
  app.setGlobalPrefix('api');

  // CORS – obrigatório para cookies cross-origin (ex: frontend em localhost:3443)
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3443', 'https://main.d3szgexwrip82a.amplifyapp.com'], // ajuste para seu domínio Next.js
    credentials: true, // permite cookies
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Promovida API')
    .setDescription(
      'API oficial do Promovida - Plataforma de promoção da saúde de Nova Lima',
    )
    .setVersion('1.0')
    .addBearerAuth() // para JWT depois
    .addCookieAuth('cookie') // para autenticação via cookie (opcional, mas útil para Swagger)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'swagger',
    app,
    cleanupOpenApiDoc?.(document) || document,
  ); // acessível em /swagger

  // Global pipes (Zod vamos aplicar por rota por enquanto)
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 3443;
  await app.listen(port, '0.0.0.0');
  console.log(`Aplicação rodando em http://localhost:${port}/swagger`);
}

bootstrap();
