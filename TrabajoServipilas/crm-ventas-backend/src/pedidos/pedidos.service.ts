import { Injectable, UnauthorizedException } from '@nestjs/common';
import { db } from '../firebase.config';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class PedidosService {
  
  // LOGIN TOTALMENTE LOCAL
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Definimos los usuarios permitidos directamente aquí
    const usuariosPermitidos = [
      { email: 'admin@test.com', password: '123', rol: 'admin' },
      { email: 'empleado@test.com', password: '456', rol: 'empleado' }
    ];

    const usuarioEncontrado = usuariosPermitidos.find(u => u.email === email && u.password === password);

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // Retornamos el rol para que el frontend sepa qué mostrar
    return { email: usuarioEncontrado.email, rol: usuarioEncontrado.rol };
  }

  // EL RESTO SIGUE USANDO FIREBASE PARA GUARDAR (Solo escritura)
  private collection = db.collection('pedidos');

  async crear(createPedidoDto: CreatePedidoDto) {
    const res = await this.collection.add(createPedidoDto);
    return { id: res.id, message: 'Pedido guardado' };
  }
  
  // ... resto de tus funciones de Firebase (obtener, eliminar, actualizar)
}