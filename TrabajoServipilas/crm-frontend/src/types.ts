// BUSCA ESTO AL PRINCIPIO DE TU App.tsx
export interface Pedido {
  id?: string;
  fechaCreacion: string;
  fechaVenta: string; // <--- AGREGA ESTA LÍNEA AQUÍ (Obligatorio)
  usuario: string;
  email: string;
  telefono: string;
  direccion: string;
  tienda: string;
  idRepartidor: string;
  producto: string;
  descripcion: string;
  sku: string;
  idProducto: string;
  unidad: number;
  precioUnitario: number;
  pagoTotal: number;
  ciudad: string;
}