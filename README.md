# MatricBuddy

AI-powered Grade 12 study platform for discovering matric past papers, understanding questions, and practising with AI.

## Stack
- Frontend: React + Vite + React Router + Axios + pure CSS
- Backend: Node.js + Express + MongoDB + Mongoose + JWT
- AI: Google Gemini API (server-side only)
- Paper discovery: metadata-first importer/scraper architecture using Axios + Cheerio

## Important
MatricBuddy stores paper metadata and source URLs by default. Do not copy or re-host copyrighted PDFs unless the source permits it. The importer should respect robots.txt, terms of use, rate limits, and copyright.

## Run locally
1. Create MongoDB Atlas database.
2. Create a Gemini API key.
3. Copy `.env.example` files to `.env` in `server` and `.env` in `client`.
4. Install dependencies:
   - `cd server && npm install`
   - `cd ../client && npm install`
5. Start backend: `npm run dev`
6. Start frontend in another terminal: `npm run dev`

Frontend: http://localhost:5173
Backend: http://localhost:5000

## First admin
Register normally, then set `role: admin` for your account in MongoDB during development.
