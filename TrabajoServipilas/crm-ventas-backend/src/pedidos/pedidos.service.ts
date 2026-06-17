import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
import { LoginDto } from './dto/login.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  private readonly pedidosCollection = db.collection('pedidos');
  private readonly usuariosCollection = db.collection('usuarios');

  async login(loginDto: LoginDto): Promise<any | null> {
    const snapshot = await this.usuariosCollection.where('email', '==', loginDto.email).get();
    if (snapshot.empty) {
      return null;
    }

    const userDoc = snapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };

    if (loginDto.password && user && (user as any).password === loginDto.password) {
      return user;
    }

    return null;
  }

  async crear(createPedidoDto: CreatePedidoDto) {
    const docRef = await this.pedidosCollection.add(createPedidoDto);
    return { id: docRef.id, ...createPedidoDto };
  }

  async obtenerTodos() {
    const snapshot = await this.pedidosCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async eliminar(id: string) {
    await this.pedidosCollection.doc(id).delete();
    return { deleted: true };
  }

  async actualizar(id: string, updatePedidoDto: any) {
    await this.pedidosCollection.doc(id).update(updatePedidoDto);
    return { message: 'Pedido actualizado' };
  }
}