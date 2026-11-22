import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Info,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { formatPrice, imageUrl } from "../lib/format";
import { useCart } from "../context/CartContext";
import Notice from "../components/Notice";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data, error: e }) => {
        if (active) {
          setProduct(data);
          setError(e?.message || "");
          setLoading(false);
          setQuantity(1);
          setNotice("");
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
  if (!supabase)
    return (
      <div className="container">
        <Notice />
      </div>
    );
  if (loading)
    return (
      <div className="container status-panel">
        Se încarcă detaliile produsului...
      </div>
    );
  if (error || !product)
    return (
      <div className="container">
        <Notice
          error
          message={error || "Produsul nu există sau nu mai este disponibil."}
        />
      </div>
    );
  return (
    <div className="container details-page">
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <Link to="/products">Piese auto</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="details-layout">
        <div className="details-image">
          <img src={imageUrl(product.image_path)} alt={product.name} />
          <span className="details-image-label">IMAGINE PRODUS</span>
        </div>
        <div className="details-info">
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="back-link"
          >
            <ArrowLeft size={16} /> {product.category}
          </Link>
          <p className="eyebrow">
            {product.brand} · COD {product.sku}
          </p>
          <h1>{product.name}</h1>
          <div className="details-stock">
            <CheckCircle2 size={17} />{" "}
            {product.stock > 0
              ? `În stoc · ${product.stock} bucăți`
              : "Stoc epuizat"}
          </div>
          <p className="details-description">{product.description}</p>
          <div className="details-divider" />
          <p className="details-price-label">Preț demonstrativ</p>
          <p className="details-price">{formatPrice(product.price)}</p>
          <div className="details-actions">
            <div className="qty-stepper">
              <button
                type="button"
                aria-label="Scade cantitatea"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={17} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Crește cantitatea"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
              >
                <Plus size={17} />
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary add-detail"
              disabled={product.stock <= 0}
              onClick={() => {
                addToCart(product, quantity);
                setNotice(
                  `${quantity} ${quantity === 1 ? "produs adăugat" : "produse adăugate"} în coș.`,
                );
              }}
            >
              <ShoppingBag size={19} /> Adaugă în coș
            </button>
          </div>
          {notice && (
            <p className="success-message">
              <CheckCircle2 size={16} />
              {notice} <Link to="/cart">Vezi coșul</Link>
            </p>
          )}
          <div className="details-advice">
            <Info size={20} />
            <p>
              <strong>Compatibilitate auto</strong>
              <br />
              Verifică codul OE, modelul, anul și motorizarea mașinii. Acest
              site este un proiect demonstrativ și nu oferă verificarea automată
              a compatibilității.
            </p>
          </div>
          <p className="details-safe">
            <ShieldCheck size={16} /> Comandă demonstrativă • Fără plată online
          </p>
        </div>
      </div>
    </div>
  );
}
