import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { type Pedido } from './types';
import { LayoutDashboard, ShoppingCart, ClipboardList, Pencil, Trash2, LogOut, Search, TrendingUp, DollarSign, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { Login } from './Login';

function App() {
  // CAMBIA ESTA URL POR LA TUYA DE RAILWAY
  const API_URL = 'https://trabajo-servipilas-production.up.railway.app';

  const [usuario, setUsuario] = useState<any>(null);
  const [listaPedidos, setListaPedidos] = useState<any[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState(''); 

  const [filtroTienda, setFiltroTienda] = useState('Todas');
  const [filtroFecha, setFiltroFecha] = useState('Todos'); 

  const [toast, setToast] = useState<{ mensaje: string; visible: boolean; tipo: 'exito' | 'error' }>({
    mensaje: '',
    visible: false,
    tipo: 'exito'
  });

  const [cargandoTabla, setCargandoTabla] = useState(false);
  const [guardandoForm, setGuardandoForm] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 10;

  const estadoInicial: Pedido = {
    fechaCreacion: new Date().toISOString().split('T')[0],
    fechaVenta: new Date().toISOString().split('T')[0], 
    usuario: '', email: '', telefono: '', direccion: '', tienda: 'Rappi',
    idRepartidor: '', producto: '', descripcion: '', sku: '', idProducto: '',
    unidad: 1, precioUnitario: 0, pagoTotal: 0, ciudad: ''
  };

  const [formData, setFormData] = useState<Pedido>(estadoInicial);

  const handleLogin = async (loginDto: { email: string; password: string }) => {
    try {
      const res = await axios.post(`${API_URL}/pedidos/login`, loginDto);
      setUsuario(res.data);
      return res.data;
    } catch (error) {
      const mensaje = axios.isAxiosError(error) && error.response?.status === 401
        ? 'Credenciales incorrectas'
        : 'Error al conectar con el servidor';
      lanzarToast(mensaje, 'error');
      throw error;
    }
  };

  const lanzarToast = (mensaje: string, tipo: 'exito' | 'error' = 'exito') => {
    setToast({ mensaje, visible: true, tipo });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
  };

  const cargarPedidos = async () => {
    setCargandoTabla(true);
    try {
      const res = await axios.get(`${API_URL}/pedidos`);
      setListaPedidos(res.data);
    } catch (error) { 
      console.error(error); 
      lanzarToast('Error al conectar con la base de datos', 'error');
    } finally {
      setCargandoTabla(false);
    }
  };

  useEffect(() => { if (usuario) cargarPedidos(); }, [usuario]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtroTienda, filtroFecha]);

  const pedidosFiltrados = useMemo(() => {
    return listaPedidos.filter(p => {
      const matchesTexto = 
        p.usuario?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.producto?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.sku?.toLowerCase().includes(busqueda.toLowerCase());

      const matchesTienda = filtroTienda === 'Todas' || p.tienda === filtroTienda;

      let matchesFecha = true;
      if (p.fechaVenta) {
        const añoPedido = new Date(p.fechaVenta).getFullYear();
        if (filtroFecha === 'Antes2026') {
          matchesFecha = añoPedido < 2026;
        } else if (filtroFecha === 'Desde2026') {
          matchesFecha = añoPedido >= 2026;
        }
      }
      return matchesTexto && matchesTienda && matchesFecha;
    });
  }, [listaPedidos, busqueda, filtroTienda, filtroFecha]);

  const { pedidosPaginados, totalPaginas } = useMemo(() => {
    const total = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);
    const indiceInicio = (paginaActual - 1) * pedidosPorPagina;
    const indiceFin = indiceInicio + pedidosPorPagina;
    return {
      pedidosPaginados: pedidosFiltrados.slice(indiceInicio, indiceFin),
      totalPaginas: total === 0 ? 1 : total
    };
  }, [pedidosFiltrados, paginaActual]);

  const stats = useMemo(() => {
    const totalDinero = listaPedidos.reduce((acc, p) => acc + (Number(p.pagoTotal) || 0), 0);
    const ventasRappi = listaPedidos.filter(p => p.tienda === 'Rappi').length;
    const ventasML = listaPedidos.filter(p => p.tienda === 'Mercado Libre').length;
    return { totalDinero, ventasRappi, ventasML, total: listaPedidos.length };
  }, [listaPedidos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === 'unidad' || name === 'precioUnitario') {
        const unidades = name === 'unidad' ? Number(value) : Number(prevData.unidad);
        const precio = name === 'precioUnitario' ? Number(value) : Number(prevData.precioUnitario);
        newData.pagoTotal = unidades * precio;
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoForm(true);
    try {
      if (editandoId) {
        await axios.patch(`${API_URL}/pedidos/${editandoId}`, formData);
        lanzarToast('¡Registro actualizado correctamente!', 'exito');
      } else {
        await axios.post(`${API_URL}/pedidos`, formData);
        lanzarToast('¡Venta registrada exitosamente!', 'exito');
      }
      cancelarEdicion();
      cargarPedidos();
    } catch (error) { 
      lanzarToast('Error en el servidor al procesar la solicitud', 'error');
    } finally {
      setGuardandoForm(false);
    }
  };

  const prepararEdicion = (pedido: any) => {
    if (usuario.rol !== 'admin') return;
    setEditandoId(pedido.id);
    setFormData({ ...pedido });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData(estadoInicial);
  };

  const eliminarPedido = async (id: string) => {
    if (usuario.rol !== 'admin') return;
    if (window.confirm('¿Seguro que deseas eliminar de forma permanente este registro?')) {
      try {
        await axios.delete(`${API_URL}/pedidos/${id}`);
        cargarPedidos();
        lanzarToast('El registro fue eliminado', 'exito');
      } catch (error) { 
        lanzarToast('No se pudo borrar el registro', 'error'); 
      }
    }
  };

  if (!usuario) return <Login alEntrar={handleLogin} />;

  return (
    <div style={darkBg}>
      <div style={{ maxWidth: '1450px', margin: '0 auto' }}>
        <header style={headerStyle}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', margin: 0 }}>
            <LayoutDashboard color="#a855f7" /> CRM <span style={{color: '#a855f7'}}>PREMIUM</span>
          </h1>
          <div style={userCard}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>MODO {usuario.rol.toUpperCase()}</div>
              <div style={{ fontWeight: 'bold', color: '#fff' }}>{usuario.email}</div>
            </div>
            <button onClick={() => setUsuario(null)} style={logoutBtn}><LogOut size={18} /></button>
          </div>
        </header>

        <div style={statsGrid}>
          <div style={statBox}>
            <div style={statHeader}><DollarSign size={16} color="#a855f7" /> RECAUDACIÓN TOTAL</div>
            <div style={statValue}>${stats.totalDinero.toLocaleString()}</div>
          </div>
          <div style={statBox}>
            <div style={statHeader}><TrendingUp size={16} color="#a855f7" /> VENTAS TOTALES</div>
            <div style={statValue}>{stats.total} <span style={{fontSize: '1rem', color: '#9ca3af'}}>unid.</span></div>
          </div>
          <div style={statBox}>
            <div style={statHeader}>RENDIMIENTO POR CANAL</div>
            <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
              <div style={{flex: 1}}>
                <div style={{fontSize: '0.6rem', color: '#ff5c3e'}}>RAPPI ({stats.ventasRappi})</div>
                <div style={{height: '8px', background: '#1e222b', borderRadius: '4px', marginTop: '4px'}}>
                  <div style={{height: '100%', background: '#ff441f', borderRadius: '4px', width: `${stats.total > 0 ? (stats.ventasRappi/stats.total)*100 : 0}%`}}></div>
                </div>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: '0.6rem', color: '#ffeb3b'}}>M. LIBRE ({stats.ventasML})</div>
                <div style={{height: '8px', background: '#1e222b', borderRadius: '4px', marginTop: '4px'}}>
                  <div style={{height: '100%', background: '#ffe600', borderRadius: '4px', width: `${stats.total > 0 ? (stats.ventasML/stats.total)*100 : 0}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={mainGrid}>
          <section style={glassCard}>
            <h3 style={cardTitle}><ShoppingCart size={20} color="#a855f7" /> {editandoId ? 'EDITAR ENTRADA' : 'NUEVA ENTRADA'}</h3>
            <form onSubmit={handleSubmit} style={formGrid}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelDark}>Tienda</label>
                <select name="tienda" value={formData.tienda} onChange={handleChange} style={inputDark}>
                  <option value="Rappi">Rappi</option>
                  <option value="Mercado Libre">Mercado Libre</option>
                </select>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelDark}>Fecha de Venta (Manual)</label>
                <input type="date" name="fechaVenta" value={formData.fechaVenta} onChange={handleChange} style={inputDark} required />
              </div>
              <div><label style={labelDark}>Cliente</label><input name="usuario" value={formData.usuario} onChange={handleChange} style={inputDark} required /></div>
              <div><label style={labelDark}>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} style={inputDark} /></div>
              <div><label style={labelDark}>Teléfono</label><input name="telefono" value={formData.telefono} onChange={handleChange} style={inputDark} /></div>
              <div><label style={labelDark}>Ciudad</label><input name="ciudad" value={formData.ciudad} onChange={handleChange} style={inputDark} /></div>
              <div style={{ gridColumn: 'span 2' }}><label style={labelDark}>Dirección</label><input name="direccion" value={formData.direccion} onChange={handleChange} style={inputDark} /></div>
              <div><label style={labelDark}>ID Repartidor</label><input name="idRepartidor" value={formData.idRepartidor} onChange={handleChange} style={inputDark} /></div>
              <div><label style={labelDark}>ID Producto</label><input name="idProducto" value={formData.idProducto} onChange={handleChange} style={inputDark} /></div>
              <div><label style={labelDark}>Producto</label><input name="producto" value={formData.producto} onChange={handleChange} style={inputDark} /></div>
              <div><label style={labelDark}>SKU</label><input name="sku" value={formData.sku} onChange={handleChange} style={inputDark} /></div>
              <div><label style={labelDark}>Unid.</label><input type="number" name="unidad" value={formData.unidad} onChange={handleChange} style={inputDark} min="1" /></div>
              <div><label style={labelDark}>Precio Unit.</label><input type="number" name="precioUnitario" value={formData.precioUnitario} onChange={handleChange} style={inputDark} min="0" /></div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelDark}>Pago Total (Calculado Automático)</label>
                <input type="number" name="pagoTotal" value={formData.pagoTotal} readOnly style={{...inputDark, border: '1px solid #a855f7', fontWeight: 'bold', backgroundColor: '#211633', cursor: 'not-allowed'}} />
              </div>
              <div style={{ gridColumn: 'span 2' }}><label style={labelDark}>Notas</label><textarea name="descripcion" value={formData.descripcion} onChange={handleChange} style={{...inputDark, height: '50px'}} /></div>
              
              {editandoId && usuario.rol !== 'admin' ? (
                <div style={lockBanner}>SOLO ADMIN EDITA</div>
              ) : (
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" disabled={guardandoForm} style={{...btnPurple, flex: 1, marginTop: 0, opacity: guardandoForm ? 0.6 : 1}}>
                    {guardandoForm ? 'PROCESANDO...' : editandoId ? 'ACTUALIZAR' : 'REGISTRAR'}
                  </button>
                  {editandoId && (
                    <button type="button" onClick={cancelarEdicion} style={{...actionBtn, background: '#3f4758', color: '#fff', padding: '0 15px', borderRadius: '8px'}}>
                      CANCELAR
                    </button>
                  )}
                </div>
              )}
            </form>
          </section>

          <section style={glassCard}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{...cardTitle, margin: 0}}><ClipboardList size={20} color="#a855f7" /> HISTORIAL</h3>
                <div style={searchWrapper}>
                  <Search size={16} color="#9ca3af" />
                  <input 
                    placeholder="Buscar cliente, producto o SKU..." 
                    style={searchInput} 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>
              <div style={filterBarContainer}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#a0aec0', fontSize: '0.8rem'}}>
                  <Filter size={14} color="#a855f7" /> <span>Filtrar por:</span>
                </div>
                <div style={{display: 'flex', gap: '10px', flex: 1}}>
                  <select value={filtroTienda} onChange={(e) => setFiltroTienda(e.target.value)} style={filterDropdown}>
                    <option value="Todas">Todas las Tiendas</option>
                    <option value="Rappi">Solo Rappi</option>
                    <option value="Mercado Libre">Solo Mercado Libre</option>
                  </select>
                  <select value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} style={filterDropdown}>
                    <option value="Todos">Todos los Periodos</option>
                    <option value="Antes2026">Ventas anteriores a 2026</option>
                    <option value="Desde2026">Ventas año 2026 en adelante</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={darkTable}>
                <thead>
                  <tr style={tableHeaderRow}>
                    <th>FECHA</th><th>CLIENTE</th><th>PRODUCTO</th><th>TOTAL</th><th>OPC.</th>
                  </tr>
                </thead>
                <tbody>
                  {cargandoTabla ? (
                    <tr><td colSpan={5} style={{textAlign: 'center', padding: '30px', color: '#9ca3af'}}>Cargando...</td></tr>
                  ) : pedidosPaginados.length === 0 ? (
                    <tr><td colSpan={5} style={{textAlign: 'center', padding: '30px', color: '#9ca3af'}}>Sin resultados.</td></tr>
                  ) : (
                    pedidosPaginados.map((p) => (
                      <tr key={p.id} style={tableRow}>
                        <td style={{color: '#9ca3af', fontSize: '0.75rem'}}>{p.fechaVenta}</td>
                        <td style={{fontWeight: 'bold', fontSize: '0.85rem'}}>{p.usuario}</td>
                        <td style={{fontSize: '0.85rem', color: '#e5e7eb'}}>{p.producto}</td>
                        <td style={{color: '#bc77ff', fontWeight: 'bold'}}>${Number(p.pagoTotal).toLocaleString()}</td>
                        <td>
                          {usuario.rol === 'admin' && (
                            <div style={{display: 'flex', gap: '5px'}}>
                              <button onClick={() => prepararEdicion(p)} style={actionBtn}><Pencil size={12} /></button>
                              <button onClick={() => eliminarPedido(p.id)} style={{...actionBtn, color: '#ff6b6b'}}><Trash2 size={12} /></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {!cargandoTabla && pedidosFiltrados.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #3f4758' }}>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                  Mostrando {Math.min(pedidosFiltrados.length, (paginaActual - 1) * pedidosPorPagina + 1)} - {Math.min(pedidosFiltrados.length, paginaActual * pedidosPorPagina)} de {pedidosFiltrados.length} pedidos
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button disabled={paginaActual === 1} onClick={() => setPaginaActual(prev => prev - 1)} style={actionBtn}>Anterior</button>
                  <span style={{ color: '#fff', fontSize: '0.85rem', alignSelf: 'center', fontWeight: 'bold' }}>{paginaActual} / {totalPaginas}</span>
                  <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(prev => prev + 1)} style={actionBtn}>Siguiente</button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      {toast.visible && (
        <div style={{...toastBoxContainer, borderLeft: toast.tipo === 'exito' ? '4px solid #10b981' : '4px solid #ef4444'}}>
          {toast.tipo === 'exito' ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#ef4444" />}
          <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{toast.mensaje}</span>
        </div>
      )}
    </div>
  );
}

const darkBg = { backgroundColor: '#1e222b', minHeight: '100vh', padding: '20px', color: '#fff', fontFamily: 'sans-serif' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' };
const userCard = { display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#282d3b', padding: '8px 15px', borderRadius: '10px', border: '1px solid #3f4758' };
const logoutBtn = { background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' };
const statsGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '15px', marginBottom: '25px' };
const statBox = { backgroundColor: '#282d3b', padding: '15px', borderRadius: '12px', border: '1px solid #3f4758' };
const statHeader = { fontSize: '0.65rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' as 'bold' };
const statValue = { fontSize: '1.6rem', fontWeight: 'bold', marginTop: '5px', color: '#fff' };
const mainGrid = { display: 'grid', gridTemplateColumns: '400px 1fr', gap: '20px' };
const glassCard = { backgroundColor: '#282d3b', padding: '20px', borderRadius: '15px', border: '1px solid #3f4758' };
const cardTitle = { margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' };
const searchWrapper = { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#1e222b', padding: '8px 15px', borderRadius: '8px', border: '1px solid #3f4758', width: '300px' };
const searchInput = { background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '0.8rem', width: '100%' };
const formGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' };
const labelDark = { fontSize: '0.65rem', color: '#a0aec0', marginBottom: '3px', display: 'block', fontWeight: 'bold' as 'bold' };
const inputDark = { width: '100%', padding: '9px', borderRadius: '7px', border: '1px solid #3f4758', backgroundColor: '#1e222b', color: '#fff', boxSizing: 'border-box' as 'border-box', outline: 'none', fontSize: '0.85rem' };
const btnPurple = { gridColumn: 'span 2', padding: '12px', backgroundColor: '#a855f7', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' as 'bold', cursor: 'pointer', marginTop: '10px' };
const darkTable = { width: '100%', borderCollapse: 'collapse' as 'collapse' };
const tableHeaderRow = { textAlign: 'left' as 'left', color: '#a0aec0', fontSize: '0.75rem', borderBottom: '1px solid #3f4758' };
const tableRow = { borderBottom: '1px solid #3f4758', height: '40px' };
const actionBtn = { background: '#1e222b', border: '1px solid #3f4758', borderRadius: '5px', cursor: 'pointer', padding: '5px', color: '#a855f7' };
const lockBanner = { gridColumn: 'span 2', padding: '10px', backgroundColor: '#211633', color: '#a855f7', textAlign: 'center' as 'center', fontSize: '0.7rem', borderRadius: '8px' };
const filterBarContainer = { display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#1e222b', padding: '10px 15px', borderRadius: '8px', border: '1px solid #3f4758' };
const filterDropdown = { backgroundColor: '#282d3b', color: '#fff', border: '1px solid #3f4758', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', outline: 'none', cursor: 'pointer', flex: 1 };
const toastBoxContainer = { position: 'fixed' as 'fixed', bottom: '25px', right: '25px', backgroundColor: '#282d3b', color: '#fff', padding: '14px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)', zIndex: 1000, minWidth: '250px' };

export default App;