import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { formatDate, formatPrice } from "../lib/format";

export default function Orders() {
  const { user } = useAuth();
  const userId = user?.id;
  const [result, setResult] = useState({
    userId: null,
    orders: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    let active = true;
    setResult({ userId, orders: [], loading: true, error: "" });

    if (!userId || !supabase) {
      setResult({
        userId,
        orders: [],
        loading: false,
        error: "Nu există o sesiune de autentificare activă.",
      });
      return () => {
        active = false;
      };
    }

    async function loadOrders() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id,created_at,status,total_amount,shipping_name")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (!active) return;
        setResult({
          userId,
          orders: error ? [] : (data ?? []),
          loading: false,
          error: error?.message ?? "",
        });
      } catch (error) {
        if (active)
          setResult({
            userId,
            orders: [],
            loading: false,
            error: error.message,
          });
      }
    }

    loadOrders();
    return () => {
      active = false;
    };
  }, [userId]);

  // Nu afișăm rezultate rămase de la o sesiune anterioară.
  const loading = result.userId !== userId || result.loading;
  const orders = result.userId === userId ? result.orders : [];
  const error = result.userId === userId ? result.error : "";

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
          {orders.map((order) => (
            <Link
              to={`/orders/${order.id}`}
              className="order-row"
              key={order.id}
            >
              <span className="order-icon">
                <Package size={23} />
              </span>
              <div>
                <strong>Comanda #{order.id.slice(0, 8).toUpperCase()}</strong>
                <p>
                  {formatDate(order.created_at)} · {order.shipping_name}
                </p>
              </div>
              <span className="order-status">{order.status}</span>
              <strong className="order-price">
                {formatPrice(order.total_amount)}
              </strong>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
