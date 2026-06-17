import { Injectable } from '@nestjs/common';
import { db } from '../firebase.config';

@Injectable()
export class PedidosService {
  private readonly collection = db.collection('pedidos');
  // ... tu método login y otros métodos ...

  async actualizar(id: string, updatePedidoDto: any) {
    await this.collection.doc(id).update(updatePedidoDto);
    return { message: 'Pedido actualizado' };
  }

  async eliminar(id: string) {
    await this.collection.doc(id).delete();
    return { deleted: true };
  }
}