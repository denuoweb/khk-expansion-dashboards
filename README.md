# khk-expansion-dashboards

This project contains a React frontend powered by Vite and a minimal FastAPI backend.

## Backend

The backend lives in the `backend/` directory. It uses FastAPI and SQLAlchemy to connect to a Postgres database. A sample configuration for Neon is provided.
Neon's connection string requires TLS, so make sure `sslmode=require` is included in `DATABASE_URL`.

### Setup

1. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Copy `.env.sample` to `.env` and set `DATABASE_URL` and `SECRET_KEY`.
3. Initialize the database:
   ```bash
   python -m app.create_db
   ```
4. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```
The backend now provides authentication, user management, and task endpoints alongside a `/health` check.

## Frontend

Install Node dependencies and launch the Vite dev server:

```bash
npm install
npm run dev
```
