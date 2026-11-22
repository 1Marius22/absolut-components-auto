import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { supabase } from "../lib/supabase";
import { formatDate, formatPrice } from "../lib/format";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    supabase
      .from("orders")
      .select("id,created_at,status,total_amount,shipping_name")
      .order("created_at", { ascending: false })
      .then(({ data, error: e }) => {
        if (active) {
          setOrders(data || []);
          setError(e?.message || "");
          setLoading(false);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className="container orders-page">
      <div className="page-heading">
        <p className="eyebrow">CONTUL MEU</p>
        <h1>
          Comenzile mele<span className="title-dot">.</span>
        </h1>
        <p>Comenzile demonstrative salvate în baza de date Supabase.</p>
      </div>
      {loading ? (
        <div className="status-panel">Se încarcă istoricul...</div>
      ) : error ? (
        <div className="status-panel status-error">{error}</div>
      ) : orders.length === 0 ? (
        <div className="empty-cart">
          <Package size={42} />
          <h2>Nu ai plasat încă nicio comandă.</h2>
          <p>Începe cu selecția de piese din catalog.</p>
          <Link to="/products" className="btn btn-primary">
            Explorează produsele <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <Link to={`/orders/${o.id}`} className="order-row" key={o.id}>
              <span className="order-icon">
                <Package size={23} />
              </span>
              <div>
                <strong>Comanda #{o.id.slice(0, 8).toUpperCase()}</strong>
                <p>
                  {formatDate(o.created_at)} · {o.shipping_name}
                </p>
              </div>
              <span className="order-status">{o.status}</span>
              <strong className="order-price">
                {formatPrice(o.total_amount)}
              </strong>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
