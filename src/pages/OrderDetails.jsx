import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Package, MapPin } from "lucide-react";
import { supabase } from "../lib/supabase";
import { formatDate, formatPrice } from "../lib/format";

export default function OrderDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    supabase
      .from("orders")
      .select(
        "id,created_at,status,total_amount,shipping_name,phone,city,address,postal_code,order_items(product_name,quantity,unit_price,line_total)",
      )
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error: e }) => {
        if (active) {
          setOrder(data);
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
  }, [id]);
  return (
    <div className="container order-details">
      <Link to="/orders" className="back-link">
        <ArrowLeft size={17} /> Toate comenzile
      </Link>
      {location.state?.newOrder && (
        <p className="form-success success-banner">
          <CheckCircle2 size={20} /> Comanda demonstrativă a fost salvată în
          Supabase!
        </p>
      )}
      {loading ? (
        <div className="status-panel">Se încarcă comanda...</div>
      ) : error || !order ? (
        <div className="status-panel status-error">
          {error || "Comanda nu există sau nu ai acces la ea."}
        </div>
      ) : (
        <>
          <div className="page-heading">
            <p className="eyebrow">COMANDĂ DEMONSTRATIVĂ</p>
            <h1>Comanda #{order.id.slice(0, 8).toUpperCase()}</h1>
            <p>
              {formatDate(order.created_at)} · Status: {order.status}
            </p>
          </div>
          <div className="order-detail-grid">
            <section className="order-detail-card">
              <h2>
                <Package size={20} /> Produse comandate
              </h2>
              {order.order_items?.map((item, index) => (
                <div className="order-product" key={index}>
                  <span>
                    {item.product_name} <small>× {item.quantity}</small>
                  </span>
                  <strong>{formatPrice(item.line_total)}</strong>
                </div>
              ))}
              <div className="order-grand-total">
                <span>Total</span>
                <strong>{formatPrice(order.total_amount)}</strong>
              </div>
            </section>
            <section className="order-detail-card">
              <h2>
                <MapPin size={20} /> Date livrare (demo)
              </h2>
              <p>
                <strong>{order.shipping_name}</strong>
              </p>
              <p>{order.address}</p>
              <p>
                {order.city}, {order.postal_code}
              </p>
              <p>Telefon: {order.phone}</p>
              <p className="order-demo-note">
                Această comandă nu implică livrare sau plată reală.
              </p>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
