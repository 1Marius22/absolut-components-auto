import { Link } from "react-router-dom";
import {
  Wrench,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

export default function Footer() {
  return (
    <>
      <section className="confidence">
        <div className="container confidence-grid">
          <div>
            <Truck size={26} />
            <span>
              <strong>Comandă demonstrativă</strong>
              <small>Nu se efectuează livrări reale</small>
            </span>
          </div>
          <div>
            <ShieldCheck size={26} />
            <span>
              <strong>Cont personal</strong>
              <small>Acces securizat cu Supabase</small>
            </span>
          </div>
          <div>
            <Headphones size={26} />
            <span>
              <strong>Seriozitate</strong>
              <small>Oricand alaturi de tine</small>
            </span>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Wrench size={22} /> ABSOLUT COMPONENTS
            </div>
            <p>
              Un concept de magazin online pentru piese și consumabile auto,
              dezvoltat ca proiect de portofoliu.
            </p>
            <span className="footer-note">
              Produse și prețuri demonstrative.
            </span>
          </div>
          <div>
            <h4>Explorează</h4>
            <Link to="/">Acasă</Link>
            <Link to="/products">Catalog piese</Link>
            <Link to="/aboutUs">Despre noi</Link>
          </div>
          <div>
            <h4>Contul tău</h4>
            <Link to="/login">Autentificare</Link>
            <Link to="/register">Înregistrare</Link>
            <Link to="/cart">Coșul meu</Link>
            <Link to="/orders">Comenzile mele</Link>
          </div>
          <div>
            <h4>Informații utile</h4>
            <p>
              Verifică întotdeauna codul și compatibilitatea piesei cu mașina ta
              înainte de achiziție.
            </p>
            <Link to="/products" className="footer-shop">
              Vezi catalogul <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Absolut Components. Proiect
            demonstrativ.
          </span>
          <span>Construit cu React + Supabase</span>
        </div>
      </footer>
    </>
  );
}
