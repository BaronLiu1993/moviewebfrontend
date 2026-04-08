# MovieWeb

A drama and movie discovery app. Browse a personalized feed, rate titles, write reviews, and organize watchlists.

## Features

- **Personalized Feed** — infinite-scrolling feed of recommended films and dramas, powered by similarity scoring
- **Star Ratings & Reviews** — interactive 5-star rating with animated hover states and free-text reviews
- **Watchlists** — create and browse named lists with a Notion-style banner layout
- **Bookmarking** — save titles directly from the feed

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** Tailwind CSS 4, shadcn/ui, Radix UI, Lucide icons
- **Backend:** Proxied through Next.js API routes to a Go/Node backend on `localhost:8000`
- **Auth:** Supabase JWT tokens

## Project Structure

```
app/
  api/             # Next.js API routes (proxy to backend)
    feed/          # GET /api/feed — paginated feed
    rate/ratings/  # POST /api/rate/ratings — submit rating
    list/[listId]/ # GET /api/list/:id — watchlist items
  custom/home/     # Client components
    feed/          # Infinite scroll feed
    cards/         # Feed card with bookmark toggle
    rating/        # Star rating dialog
    watchlist/     # Watchlist with banner
    search/        # Search bar
  home/            # Home page (server component)
components/ui/     # shadcn/ui primitives
```

## Getting Started

```bash
npm install
npm run dev
```

Requires the backend API running on `http://localhost:8000`.
