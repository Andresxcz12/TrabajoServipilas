import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS permisiva pero segura
  app.enableCors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  

  await app.listen(process.env.PORT || 3000);
}
bootstrap();