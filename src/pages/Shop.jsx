import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";
import Notice from "../components/Notice";

const categories = [
  "Toate piesele",
  "Filtre",
  "Frânare",
  "Suspensie și direcție",
  "Motor și aprindere",
  "Uleiuri și lichide",
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "Toate piesele";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from("products")
      .select(
        "id,sku,name,description,category,brand,price,stock,image_path,is_active",
      )
      .eq("is_active", true)
      .order("name")
      .then(({ data, error: requestError }) => {
        if (!active) return;
        if (requestError) setError(requestError.message);
        else {
          setProducts(data || []);
          setError("");
        }
        setLoading(false);
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
  }, [refresh]);

  const displayed = useMemo(() => {
    const normalized = query.toLocaleLowerCase("ro").trim();
    const result = products.filter(
      (p) =>
        (activeCategory === "Toate piesele" || p.category === activeCategory) &&
        (!normalized ||
          [p.name, p.sku, p.brand, p.description].some((v) =>
            v?.toLocaleLowerCase("ro").includes(normalized),
          )),
    );
    return result.sort((a, b) =>
      sort === "price_asc"
        ? a.price - b.price
        : sort === "price_desc"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name, "ro")
            : a.sku.localeCompare(b.sku),
    );
  }, [products, activeCategory, query, sort]);

  function changeCategory(category) {
    setSearchParams(category === "Toate piesele" ? {} : { category });
  }

  return (
    <div className="catalog-page">
      <div className="page-banner">
        <div className="container">
          <p className="eyebrow">ABSOLUT COMPONENTS / MAGAZIN</p>
          <h1>
            Piese auto pentru fiecare drum<span className="title-dot">.</span>
          </h1>
          <p>
            Explorează filtre, frâne, suspensie și consumabile. Produsele sunt
            încărcate direct din Supabase.
          </p>
        </div>
      </div>
      <div className="container catalog-layout">
        <aside className="catalog-sidebar">
          <div className="sidebar-title">
            <SlidersHorizontal size={19} /> Categorii
          </div>
          <div className="category-menu">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={
                  activeCategory === cat
                    ? "category-choice selected"
                    : "category-choice"
                }
                onClick={() => changeCategory(cat)}
              >
                {cat}
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
          <div className="sidebar-help">
            <strong>Nu știi exact ce piesă alegi?</strong>
            <p>
              Verifică seria piesei, modelul și motorizarea înainte de comandă.
            </p>
          </div>
        </aside>
        <section className="catalog-content">
          <div className="catalog-controls">
            <div className="search-field">
              <Search size={19} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută piesă, cod sau producător..."
                aria-label="Caută produse"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Șterge căutarea"
                  onClick={() => setQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <label className="sort-select">
              <span>Sortare:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Relevanță</option>
                <option value="price_asc">Preț crescător</option>
                <option value="price_desc">Preț descrescător</option>
                <option value="name">Nume A–Z</option>
              </select>
            </label>
          </div>
          <div className="catalog-heading">
            <div>
              <h2>{activeCategory}</h2>
              <p>
                {loading
                  ? "Se încarcă..."
                  : `${displayed.length} produse disponibile în catalog`}
              </p>
            </div>
            {activeCategory !== "Toate piesele" && (
              <button
                className="clear-filter"
                onClick={() => changeCategory("Toate piesele")}
              >
                Resetează filtrul <X size={15} />
              </button>
            )}
          </div>
          {!supabase ? (
            <Notice />
          ) : loading ? (
            <div className="status-panel">Se încarcă produsele...</div>
          ) : error ? (
            <div className="status-panel status-error">
              Nu am putut încărca produsele: {error}{" "}
              <button
                onClick={() => {
                  setLoading(true);
                  setRefresh((n) => n + 1);
                }}
              >
                Reîncearcă
              </button>
            </div>
          ) : displayed.length === 0 ? (
            <div className="status-panel">
              Nu am găsit produse pentru această căutare.{" "}
              <Link
                to="/products"
                onClick={() => {
                  setQuery("");
                  changeCategory("Toate piesele");
                }}
              >
                Vezi toate piesele
              </Link>
            </div>
          ) : (
            <div className="catalog-grid">
              {displayed.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
          <p className="catalog-disclaimer">
            * Prețurile și stocurile sunt demonstrative. Verifică
            compatibilitatea pieselor înainte de orice achiziție reală.
          </p>
        </section>
      </div>
    </div>
  );
}
