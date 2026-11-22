import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, UserRound, LogOut, Menu, X, Wrench, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { cartCount } = useCart();
  const { isLoggedIn, userEmail, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);
  async function logout() {
    try { await signOut(); closeMenu(); navigate("/"); }
    catch (err) { setError(err.message); }
  }
  return (
    <>
      <div className="topbar"><div className="container topbar-inner"><span>MAGAZIN DEMONSTRATIV · PROIECT DE PORTOFOLIU</span><span>Piese pentru fiecare drum. Atenție la compatibilitate.</span></div></div>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={closeMenu} aria-label="Absolut Components - Acasă">
            <span className="brand-mark"><Wrench size={23} strokeWidth={2.4} /></span>
            <span className="brand-name">ABSOLUT<span>COMPONENTS</span><small>AUTO PARTS & ACCESSORIES</small></span>
          </Link>
          <button className="mobile-toggle" type="button" aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Navigare principală">
            <NavLink to="/" end onClick={closeMenu}>Acasă</NavLink>
            <NavLink to="/products" onClick={closeMenu}>Toate piesele <ChevronDown size={13} /></NavLink>
            <NavLink to="/aboutUs" onClick={closeMenu}>Despre noi</NavLink>
            {isLoggedIn && <NavLink to="/orders" onClick={closeMenu}>Comenzile mele</NavLink>}
            <Link to="/cart" className="nav-cart" onClick={closeMenu}><ShoppingBag size={19} /> Coș <span className="cart-count">{cartCount}</span></Link>
            {isLoggedIn ? (
              <div className="nav-account"><span className="account-name" title={userEmail}><UserRound size={16}/>{userEmail?.split("@")[0]}</span><button type="button" onClick={logout} className="nav-logout"><LogOut size={16} /> Ieșire</button></div>
            ) : <Link className="nav-login" to="/login" onClick={closeMenu}><UserRound size={17} /> Contul meu</Link>}
          </nav>
        </div>
        {error && <p className="header-error" role="alert">{error}</p>}
      </header>
    </>
  );
}
