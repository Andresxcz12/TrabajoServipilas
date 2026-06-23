import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    process.env.FRONTEND_URL || 'https://trabajo-servipilas.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow local development, specific frontend URL, or any vercel.app domain
      if (!origin || 
          allowedOrigins.includes(origin) || 
          (origin && origin.includes('vercel.app'))) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy: disallowed origin'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();