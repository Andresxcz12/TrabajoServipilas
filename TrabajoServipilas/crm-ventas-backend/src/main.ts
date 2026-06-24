import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://trabajo-servipilas-27ct21rp0-andresxcz.vercel.app', // Tu frontend real
      'http://localhost:5173', // Por si pruebas en local
      '*' // Comodín por si falla el anterior
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();