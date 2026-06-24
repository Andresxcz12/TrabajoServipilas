import { Module } from '@nestjs/common';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [PedidosModule], // Esto es suficiente. 
  controllers: [],        // Déjalo vacío.
  providers: [],          // Déjalo vacío.
})
export class AppModule {}