import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  crear(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.crear(createPedidoDto);
  }

  @Get()
  obtenerTodos() {
    return this.pedidosService.obtenerTodos();
  }
// En pedidos.controller.ts

@Delete(':id') // El ":id" es fundamental para que reconozca la variable
eliminar(@Param('id') id: string) {
  return this.pedidosService.eliminar(id);
}

@Patch(':id') // Haz lo mismo para la función de editar
actualizar(@Param('id') id: string, @Body() updatePedidoDto: any) {
  return this.pedidosService.actualizar(id, updatePedidoDto);
}

}