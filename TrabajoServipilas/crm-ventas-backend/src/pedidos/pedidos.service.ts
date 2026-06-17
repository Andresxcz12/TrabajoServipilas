import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class PedidosService {
  private collection = db.collection('pedidos');

  // Asegúrate de que el login esté aquí
  async login(loginDto: LoginDto) {
    /* ... tu lógica ... */ 
  }

  // Asegúrate de que estos métodos existan DENTRO de la clase
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