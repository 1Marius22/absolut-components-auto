# Absolut Components — magazin online de piese auto 🚗

Proiect educațional **eCommerce Front-End** realizat cu **React + Vite + Supabase**. Site-ul este un MVP demonstrativ, nu un magazin care efectuează plăți sau livrări reale.

## Funcționalități

- Pagină principală cu categorii auto (filtre, frânare, suspensie, motor, uleiuri)
- Catalog încărcat **din Supabase**, cu căutare, filtrare și sortare
- Pagină de detalii pentru fiecare produs, cu preț, stoc și cod SKU
- Coș de cumpărături cu cantități și totaluri în RON (salvat local în browser)
- **Supabase Authentication**: înregistrare, login, logout, sesiune persistentă
- Checkout demonstrativ cu plată ramburs **simulată** (fără card bancar)
- Salvarea comenzilor în `orders` / `order_items` prin funcția sigură `place_order`
- Istoricul și detaliile comenzilor, vizibile doar utilizatorului autentificat
- Interfață adaptată la desktop și mobil; rutare cu React Router
- Protejarea datelor cu **Row Level Security (RLS)**

## Tehnologii

React, Vite, JavaScript, CSS, React Router, Supabase JS, PostgreSQL, Supabase Auth, Git / GitHub și Vercel.

## 1. Instalare locală

Ai nevoie de Node.js modern și npm.

```bash
npm install
```

Copiază `.env.example` într-un fișier `.env` la rădăcina proiectului:

```env
VITE_SUPABASE_URL=https://PROIECTUL_TAU.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=CHEIA_TA_PUBLICABILA
```

În Supabase Dashboard, găsești URL-ul și cheia publicabilă în **Project Settings → API Keys** (denumirile pot diferi ușor). Poți folosi cheia publicabilă nouă (`sb_publishable_...`) sau cheia legacy `anon`; **NU** folosi `service_role` / `secret key` în React sau Vercel.

> `.env` este ignorat de Git. Nu încărca parole, chei secrete sau date reale de clienți în repository.

## 2. Creează baza de date Supabase

1. Deschide [Supabase Dashboard](https://supabase.com/dashboard) și creează un proiect nou.
2. Mergi la **SQL Editor → New query**.
3. Copiază conținutul fișierului **[`supabase/schema.sql`](supabase/schema.sql)** și rulează-l o singură dată (`Run`). Scriptul este conceput pentru un proiect nou, gol.
4. În **Table Editor** verifică tabelele `products` (12 produse demo), `orders`, `order_items`.
5. În **Authentication → Providers → Email** verifică opțiunea de confirmare a adresei de e-mail. Dacă este activă, utilizatorul trebuie să confirme e-mailul înainte de login.
6. În **Authentication → URL Configuration** configurează Site URL și Redirect URLs pentru adresa locală (`http://localhost:5173`) și domeniul tău Vercel (`https://numele-tau.vercel.app`). Dacă ai mai multe adrese de preview, adaugă-le explicit acolo.

**Important:** Produsele sunt rânduri reale în Supabase. Scriptul conține **prețuri și stocuri demonstrative**, nu oferte comerciale reale. Toate imaginile auto sunt în `public/images`.

### Securitate

- `products` — publicul poate citi doar produse active; niciun client nu poate edita stocul sau prețul.
- `orders` și `order_items` — numai utilizatorul autentificat poate **citi propriile** înregistrări.
- Comenzile pot fi create doar prin funcția `place_order` (RPC), care verifică utilizatorul, cantitățile, prețurile și stocul pe server; stocul este scăzut atomic.
- Nu există flux de plăți reale și nu se colectează date de card.
- Folosește **date fictive** în formularul de comandă în scop demonstrativ.

## 3. Pornire

```bash
npm run dev
```

Deschide adresa afișată de Vite, de obicei [http://localhost:5173](http://localhost:5173).

Verifică buildul:

```bash
npm run build
```

## 4. Publicare pe GitHub și Vercel

În folderul proiectului:

```bash
git init
git add .
git commit -m "Absolut Components auto eCommerce with Supabase"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Dacă repository-ul este deja creat și conectat, **nu repeta** `git init` sau `git remote add`; folosește `git add .`, `git commit ...`, `git push`.

Pe [Vercel](https://vercel.com): **Add New → Project → Import Git Repository**. Pentru Vite folosește `npm run build` și directorul `dist`. În **Project Settings → Environment Variables**, adaugă exact cele două chei `VITE_SUPABASE_URL` și `VITE_SUPABASE_PUBLISHABLE_KEY`, apoi redeploy.

`vercel.json` este deja configurat pentru navigarea directă pe rute ca `/products/ID` și `/orders/ID` fără 404.

## 5. Teste manuale după conectare

- [ ] În catalog apar cele 12 produse din tabelul Supabase.
- [ ] Căutarea, categoriile și sortarea funcționează.
- [ ] Detaliile produselor și imaginile se deschid.
- [ ] Coșul permite adăugarea, schimbarea cantității și ștergerea.
- [ ] Register funcționează, iar confirmarea e-mailului se face conform setărilor Supabase.
- [ ] Login și Logout funcționează.
- [ ] Checkout redirecționează la Login dacă utilizatorul nu este conectat.
- [ ] Cu un cont autentificat, comanda demo apare în `orders` și `order_items` în Supabase.
- [ ] Totalul este calculat de server, iar stocul scade după comandă.
- [ ] Un al doilea cont nu poate vedea comenzile primului.
- [ ] Nu există erori în consola browserului la funcționalitățile testate.
- [ ] Rutele directe funcționează și după publicarea pe Vercel.

## Structură

```text
public/images/         Fotografii cu piese auto (din proiectul original)
src/components/       Header, Footer, Cart, ProductCard, ProtectedRoute
src/context/          AuthContext (Supabase) și CartContext
src/lib/              Client Supabase, formatare preț/data
src/pages/            Home, Shop, ProductDetails, Login, Register,
                      Checkout, Orders, OrderDetails, AboutUs
src/styles.css        Design responsive
supabase/schema.sql   Tabele, date inițiale, RLS și funcție de comandă
vercel.json           Fallback SPA pentru React Router
.env.example          Model pentru variabilele de mediu
```

## Notă despre proiect

Acest proiect a fost adaptat dintr-o temă eCommerce de curs. Datele din API-ul educațional folosit inițial și imaginile vestimentare au fost eliminate. Autentificarea și comenzile sunt concepute pentru Supabase, iar catalogul se bazează pe datele din PostgreSQL. Conexiunea devine funcțională după ce proprietarul proiectului creează baza de date și introduce variabilele `.env`.
