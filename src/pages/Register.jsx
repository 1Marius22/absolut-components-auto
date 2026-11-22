import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (password.length < 6) {
      setError("Parola trebuie să aibă minimum 6 caractere.");
      return;
    }
    if (password !== confirm) {
      setError("Parolele nu coincid.");
      return;
    }
    setLoading(true);
    try {
      const data = await signUp(email.trim(), password);
      if (data.session) navigate("/products");
      else
        setSuccess(
          "Cont creat! Verifică e-mailul și confirmă adresa înainte de autentificare.",
        );
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
          <UserPlus size={24} />
        </div>
        <p className="eyebrow">ÎNCEPE AICI</p>
        <h1>Creează un cont</h1>
        <p className="auth-description">
          Înregistrează-te pentru a salva comenzile tale demonstrative.
        </p>
        {!isSupabaseConfigured && (
          <p className="form-error">Configurează mai întâi Supabase în .env.</p>
        )}
        <form onSubmit={submit} className="auth-form">
          <label htmlFor="register-email">Adresă de e-mail</label>
          <input
            id="register-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nume@exemplu.ro"
          />
          <label htmlFor="register-password">Parolă (min. 6 caractere)</label>
          <input
            id="register-password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Alege o parolă"
          />
          <label htmlFor="register-confirm">Confirmă parola</label>
          <input
            id="register-confirm"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repetă parola"
          />
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="form-success" role="status">
              {success}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="btn btn-primary btn-block"
          >
            {loading ? "Se creează contul..." : "Creează cont"}
            <ArrowRight size={18} />
          </button>
        </form>
        <p className="auth-switch">
          Ai deja cont? <Link to="/login">Autentifică-te</Link>
        </p>
        <p className="auth-safe">
          <LockKeyhole size={16} /> Datele contului sunt gestionate de Supabase
          Auth
        </p>
      </div>
    </section>
  );
}
