export class CreatePedidoDto {
  fechaCreacion!: string;
  usuario!: string;
  email!: string;
  telefono!: string;
  direccion!: string;
  tienda!: 'Rappi' | 'Mercado Libre';
  idRepartidor!: string;
  producto!: string;
  descripcion!: string;
  sku!: string;
  idProducto!: string;
  unidad!: number;
  precioUnitario!: number;
  pagoTotal!: number;
  ciudad!: string;
}