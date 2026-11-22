import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, imageUrl } from "../lib/format";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-media">
        <span className="product-badge">{product.category}</span>
        <img
          src={imageUrl(product.image_path)}
          alt={product.name}
          loading="lazy"
        />
        <span className="product-view">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="product-body">
        <p className="product-sku">
          {product.brand} · {product.sku}
        </p>
        <Link className="product-title" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <div className="product-meta">
          <span className={product.stock > 0 ? "in-stock" : "out-stock"}>
            {product.stock > 0 ? "● În stoc" : "● Stoc epuizat"}
          </span>
          <span>Cod: {product.sku}</span>
        </div>
        <div className="product-buy">
          <div>
            <small>Preț demo</small>
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={product.stock < 1}
            className="quick-cart"
            aria-label={`Adaugă în coș ${product.name}`}
            title="Adaugă în coș"
          >
            <ShoppingCart size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}
