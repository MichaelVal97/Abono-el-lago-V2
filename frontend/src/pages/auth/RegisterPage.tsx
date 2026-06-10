import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const googleAuthUrl = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'}/auth/google`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    try {
      await api.register({ name, email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo registrar');
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Crear cuenta</h1>
        <p>Registra tu perfil para comprar y hacer seguimiento de tus pedidos.</p>
        <a className="google-button" href={googleAuthUrl}>
          Registrarse con Google
        </a>
        <div className="auth-divider">
          <span>o</span>
        </div>
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Nombre
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          </label>
          <label>
            Correo
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </label>
          <label>
            Contraseña
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button type="submit">Registrarme</button>
        </form>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}
