import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
import { LoginDto } from './dto/login.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  private collection = db.collection('pedidos');

  async login(loginDto: LoginDto): Promise<any | null> {
    const snapshot = await this.collection.where('email', '==', loginDto.email).get();
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
    const docRef = await this.collection.add(createPedidoDto);
    return { id: docRef.id, ...createPedidoDto };
  }

  async obtenerTodos() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async eliminar(id: string) {
    await this.collection.doc(id).delete();
    return { deleted: true };
  }

  async actualizar(id: string, updatePedidoDto: any) {
    await this.collection.doc(id).update(updatePedidoDto);
    return { message: 'Pedido actualizado' };
  }
}