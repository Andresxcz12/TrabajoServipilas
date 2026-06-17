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
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const usuarioEncontrado = usuariosValidos.find(
      (u) => u.email === inputEmail && u.pass === inputPassword
    );

    if (usuarioEncontrado) {
      alEntrar({ email: usuarioEncontrado.email, rol: usuarioEncontrado.rol });
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b1220' }}>
      <form
        onSubmit={handleLogin}
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '36px',
          borderRadius: '22px',
          background: '#0f172a',
          boxShadow: '0 35px 90px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(139,92,246,0.3)',
        }}
      >
        <h2 style={{ color: '#c084fc', marginBottom: '24px', textAlign: 'center', fontSize: '1.8rem' }}>Acceso al Sistema</h2>

        <label style={{ display: 'block', marginBottom: '14px', color: '#e5e7eb' }}>
          Email
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginTop: '10px',
              borderRadius: '14px',
              border: '1px solid rgba(148,163,184,0.2)',
              background: '#111827',
              color: '#f8fafc',
            }}
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '24px', color: '#e5e7eb' }}>
          Contraseña
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginTop: '10px',
              borderRadius: '14px',
              border: '1px solid rgba(148,163,184,0.2)',
              background: '#111827',
              color: '#f8fafc',
            }}
            required
          />
        </label>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '14px',
            border: 'none',
            background: '#8b5cf6',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.5px',
            cursor: 'pointer',
          }}
        >
          ENTRAR
        </button>
        {error && <div style={{ marginTop: '18px', color: '#fb7185', textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};