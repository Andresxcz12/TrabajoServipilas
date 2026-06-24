import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Esto permite que tu frontend en Vercel se comunique con el backend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'https://trabajo-servipilas-owkk2r57j-andresxcz.vercel.app',
      'https://trabajoservipilas-production.up.railway.app',
      'https://trabajo-servipilas-phe0v42cc-andresxcz.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();