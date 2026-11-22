import { AlertCircle, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
export default function Notice({ message, error = false }) {
  return (
    <div
      className={error ? "status-panel status-error" : "status-panel"}
      role={error ? "alert" : "status"}
    >
      {error ? <AlertCircle size={25} /> : <Database size={25} />}
      <p>
        {!isSupabaseConfigured
          ? "Conexiunea cu Supabase nu este configurată. Adaugă VITE_SUPABASE_URL și VITE_SUPABASE_PUBLISHABLE_KEY în fișierul .env, apoi rulează scriptul SQL din dosarul supabase."
          : message}
      </p>
      <Link to="/">Înapoi acasă</Link>
    </div>
  );
}
