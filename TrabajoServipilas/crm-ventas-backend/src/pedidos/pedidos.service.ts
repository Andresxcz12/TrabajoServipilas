import { Injectable, UnauthorizedException } from '@nestjs/common';
import { db } from '../firebase.config';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class PedidosService {
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    // 1. Busca en la colección 'usuarios'
    const snapshot = await db.collection('usuario')
      .where('email', '==', email)
      .get();

    if (snapshot.empty) throw new UnauthorizedException('Usuario no encontrado');

    const usuario = snapshot.docs[0].data();

    // 2. Verifica la contraseña (asegúrate que en Firestore sea "123456")
    if (usuario.password !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return { email: usuario.email, rol: usuario.rol };
  }

  private collection = db.collection('pedidos');

  async crear(createPedidoDto: CreatePedidoDto) {
    const res = await this.collection.add(createPedidoDto);
    return { id: res.id, message: 'Pedido guardado en la base de datos' };
  }

  async obtenerTodos() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  // Añade esto dentro de la clase PedidosService
async actualizar(id: string, updatePedidoDto: any) {
  await this.collection.doc(id).update(updatePedidoDto);
  return { message: 'Pedido actualizado' };
}

async eliminar(id: string) {
  // Asegúrate de que "collection" sea la referencia a tu colección en Firebase
  await this.collection.doc(id).delete();
  return { deleted: true };
}

}