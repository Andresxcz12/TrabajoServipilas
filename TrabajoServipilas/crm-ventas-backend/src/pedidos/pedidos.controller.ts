import { Controller, Post, Body, Get, Patch, Delete, Param, UnauthorizedException } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { LoginDto } from './dto/login.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // 1. Llamamos al servicio para validar
    const usuario = await this.pedidosService.login(loginDto);
    
    // 2. Si el servicio devuelve null, lanzamos el error 401 que ves en consola
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    // 3. Si todo está bien, devolvemos el objeto del usuario (email, rol, etc.)
    return usuario;
  }

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