import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos/pedidos.controller'; // Verifica esta ruta
import { PedidosService } from './pedidos/pedidos.service';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [PedidosModule], // Asegúrate de que PedidosModule esté importado correctamente
  controllers: [PedidosController], // <--- ES CRUCIAL QUE ESTÉ AQUÍ
  providers: [PedidosService],
})
export class AppModule {}