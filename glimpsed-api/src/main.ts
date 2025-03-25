import { NestFactory } from '@nestjs/core';
import { AlphaModule } from './modules/app.alphamodule';

async function bootstrap() {
  const app = await NestFactory.create(AlphaModule);

  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
