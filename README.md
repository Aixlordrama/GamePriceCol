# Zipa Gaming Hub Price Comparator

A lightweight marketplace price comparison MVP for Colombian retailers focused on video game pricing and stock tracking.

## Structure

- `backend/` — Node.js Express API with Supabase integration
- `frontend/` — React + Vite UI for search and comparison
- `scraper/` — Playwright scraper for local retailers and historical price ingestion
- `supabase/` — SQL schema for historical pricing data

## Setup

1. Install Node.js if you do not already have it.
2. Create a Supabase project and set up the table using `supabase/schema.sql`
3. Copy `.env.example` files to `.env` in each folder and fill values
4. Install dependencies in each package:
   - `cd backend && npm install`
   - `cd frontend && npm install`
   - `cd scraper && npm install`
   - or from the root: `npm install`
5. Run the backend and frontend locally
   - `cd backend && npm run dev`
   - `cd frontend && npm run dev`
6. Use the scraper to populate prices:
   - `cd scraper && npm run scrape -- --query "elden ring"`

## Environment files

- `backend/.env.example`
- `frontend/.env.example`
- `scraper/.env.example`

## Notes

This setup stores historical price snapshots in Supabase so users can view trend data and validate buy timing.
