import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos/pedidos.controller'; // Verifica esta ruta
import { PedidosService } from './pedidos/pedidos.service';

@Module({
  imports: [],
  controllers: [PedidosController], // <--- ES CRUCIAL QUE ESTÉ AQUÍ
  providers: [PedidosService],
})
export class AppModule {}