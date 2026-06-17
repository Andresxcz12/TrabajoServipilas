import { useState } from 'react';
import type { FormEvent } from 'react';

interface LoginProps {
  alEntrar: (datos: { email: string; rol: string }) => void;
}

const usuariosValidos = [
  { email: 'admin@test.com', pass: '123456', rol: 'admin' },
  { email: 'empleado@test.com', pass: '123456', rol: 'empleado' }
];

export const Login = ({ alEntrar }: LoginProps) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usuarioEncontrado = usuariosValidos.find(
      (u) => u.email === inputEmail && u.pass === inputPassword
    );

    if (usuarioEncontrado) {
      alEntrar({ email: usuarioEncontrado.email, rol: usuarioEncontrado.rol });
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111827' }}>
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '380px', padding: '32px', borderRadius: '16px', background: '#1f2937', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <h2 style={{ color: '#f8fafc', marginBottom: '24px', textAlign: 'center' }}>Iniciar sesión</h2>

        <label style={{ display: 'block', marginBottom: '10px', color: '#e5e7eb' }}>
          Email
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', marginTop: '8px', borderRadius: '10px', border: '1px solid #374151', background: '#111827', color: '#f8fafc' }}
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '20px', color: '#e5e7eb' }}>
          Contraseña
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', marginTop: '8px', borderRadius: '10px', border: '1px solid #374151', background: '#111827', color: '#f8fafc' }}
            required
          />
        </label>

        <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#8b5cf6', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};