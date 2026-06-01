import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  alEntrar: (datos: any) => void;
}

export function Login({ alEntrar }: LoginProps) {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usar variable de entorno VITE_API_URL en producción, con fallback a localhost
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await axios.post(`${apiBase}/pedidos/login`, credenciales);
      alEntrar(res.data); // Si es correcto, guardamos el usuario
    } catch (error) {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div style={styles.loginBg}>
      <div style={styles.loginCard}>
        <h2 style={{ color: '#a855f7', marginBottom: '20px' }}>Acceso al Sistema</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            style={styles.inputLogin}
            onChange={(e) => setCredenciales({...credenciales, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            style={styles.inputLogin}
            onChange={(e) => setCredenciales({...credenciales, password: e.target.value})}
            required
          />
          <button type="submit" style={styles.botonLogin}>ENTRAR</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loginBg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',      // Cubre el alto total
    width: '100vw',          // Cubre el ancho total
    backgroundColor: '#000', // Negro absoluto
    margin: 0,
    padding: '20px',         // Espacio para móviles
    boxSizing: 'border-box' as 'border-box',
    position: 'fixed' as 'fixed', // Evita desplazamientos raros
    top: 0,
    left: 0,
  },
  loginCard: {
    padding: '40px 20px',
    backgroundColor: '#121212',
    borderRadius: '15px',
    border: '1px solid #333',
    boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)',
    width: '100%',
    maxWidth: '400px',       // No se estira demasiado en PC
    textAlign: 'center' as 'center',
  },
  inputLogin: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#1d1d1d',
    color: 'white',
    fontSize: '16px',        // Evita zoom automático en iPhone
    width: '100%',
    boxSizing: 'border-box' as 'border-box',
  },
  botonLogin: {
    padding: '14px',
    backgroundColor: '#a855f7',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold',
    fontSize: '1rem',
    marginTop: '10px',
    transition: '0.3s',
  }
};