# khk-expansion-dashboards

This project contains a React frontend powered by Vite and a minimal FastAPI backend.

## Backend

The backend lives in the `backend/` directory. It uses FastAPI and SQLAlchemy to connect to a Postgres database. A sample configuration for Neon is provided.

### Setup

1. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Copy `.env.sample` to `.env` and update the `DATABASE_URL` with your Neon connection string.
3. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

The backend exposes a simple `/health` endpoint for testing connectivity.

## Frontend

Install Node dependencies and launch the Vite dev server:

```bash
npm install
npm run dev
```
