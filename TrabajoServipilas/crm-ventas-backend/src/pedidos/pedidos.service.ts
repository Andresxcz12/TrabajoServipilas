import { Injectable } from '@nestjs/common';
import { query } from '../db';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  async crear(createPedidoDto: CreatePedidoDto) {
    const keys = Object.keys(createPedidoDto);
    const cols = keys.join(', ');
    const vals = keys.map((_, i) => `$${i + 1}`).join(', ');
    const params = keys.map(k => (createPedidoDto as any)[k]);

    const res = await query(
      `INSERT INTO pedidos(${cols}) VALUES(${vals}) RETURNING id, ${cols}`,
      params,
    );
    return res.rows[0];
  }

  async obtenerTodos() {
    const res = await query('SELECT * FROM pedidos ORDER BY id DESC');
    return res.rows;
  }

  async eliminar(id: string) {
    await query('DELETE FROM pedidos WHERE id = $1', [id]);
    return { deleted: true };
  }

  async actualizar(id: string, updatePedidoDto: any) {
    const keys = Object.keys(updatePedidoDto);
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const params = keys.map(k => updatePedidoDto[k]);
    params.push(id);
    await query(`UPDATE pedidos SET ${sets} WHERE id = $${keys.length + 1}`, params);
    return { message: 'Pedido actualizado' };
  }
}