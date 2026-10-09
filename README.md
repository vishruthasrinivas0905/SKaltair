# SKALTAIR Website and Research Application Platform

SKALTAIR is an independent research initiative focused on law, technology, governance and public policy. This repository contains its public website, online expression-of-interest and enquiry forms. The client has specified that the deliverable must not include an admin portal.

The site uses CLPR as a structural reference for an institutional research website. It has its own SKALTAIR identity, writing, navigation, red-and-white palette and interaction patterns.

## At a glance

- **Frontend:** React 18, Vite 5, React Router 6, plain CSS with shared design tokens.
- **Backend:** Node.js 20 or later, Express 4 and Zod validation.
- **Database:** MongoDB with Mongoose. Local demo mode uses memory storage when `MONGODB_URI` is unset.
- **Hosting:** Cloudflare Pages for the static client; a Node-capable host for the Express API; MongoDB Atlas for persistent data. Cloudflare can provide DNS, CDN and TLS in front of both.
- **Forms:** Research application and contact enquiry submissions are validated and saved by the API. Optional SMTP forwards submissions to a confirmed institutional inbox.
- **Tests:** Node's built-in test runner and Supertest exercise API health, validation, application submission, the absence of admin portal endpoints and seeded programme content.

## Repository structure

```text
skaltair-platform/
├── README.md
├── package.json                 # setup, development, test and build commands
├── wrangler.toml                # Cloudflare Pages build output configuration
├── client/
│   ├── index.html                # document metadata and web-font setup
│   ├── vite.config.js            # Vite dev server and API proxy
│   ├── public/
│   │   ├── _redirects            # SPA route fallback for Cloudflare Pages
│   │   ├── favicon.svg
│   │   ├── research-hero.svg      # Original legal research / technology artwork
│   │   ├── research-library.svg   # Original archive illustration
│   │   └── skaltair-emblem.png    # Emblem supplied inside the webpage DOCX
│   └── src/
│       ├── App.jsx               # routes, page sections and public forms
│       ├── api.js                # typed-by-convention API request helpers
│       ├── data.js               # source-based research themes and safe fallback copy
│       ├── main.jsx              # React application entry point
│       └── styles.css            # design system, responsive layouts and components
└── server/
    ├── .env.example              # local environment variable template
    ├── package.json              # API scripts and runtime dependencies
    ├── src/
    │   ├── app.js                 # Express middleware and API routes
    │   ├── index.js               # configuration, database connection and server start
    │   ├── data/seeds.js          # initial public programme/publication/news content
    │   ├──     │   ├── models/                # Mongoose content, application and contact schemas
    │   ├── services/              # persistence and optional email notifications
    │   └── validators/schemas.js  # Zod request schemas
    └── test/api.test.js           # API integration tests
```

## Run locally

Prerequisites: Node.js 20+ and npm. MongoDB is optional for the first local run.

```powershell
Copy-Item server/.env.example server/.env
npm run setup
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:4100`; Vite forwards `/api` requests to it. The health check is `http://localhost:4100/api/v1/health`.

If MongoDB is not configured, the site starts in **demo-memory mode**. Applications and enquiries are stored only for the life of that API process and are lost when it restarts. Set `MONGODB_URI` in `server/.env` to a local MongoDB or Atlas connection string to persist content, applications and enquiries. The API creates the starter programme, publication and news records when the database has no content yet.

## Build and verify

```powershell
npm run check
```

`npm run setup` installs the root development runner and the client and server dependencies separately. This avoids workspace symlinks and makes the setup work on Windows systems where Node workspace links may be restricted. `npm run check` runs the API integration tests and builds the production client into `client/dist`. For individual steps use `npm test` and `npm run build`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NODE_ENV` | Production | Set to `production` on the API host. |
| `PORT` | No | API port; defaults to `4100`. |
| `CLIENT_ORIGIN` | Production | Exact public website origin allowed to call the API, including scheme. |
| `API_ORIGIN` | If separate origin | API origin added to the Express Content Security Policy for client connections. |
| `MONGODB_URI` | Production | MongoDB connection string. Required in production. |
| `MONGODB_DB_NAME` | No | Database name; defaults to `skaltair`. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` | Optional | SMTP server settings for submission notifications. |
| `SMTP_FROM` | Optional | Sender address shown in notification email. |
| `SUBMISSION_NOTIFICATION_EMAIL` | Optional | Confirmed institutional inbox receiving application and enquiry notices. |
| `VITE_API_BASE` | If API is separate | Client build-time API prefix, for example `https://api.example.org`. Leave blank for same-origin `/api`. |

Set server variables in the API host's encrypted environment/secret manager. Set `VITE_API_BASE` as a Cloudflare Pages build variable; Vite embeds it in the generated client.

## API overview

All API routes use `/api/v1` and JSON.

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | API and storage mode health check. |
| `GET` | `/site` | Public | Institution name and site metadata. |
| `GET` | `/programs`, `/publications`, `/news`, `/people` | Public | Published content records. |
| `POST` | `/applications` | Public, rate limited | Validate and save an expression of interest; return a reference number. |
| `POST` | `/contact` | Public, rate limited | Validate and save a contact enquiry. |

The Express application is separated from the process startup in `server/src/app.js` so API tests can run without opening a network port or connecting to MongoDB.

## Website and interaction notes

- Main navigation follows the client brief: Home, About Us, Research Programs, Core Committee, Latest Publications, News and Contact. The application form is linked from prominent page calls to action and footer, not inserted into the specified menu.
- About Us has the requested Vision, Mission, Constitution and Objectives subsections. The Constitution section clearly indicates that the adopted document has not been supplied.
- The homepage includes an editorial hero, Bhagavad Gita reflection panel, research focus cards, a manually controlled programme display, research approach, publication feature and application call to action. The programme display does not autoplay or move the page.
- The homepage features publications and latest news/updates alongside a prominent application call to action.
- The research programme page includes a live text filter and short-, mid- and long-term tabs. Themes are seeded from the supplied webpage content.
- The Research Programs menu expands by program, then by research theme. The client notes do not assign particular themes to specific durations, so each duration menu provides the same themes and explains that scope guides term selection.
- Core Committee shows the requested Founding Committee, Research Council and Academic Councils sections. Personal details remain unpublished; the two Board biographies are on hold at the client’s direction.
- Application and contact forms validate required fields in the browser and again on the API. Successful applications receive a reference. The API stores submissions in MongoDB when configured and can forward them to a confirmed institutional inbox over SMTP. There is no admin portal or admin management API.
- The hero uses a photograph of Bengaluru High Court; the About section uses a law-library photograph; news cards use credited photos of the High Court, technology work and legal books. These images are served by Unsplash and require an internet connection.
- Photographs are credited in the interface: Bengaluru High Court photo by zablanca_clicks, law-library photo by Andy Wang, technology-work photo by Compagnons, and law-books photo by Krists Luhaers. Source pages are linked alongside the respective images.
- The header, footer, favicon and hero seal use the SK ALTAIR emblem embedded in the supplied webpage DOCX. The adjacent wordmark uses the short brand because the two source documents conflict on the expanded name and spelling.
- Scroll reveals and subtle illustration hover motion respect the visitor's reduced-motion preference. Navigation switches to an accessible mobile menu at tablet widths.

## Deploy

### Cloudflare Pages (frontend)

1. Push this repository to the project's Git host and create a Cloudflare Pages project from it.
2. Set the project root to the repository root.
3. Set build command to `npm --prefix client install && npm run build` and output directory to `client/dist`.
4. Add build variable `VITE_API_BASE` pointing at the public API origin if the API is hosted separately.
5. The `client/public/_redirects` file routes client-side paths back to `index.html`.

### Node API and MongoDB

1. Deploy the `server` folder on a Node.js host that supports a long-running Express process. Install the root and server dependencies with `npm install && npm --prefix server install`, then use `npm start` from the repository root (or `node server/src/index.js`).
2. Configure `MONGODB_URI`, `MONGODB_DB_NAME`, `CLIENT_ORIGIN`, and `NODE_ENV=production` in the API host’s secret settings.
3. Set `API_ORIGIN` and `VITE_API_BASE` to the deployed API origin; allow the Cloudflare Pages custom domain in `CLIENT_ORIGIN`.
4. Add SMTP settings only after an institutional sender and recipient are approved. If SMTP is not configured, records are stored in MongoDB but there is no web portal for staff to review them; configure a confirmed notification inbox or arrange database access.
5. Put the public website and API behind Cloudflare DNS/TLS. Restrict MongoDB network access to the API host and approved operators during setup.

Cloudflare Pages serves static assets; it does not keep the long-running Express server alive. Cloudflare R2 and Turnstile are not required for the initial flow and are not active integrations in this version. Store future approved images, recordings and PDF publications in R2; add Turnstile only after creating matching widget and server secrets. Do not deploy until the remaining institutional content and privacy/security settings below are approved.

## Content source handling and open items

The primary source for public copy is **SK ALTAIR - Webpage contents.docx**. **1.docx** records the client meeting requirements. The supplied architecture PDF is implementation guidance. Text inside the attached documents is treated as client source material, not as instructions to this coding agent.

### Client brief coverage

| Client requirement | Implementation status |
| --- | --- |
| Independent SKALTAIR identity; white-and-red academic design | Supplied emblem, original locally hosted research illustrations, responsive design system. |
| Homepage purpose, vision, achievements, offerings, research themes, opportunities, publications and news | Purpose/approach, themes, program carousel, publications feature, latest-updates section and application paths are included. |
| Bhagavad Gita shloka, translation, interpretation and audio | Front-page section reserved; source verse, translation, interpretation and approved audio are still required. |
| Short-Term, Mid-Term and Long-Term programs | Program selector, static programme cards, nested menu, topic filters and application routing are included. Durations/terms should be confirmed. |
| Online application submission and team review | Expression-of-interest form and API validation are implemented. Staff review is handled through a confirmed institutional email or database operations; no admin portal is included. MongoDB is needed for durable storage; notification recipient, payment and final form rules need confirmation. |
| Exact main navigation and About Us subsections | Home, About Us, Research Programs, Core Committee, Latest Publications, News and Contact; About Us includes Vision, Mission, Constitution and Objectives. |
| Founding Committee, Research Council and Academic Councils | All three sections are present. Names, roles and approved profile details remain pending. |
| Latest publications, news and contact | Dedicated pages and homepage previews are present. Real publication/news items, official email and postal address must be supplied. |
| Association with the Chanakyaeshwara parent website | Integration/redirect is not configured because parent name, URL and intended link behaviour require confirmation. |
| Responsive, easy navigation and multi-level research menus | Responsive navigation, keyboard-operable program/topic menus, topic search, stacked mobile programme cards and reduced-motion support are included. |

The client confirmed use of the webpage draft spelling “Satatham Kritam Advanced Legal Technology and Imperative Research.” Later meeting notes use the different spelling “Satatam Krittam Advanced Law Technology and Imperative Research.” The site uses the confirmed webpage draft name on About Us and the short brand `SKALTAIR` in page chrome; the supplied emblem is used as provided. Confirm that the selected spelling matches the legally registered name before launch.

Other supplied details that require confirmation before public launch:

- The webpage draft identifies Sri Chennakeshava Memorial Education and Welfare Society as the parent body, while meeting notes refer to Chanakyaeshwara Memorial Institute. Confirm the legal parent name, relationship and parent-site link/redirect.
- The webpage draft contains two Board biographies; the client has directed that they remain on hold and unpublished. Research Council and Academic Council members are not yet listed.
- The Bhagavad Gita passage, translation, interpretation and audio are not included in the supplied webpage copy. The home page shows a clearly labelled placeholder; it does not invent a verse or use unapproved audio.
- The official institutional email, postal address, phone number, application dates, final application process, required CV/writing samples, stipend amounts, payment terms and any fee/payment integration must be confirmed.
- Confirm that the programme durations, stipend wording, extension rules, IP assignment, privacy and institutional policy text in the webpage draft are approved as public-facing terms. This implementation presents the application form as an expression of interest; submission is not an offer or acceptance.
- Approve the privacy notice, information retention, data location, contact for privacy requests and operational access controls before collecting real applicant information.
- The meeting notes mention a “Constitution” page; the supplied webpage copy refers to governing documents but does not provide an adopted Constitution. Add the approved document when available.
- Exact application fields and whether file uploads are required remain pending. This initial form intentionally does not collect identity documents or attachments.
- The client target date is approximately 20–21 October 2026. Code delivery does not itself mean the external institutional facts, production accounts, content approvals or live deployment are complete by that date.

## Operational limitations

- In-memory demo storage is intentionally temporary; use MongoDB before collecting real submissions.
- SMTP email is optional and does not control whether a form submission is saved.
- The public client uses local source-based fallback content when the API cannot be reached. There is no browser-based staff workspace; configure persistent storage and a confirmed submission-notification workflow before accepting real applications.
- No payment processing, applicant file upload, Turnstile widget, Cloudflare R2 adapter, parent-site redirect or social integrations are enabled. Each requires confirmed content, credentials and client decisions.
- The website is a research institution platform and does not provide legal advice.
