import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Wrench } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/products";
  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-symbol">
          <Wrench size={24} />
        </div>
        <p className="eyebrow">BINE AI REVENIT</p>
        <h1>Intră în contul tău</h1>
        <p className="auth-description">
          Autentifică-te pentru a salva o comandă și a vedea istoricul.
        </p>
        {!isSupabaseConfigured && (
          <p className="form-error">Configurează mai întâi Supabase în .env.</p>
        )}
        <form onSubmit={submit} className="auth-form">
          <label htmlFor="login-email">Adresă de e-mail</label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nume@exemplu.ro"
          />
          <label htmlFor="login-password">Parolă</label>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parola ta"
            minLength={6}
          />
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="btn btn-primary btn-block"
          >
            {loading ? "Se autentifică..." : "Autentificare"}
            <ArrowRight size={18} />
          </button>
        </form>
        <div className="auth-separator">
          <span>sau</span>
        </div>
        <p className="auth-switch">
          Nu ai un cont? <Link to="/register">Creează un cont</Link>
        </p>
        <p className="auth-safe">
          <LockKeyhole size={16} /> Autentificare securizată prin Supabase
        </p>
      </div>
    </section>
  );
}
