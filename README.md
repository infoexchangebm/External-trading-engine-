# Algo Signal Engine

A production-grade, full-stack automated trading engine dashboard. It monitors multi-signal trade decisions (macro, orderbook, earnings, technical), stores signal history, and sends alerts to TradingView via webhook.

## Architecture & Stack

This project is structured as a pnpm monorepo.

- **Monorepo**: pnpm workspaces, Node.js 24, TypeScript 5.9
- **Backend API (`artifacts/api-server`)**: Express 5
- **Frontend Dashboard (`artifacts/trading-engine`)**: React + Vite + Wouter + TanStack Query + Recharts
- **Database (`lib/db`)**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Mobile App (`artifacts/signal-mobile`)**: React Native (Expo)

## Features

- **Dashboard**: Live summary cards (total/BUY/SELL counts, avg confidence), recent signal feed, macro climate panel, orderbook imbalance bars.
- **Signals**: Full history table with symbol/type filters, manual signal generation with optional TradingView send.
- **Market Data**: Orderbook imbalance per symbol, macro (Fed/inflation/VIX/CPI/GDP), earnings calendar.
- **Strategy Engine**: Scores signals from four components (macro, orderbook, earnings, technical) with configurable weights stored in the DB.
  - **Technical Fetcher**: Fetches live candles from Binance (Crypto) and Yahoo Finance (Equities, Forex, Commodities) to calculate RSI, MACD, EMA, ATR.
- **TradingView Integration**: Bidirectional webhook integration.
- **Webhooks**: Inbound/outbound event log, manual signal sender, webhook URL instructions.

## Quick Start (Development)

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Variables:**
   Ensure you have a `.env` file with the following:
   - `DATABASE_URL` (Required) — Postgres connection string
   - `FRED_API_KEY`, `ALPHAVANTAGE_API_KEY`, `FINNHUB_API_KEY` (Optional) — Enrich macro/earnings data

3. **Run the API server:**
   ```bash
   pnpm --filter @workspace/api-server run dev
   ```

4. **Run the React dashboard:**
   ```bash
   pnpm --filter @workspace/trading-engine run dev
   ```

## Development Commands

- `pnpm run typecheck` — Full typecheck across all packages.
- `pnpm run build` — Typecheck + build all packages.
- `pnpm --filter @workspace/api-spec run codegen` — Regenerate API hooks and Zod schemas from the OpenAPI spec.
- `pnpm --filter @workspace/db run push` — Push DB schema changes (dev only).

## Notes & Gotchas

- **Binance API**: May return HTTP 451 from Replit environments (geo-blocked). Orderbook fetcher falls back to NEUTRAL with 0% imbalance in such cases.
- **Macro vs. Fed Signals**: `macroSignal` on a Signal row is the engine's interpretation (`BULLISH|BEARISH|NEUTRAL`). `fedSignal` on MacroData is the raw Fed stance (`DOVISH|HAWKISH|NEUTRAL`). Do not conflate them.
- **Engine Config**: Config is a single-row table (id=1). `ensureConfig()` creates the default row on first access.
- **Legacy Python Code**: The `app/` and `main.py` files are legacy Python implementations and are superseded by the TypeScript/Node.js stack.
