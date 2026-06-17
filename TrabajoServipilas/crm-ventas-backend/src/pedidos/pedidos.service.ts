import { Injectable, UnauthorizedException } from '@nestjs/common';
import { db } from '../firebase.config';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class PedidosService {
  
  // --- LOGIN HARDCODEADO (Sin Firebase) ---
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Define aquí tus credenciales permitidas
    const ADMIN_EMAIL = "admin@ventas.com"; // Cámbialo por el email que quieras
    const ADMIN_PASSWORD = "tu_contraseña_segura"; // Cámbialo por la contraseña que quieras

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return { email: email, rol: 'admin' };
    } else {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
  }

  // --- RESTO DE FUNCIONES (Siguen usando Firebase) ---
  private collection = db.collection('pedidos');

  async crear(createPedidoDto: CreatePedidoDto) {
    const res = await this.collection.add(createPedidoDto);
    return { id: res.id, message: 'Pedido guardado en la base de datos' };
  }

  async obtenerTodos() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async actualizar(id: string, updatePedidoDto: any) {
    await this.collection.doc(id).update(updatePedidoDto);
    return { message: 'Pedido actualizado' };
  }

  async eliminar(id: string) {
    await this.collection.doc(id).delete();
    return { deleted: true };
  }
}