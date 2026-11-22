import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, imageUrl } from "../lib/format";

export default function Cart({ compact = false }) {
  const { products, updateQuantity, removeProduct, cartTotal, cartCount } =
    useCart();
  return (
    <div className={compact ? "cart-mini" : "container cart-page"}>
      {!compact && (
        <>
          <div className="breadcrumbs">
            <Link to="/">Acasă</Link>
            <span>/</span>
            <span>Coșul meu</span>
          </div>
          <div className="page-heading">
            <p className="eyebrow">GATA PENTRU URMĂTORUL PAS?</p>
            <h1>
              Coșul tău<span className="title-dot">.</span>
            </h1>
            <p>
              {cartCount}{" "}
              {cartCount === 1 ? "produs adăugat" : "produse adăugate"}
            </p>
          </div>
        </>
      )}
      {products.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={40} />
          <h2>Coșul este gol</h2>
          <p>Descoperă gama noastră de piese și consumabile auto.</p>
          <Link to="/products" className="btn btn-primary">
            Vezi catalogul <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className={compact ? "" : "cart-layout"}>
          <div className="cart-lines">
            {products.map((product) => (
              <article className="cart-line" key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="cart-line-image"
                >
                  <img src={imageUrl(product.image_path)} alt={product.name} />
                </Link>
                <div className="cart-line-details">
                  <p className="product-sku">
                    {product.brand} · {product.sku}
                  </p>
                  <Link
                    to={`/products/${product.id}`}
                    className="cart-line-name"
                  >
                    {product.name}
                  </Link>
                  <span className="cart-line-price">
                    {formatPrice(product.price)}
                  </span>
                  <div className="cart-line-actions">
                    <div className="qty-stepper qty-small">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity - 1)
                        }
                        aria-label="Scade cantitatea"
                      >
                        <Minus size={15} />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                        aria-label="Crește cantitatea"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      className="remove-cart"
                    >
                      <Trash2 size={16} /> Șterge
                    </button>
                  </div>
                </div>
                <strong className="cart-line-total">
                  {formatPrice(product.price * product.quantity)}
                </strong>
              </article>
            ))}
          </div>
          {!compact && (
            <aside className="cart-summary">
              <h3>Sumar comandă</h3>
              <div>
                <span>Produse ({cartCount})</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <div>
                <span>Livrare</span>
                <span>Nu se aplică (demo)</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-block">
                Continuă spre comandă <ArrowRight size={17} />
              </Link>
              <Link to="/products" className="continue-link">
                ← Continuă cumpărăturile
              </Link>
              <p className="summary-note">
                Site demonstrativ: comenzile nu generează livrări sau plăți
                reale.
              </p>
            </aside>
          )}
          {compact && (
            <div className="mini-total">
              <span>Total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
