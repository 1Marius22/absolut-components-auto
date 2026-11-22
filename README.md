# 🚗 Absolut Components — Magazin online de piese auto

**Absolut Components** este proiectul meu eCommerce realizat în cadrul cursului de Front-End Development.

Am vrut să construiesc un magazin online de piese auto care să fie ușor de folosit și să semene cât mai mult cu un site real, nu doar cu o pagină de prezentare.

Proiectul a pornit de la o temă de magazin online cu produse vestimentare. Pe parcurs l-am transformat într-un magazin dedicat pieselor și consumabilelor auto, cu propriile categorii, imagini, pagini de produs și un flux complet de comandă demonstrativă.

## 🛒 Ce poți face pe site

- Să răsfoiești catalogul de piese auto: filtre, frâne, suspensie, componente de motor și uleiuri.
- Să cauți produse după nume, cod sau producător și să le filtrezi pe categorii.
- Să sortezi produsele după preț sau nume.
- Să deschizi pagina unui produs pentru detalii, preț și disponibilitate.
- Să adaugi produse în coș, să schimbi cantitățile sau să le elimini.
- Să îți creezi un cont, să te autentifici și să te deconectezi.
- Să plasezi o **comandă demonstrativă** și să vezi comenzile tale în istoric.
- Să citești pagina **„Despre noi”**, unde am prezentat ideea magazinului și echipa proiectului.

Coșul este păstrat local în browser, iar produsele, conturile și comenzile sunt gestionate prin **Supabase**. Am folosit și reguli de acces în baza de date, astfel încât fiecare utilizator să își poată vedea propriile comenzi.

## 🛠️ Tehnologii folosite

- **React și JavaScript** — interfața și funcționalitățile aplicației
- **Vite** — pornirea și construirea proiectului
- **React Router** — navigarea între pagini
- **CSS** — designul responsive pentru desktop și telefon
- **Supabase (PostgreSQL + Auth)** — produse, autentificare și comenzi
- **Git și GitHub** — organizarea și salvarea codului

## 💻 Cum pornești proiectul local

Ai nevoie de Node.js și npm.

1. Clonează repository-ul și deschide folderul în VS Code.
2. Instalează dependențele folosind comanda `npm install`.
3. Creează un fișier `.env` în folderul principal, după modelul `.env.example`.

   ```env
   VITE_SUPABASE_URL=https://PROIECTUL_TAU.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=CHEIA_PUBLICABILA
   ```

4. Configurează baza de date Supabase folosind scriptul din `supabase/schema.sql` într-un proiect nou și verifică tabelele `products`, `orders` și `order_items`.
5. Pornește aplicația folosind `npm run dev`.

Poți verifica și versiunea de producție cu `npm run build`.

**Important:** Fișierul `.env` nu trebuie urcat pe GitHub. În frontend se folosește doar cheia publicabilă Supabase, niciodată cheia secretă sau `service_role`.

## 📁 Cum este organizat proiectul

- `src/pages` — paginile principale: Home, Shop, Product Details, Login, Register, Checkout, Orders și Despre noi
- `src/components` — componente reutilizabile, cum ar fi Header, Footer, cardurile de produs și coșul
- `src/context` — gestionarea autentificării și a coșului
- `src/lib` — conexiunea cu Supabase și funcțiile de formatare
- `public/images` — imaginile produselor auto
- `supabase` — scriptul SQL pentru baza de date

## 📚 Ce am învățat lucrând la el

Pentru mine, una dintre cele mai interesante părți a fost momentul în care am trecut de la produse și pagini de test la date încărcate dintr-o bază de date reală.

Am înțeles mai bine cum se leagă componentele React între ele, cum se păstrează informațiile din coș și cum funcționează autentificarea.

Integrarea cu Supabase și salvarea comenzilor au fost și printre cele mai dificile etape, dar tocmai acolo am învățat cel mai mult.

Am folosit și ChatGPT ca ajutor pentru explicații, idei și depanarea erorilor, apoi am adaptat și testat modificările în proiect.

Pe viitor mi-ar plăcea să adaug mai multe produse, filtre după marca și modelul mașinii, o listă de favorite și o zonă de administrare a catalogului.

---

**Notă:** Absolut Components este un proiect educațional. Produsele, prețurile, datele de contact și comenzile au rol demonstrativ. Nu se fac plăți online sau livrări reale.
