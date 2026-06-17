import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración robusta de CORS
  app.enableCors({
    origin: '*', // O intenta con: ['https://trabajo-servipilas-7ucx1d8yc-andresxcz.vercel.app']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();