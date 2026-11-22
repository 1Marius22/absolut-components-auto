import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">EROARE 404</p>
      <h1>Pagina nu a fost găsită.</h1>
      <p>Linkul accesat nu există sau a fost modificat.</p>
      <Link to="/" className="btn btn-primary">
        Înapoi acasă
      </Link>
    </div>
  );
}
