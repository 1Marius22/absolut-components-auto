import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { formatPrice } from "../lib/format";
import Cart from "../components/Cart";

export default function Checkout() {
  const { products, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shippingName: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const change = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!supabase) {
      setError("Configurează Supabase înainte de a plasa comenzi.");
      return;
    }
    if (!products.length) {
      setError("Coșul este gol.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: dbError } = await supabase.rpc("place_order", {
        p_items: products.map((p) => ({
          product_id: p.id,
          quantity: p.quantity,
        })),
        p_shipping_name: form.shippingName.trim(),
        p_phone: form.phone.trim(),
        p_city: form.city.trim(),
        p_address: form.address.trim(),
        p_postal_code: form.postalCode.trim(),
      });
      if (dbError) throw dbError;
      clearCart();
      navigate(`/orders/${data}`, { replace: true, state: { newOrder: true } });
    } catch (err) {
      setError(`Comanda nu a fost salvată: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container checkout-page">
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <Link to="/cart">Coș</Link>
        <span>/</span>
        <span>Finalizare</span>
      </div>
      <div className="page-heading">
        <p className="eyebrow">UN ULTIM PAS</p>
        <h1>
          Finalizează comanda<span className="title-dot">.</span>
        </h1>
        <p>Introdu datele pentru o comandă demonstrativă.</p>
      </div>
      {products.length === 0 ? (
        <div className="status-panel">
          Coșul este gol. <Link to="/products">Înapoi la catalog</Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submit}>
            <h2>Informații de livrare (demo)</h2>
            <p>
              Folosește date fictive pentru test. Informațiile introduse sunt
              salvate în Supabase, în contul tău.
            </p>
            <div className="form-grid">
              <div className="field field-wide">
                <label htmlFor="shippingName">Nume și prenume *</label>
                <input
                  id="shippingName"
                  name="shippingName"
                  required
                  maxLength={120}
                  value={form.shippingName}
                  onChange={change}
                  placeholder="Nume Prenume"
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="phone">Telefon *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={30}
                  value={form.phone}
                  onChange={change}
                  placeholder="07xx xxx xxx"
                  autoComplete="tel"
                />
              </div>
              <div className="field">
                <label htmlFor="city">Localitate *</label>
                <input
                  id="city"
                  name="city"
                  required
                  maxLength={100}
                  value={form.city}
                  onChange={change}
                  placeholder="Oraș"
                  autoComplete="address-level2"
                />
              </div>
              <div className="field field-wide">
                <label htmlFor="address">Adresă *</label>
                <input
                  id="address"
                  name="address"
                  required
                  maxLength={250}
                  value={form.address}
                  onChange={change}
                  placeholder="Stradă și număr"
                  autoComplete="street-address"
                />
              </div>
              <div className="field">
                <label htmlFor="postalCode">Cod poștal *</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  required
                  maxLength={15}
                  value={form.postalCode}
                  onChange={change}
                  placeholder="Cod poștal"
                  autoComplete="postal-code"
                />
              </div>
            </div>
            <div className="payment-demo">
              <Truck size={22} />
              <div>
                <strong>Modalitate: Ramburs (simulat)</strong>
                <p>
                  Nu se solicită date bancare și nu se efectuează plată sau
                  livrare reală.
                </p>
              </div>
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={loading || !supabase}
            >
              {loading ? "Se salvează..." : "Plasează comanda demonstrativă"}
              <ArrowRight size={18} />
            </button>
            <p className="checkout-safe">
              <LockKeyhole size={15} /> Comanda se salvează în Supabase și este
              vizibilă doar din contul tău.
            </p>
          </form>
          <aside className="checkout-review">
            <h3>Sumar coș</h3>
            <Cart compact />
            <div className="checkout-review-total">
              Total <strong>{formatPrice(cartTotal)}</strong>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
