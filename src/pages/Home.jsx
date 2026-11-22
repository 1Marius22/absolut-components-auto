import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Disc3,
  Filter,
  Gauge,
  Sparkles,
  Wrench,
  MoveUpRight,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    name: "Filtre",
    subtitle: "Aer, ulei, polen & combustibil",
    image: "/images/filtru-aer.jpg",
    count: "4 tipuri",
    icon: Filter,
  },
  {
    name: "Frânare",
    subtitle: "Discuri și plăcuțe de frână",
    image: "/images/discuri-frana.jpg",
    count: "2 tipuri",
    icon: Disc3,
  },
  {
    name: "Suspensie și direcție",
    subtitle: "Control și stabilitate",
    image: "/images/amortizor.jpg",
    count: "4 tipuri",
    icon: Gauge,
  },
  {
    name: "Motor și aprindere",
    subtitle: "Bujii și componente motor",
    image: "/images/bujii.jpg",
    count: "1 tip",
    icon: Wrench,
  },
];

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" /> PIESE AUTO, FĂRĂ COMPLICAȚII
            </div>
            <h1>
              Fiecare drum începe cu <em>piese potrivite.</em>
            </h1>
            <p>
              De la filtre și frâne până la suspensie și consumabile. Descoperă
              piesele de care ai nevoie, într-un magazin auto gândit simplu și
              clar.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Explorează piesele <ArrowRight size={18} />
              </Link>
              <Link to="/aboutUs" className="hero-secondary">
                Despre proiect <MoveUpRight size={17} />
              </Link>
            </div>
            <div className="hero-proof">
              <span>
                <BadgeCheck size={17} /> Produse organizate clar
              </span>
              <span>
                <ShieldCheck size={17} /> Autentificare securizată
              </span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Selecție de componente auto">
            <div className="hero-orbit" />
            <div className="hero-image-main">
              <img src="/images/discuri-frana.jpg" alt="Discuri de frână" />
            </div>
            <div className="hero-floating hero-floating-top">
              <img src="/images/filtru-ulei.jpg" alt="Filtru de ulei" />
              <div>
                <span>ÎNTREȚINERE</span>
                <strong>Filtre auto</strong>
              </div>
            </div>
            <div className="hero-floating hero-floating-bottom">
              <img src="/images/placute-frana.jpg" alt="Plăcuțe de frână" />
              <div>
                <span>SIGURANȚĂ</span>
                <strong>Sisteme de frânare</strong>
              </div>
            </div>
            <div className="hero-visual-label">
              COMPONENTE AUTO <span>—</span> CALITATE & SIGURANȚĂ
            </div>
          </div>
        </div>
      </section>

      <div className="value-strip">
        <div className="container value-strip-inner">
          <span>
            <Sparkles size={16} /> Produse atent organizate
          </span>
          <span>
            <Disc3 size={16} /> Piese pentru întreținere și reparații
          </span>
          <span>
            <ShieldCheck size={16} /> Comenzi demonstrative securizate
          </span>
        </div>
      </div>

      <section className="section container categories-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GĂSEȘTE EXACT CE CAUȚI</p>
            <h2>
              Cumpără după categorie<span className="title-dot">.</span>
            </h2>
            <p>
              Tot ce ai nevoie pentru întreținerea mașinii, într-un singur loc.
            </p>
          </div>
          <Link to="/products" className="text-link">
            Vezi toate piesele <ArrowRight size={18} />
          </Link>
        </div>
        <div className="categories-grid">
          {categories.map(({ name, subtitle, image, icon: Icon, count }) => (
            <Link
              to={`/products?category=${encodeURIComponent(name)}`}
              className="category-card"
              key={name}
            >
              <div className="category-top">
                <span className="category-icon">
                  <Icon size={19} />
                </span>
                <span className="category-count">{count}</span>
              </div>
              <div className="category-image">
                <img src={image} alt={name} />
              </div>
              <div className="category-bottom">
                <div>
                  <h3>{name}</h3>
                  <p>{subtitle}</p>
                </div>
                <span className="category-arrow">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-section container">
        <div className="feature-copy">
          <p className="eyebrow">ÎNGRIJIREA MAȘINII CONTEAZĂ</p>
          <h2>O întreținere bună se vede la fiecare kilometru.</h2>
          <p>
            De la schimbul de ulei la sistemul de frânare, componentele
            potrivite fac diferența. Explorează selecția noastră de piese auto.
          </p>
          <Link to="/products" className="btn btn-light">
            Descoperă catalogul <ArrowRight size={18} />
          </Link>
        </div>
        <div className="feature-art">
          <img src="/images/ulei-motor.jpg" alt="Ulei de motor" />
          <span>ÎNTREȚINERE • PROTECȚIE • PERFORMANȚĂ</span>
        </div>
      </section>

      <section className="section container how-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SIMPLU DE UTILIZAT</p>
            <h2>
              Comandă în trei pași<span className="title-dot">.</span>
            </h2>
          </div>
        </div>
        <div className="steps-grid">
          <article>
            <span className="step-number">01</span>
            <h3>Caută piesa</h3>
            <p>
              Folosește categoriile și filtrele pentru a găsi rapid componenta
              dorită.
            </p>
          </article>
          <article>
            <span className="step-number">02</span>
            <h3>Adaugă în coș</h3>
            <p>
              Verifică descrierea, codul și compatibilitatea, apoi alege
              cantitatea.
            </p>
          </article>
          <article>
            <span className="step-number">03</span>
            <h3>Plasează o comandă demo</h3>
            <p>
              Autentifică-te și salvează comanda demonstrativă în contul tău.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
