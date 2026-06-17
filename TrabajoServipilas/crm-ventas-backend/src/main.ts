import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ESTA ES LA PARTE QUE DEBES AÑADIR/MODIFICAR:
  app.enableCors({
    origin: '*', // En producción, es mejor poner solo la URL de tu frontend de Vercel
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();