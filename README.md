# 🚀🧪 Rick & Morty Explorer

A responsive Rick and Morty character explorer with search, pagination, and a detail drawer, designed with a subtle cyber aesthetic inspired by *Cyberr*.

**Demo:** add your live link here

## 🧰 Tech Stack

- Next.js (App Router)
- TypeScript
- Apollo Client
- GraphQL (Rick and Morty API)
- Tailwind CSS
- HeroUI
- next-themes

## ✨ Features

- Search characters by name with debounced input
- Paginated character list with next/previous navigation
- Detail drawer for quick access to character information
- Shareable URL state via query string (`q`, `page`, `id`)
- Cyber-inspired, minimalist visual styling
- Responsive layout for desktop and mobile

## 🖼️ Screenshots

- Homepage: `public/screenshots/homepage.png`
- Search results: `public/screenshots/search-results.png`
- Character drawer: `public/screenshots/character-drawer.png`

## ⚙️ Getting Started

### Setup

```bash
npm install
```

### Run

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Testing

- End-to-end tests with Playwright are planned but not implemented yet for this submission.

## 🧠 Assumptions

- The app consumes the public Rick and Morty GraphQL API, which is assumed to be stable and accessible without authentication.
- Client-side rendering with Apollo Client is sufficient for the scope of this assignment.
- SEO and server-side rendering are out of scope for the evaluation criteria.

## ⚖️ Tradeoffs

- Query string state enables shareable URLs and back/forward navigation but requires extra routing logic (syncing input, pagination, and selection) and more frequent URL updates.
- Client-side data fetching keeps interactions fast and avoids SSR complexity, but it does not optimize for SEO or first paint as much as SSR/SSG.

## 🔮 Possible Improvements

- Add SSR for the initial page load while keeping pagination and filtering client-side.
- Improve caching strategies, such as prefetching the next page or refining cache policies.
- Add richer empty and error states with retry actions.
- Extract icons into a shared icon system or adopt a dedicated icon library for consistency.
- Add lightweight analytics around empty results and error cases.
