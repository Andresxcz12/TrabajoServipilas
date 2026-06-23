import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    process.env.FRONTEND_URL || 'https://trabajo-servipilas.vercel.app',
    'https://caboose.proxy.rlwy.net:49235',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow local development, specific frontend URL, Railway proxy, or any vercel.app domain
      const isAllowed = !origin ||
        allowedOrigins.includes(origin) ||
        (origin && origin.includes('vercel.app')) ||
        (origin && origin.includes('proxy.rlwy.net'));

      // Don't raise an error from the CORS middleware — return false to
      // simply not set CORS headers for disallowed origins (avoids 500s).
      callback(null, Boolean(isAllowed));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();