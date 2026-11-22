import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  UsersRound,
} from "lucide-react";

// Informații de prezentare preluate din varianta inițială a proiectului.
const teamMembers = [
  {
    id: 1,
    name: "Marius",
    role: "Founder & Store Manager",
    email: "marius@absolutcomponents.ro",
  },
  {
    id: 2,
    name: "Stefan",
    role: "Technical Support",
    email: "stefan@absolutcomponents.ro",
  },
  {
    id: 3,
    name: "Ana",
    role: "Customer Support",
    email: "ana@absolutcomponents.ro",
  },
];

export default function AboutUs() {
  return (
    <div className="about-page">
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow">ABSOLUT COMPONENTS · CINE SUNTEM</p>
          <h1>
            Despre noi<span className="title-dot">.</span>
          </h1>
          <p>
            Piese, componente și produse pentru pasionații auto. Descoperă
            povestea magazinului nostru demonstrativ și oamenii din spatele
            proiectului.
          </p>
        </div>
      </section>

      <div className="container about-body">
        <section className="about-intro" aria-labelledby="about-story-title">
          <div>
            <p className="eyebrow">POVESTEA NOASTRĂ</p>
            <h2 id="about-story-title">Produse potrivite pentru mașina ta.</h2>
          </div>
          <div>
            <p>
              Absolut Components este un magazin demonstrativ dedicat pieselor
              și componentelor auto. Scopul nostru este să oferim o selecție
              clară de produse, informații ușor de înțeles și o experiență
              simplă de cumpărare online.
            </p>
            <p>
              În catalog găsești filtre, piese pentru frânare și suspensie,
              consumabile și alte componente auto. Punem accent pe navigare
              intuitivă și pe identificarea cât mai ușoară a pieselor potrivite.
            </p>
          </div>
        </section>

        <section
          className="about-contact-section"
          aria-labelledby="about-contact-title"
        >
          <div className="about-section-heading">
            <p className="eyebrow">INFORMAȚII UTILE</p>
            <h2 id="about-contact-title">Contact și program</h2>
            <p>
              Detaliile de mai jos sunt preluate din versiunea inițială a
              proiectului și au rol ilustrativ.
            </p>
          </div>
          <div className="about-contact-grid">
            <article className="about-contact-card">
              <span className="about-info-icon">
                <Mail size={22} aria-hidden="true" />
              </span>
              <h3>Contact</h3>
              <a href="mailto:contact@absolutcomponents.ro">
                contact@absolutcomponents.ro
              </a>
              <a href="tel:+40700123456">
                <Phone size={14} aria-hidden="true" /> +40 700 123 456
              </a>
            </article>
            <article className="about-contact-card">
              <span className="about-info-icon">
                <Clock3 size={22} aria-hidden="true" />
              </span>
              <h3>Program</h3>
              <p>Luni – Vineri</p>
              <p>09:00 – 18:00</p>
            </article>
            <article className="about-contact-card">
              <span className="about-info-icon">
                <MapPin size={22} aria-hidden="true" />
              </span>
              <h3>Locație</h3>
              <p>București, România</p>
              <p>Arie prezentată: nivel național</p>
            </article>
          </div>
        </section>

        <section
          className="about-team-section"
          aria-labelledby="about-team-title"
        >
          <div className="about-section-heading">
            <p className="eyebrow">ECHIPA NOASTRĂ</p>
            <h2 id="about-team-title">Cunoaște echipa</h2>
            <p>
              O echipă pasionată de componente auto și tehnologie, prezentată în
              proiectul inițial.
            </p>
          </div>
          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <article className="about-member-card" key={member.id}>
                <div className="about-member-avatar" aria-hidden="true">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <h3>{member.name}</h3>
                <p className="about-member-role">{member.role}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="about-member-email"
                >
                  <Mail size={15} aria-hidden="true" /> {member.email}
                </a>
              </article>
            ))}
          </div>
          <p className="about-demo-note">
            <UsersRound size={17} aria-hidden="true" /> Contactele și rolurile
            de mai sus sunt ilustrative
          </p>
        </section>

        <div className="about-cta">
          <h2>Ai nevoie de o piesă pentru mașină?</h2>
          <p>
            Descoperă selecția noastră demonstrativă de piese și consumabile
            auto.
          </p>
          <Link to="/products" className="btn btn-primary">
            Explorează catalogul <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
