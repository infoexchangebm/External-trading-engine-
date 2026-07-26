# External Trading Engine

Production-grade automated trading engine built with FastAPI.

## Features
- REST API endpoints
- Scheduled macroeconomic & earnings data ingestion
- Order book imbalance analysis
- Modular multi-signal strategy engine
- TradingView webhook integration
- Comprehensive logging & error handling
- Extensible architecture

## GitHub Repository
https://github.com/infoexchangebm/External-trading-engine-

## Quick Start (VPS)

```bash
git clone https://github.com/infoexchangebm/External-trading-engine.git
cd external-trading-engine
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your keys
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints
- `POST /webhook/tradingview` — Receive TV alerts
- `POST /signal/send` — Manually trigger signal
- `GET /health` — Health check

Full deployment & security instructions in the repo.
