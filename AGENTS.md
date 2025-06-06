# AGENTS.md - Repository Guide

This document defines how Codex agents should interact with the **khk-expansion-dashboards** repository. The scope of these instructions is the entire repository. New guidelines can be added here if the project evolves.

## Repository overview

- `backend/` contains a FastAPI application. It exposes REST endpoints that the React frontend consumes.
- `src/` houses the React components, hooks and utilities. Styling is primarily handled through Tailwind CSS.
- The project uses TypeScript for the frontend and plain Python for the backend.

## Development recommendations

1. For **frontend work**:
   - Install dependencies using `npm install` if not already done.
   - Run the development server with `npm run dev` to start Vite on port 5173. The server proxies API requests to the backend.
   - Check code quality with `npm run lint`. The repo uses ESLint with TypeScript support. Fix issues reported by the linter before committing.
2. For **backend work**:
   - Create a virtual environment and install Python requirements from `backend/requirements.txt`.
   - Copy `.env.sample` to `.env` and set `DATABASE_URL` and `SECRET_KEY`.
   - Initialize the database via `python -m app.create_db` from within the `backend/` folder.
   - Use `uvicorn app.main:app --reload --port 8000` to start the API in autoreload mode during development.

## Pull request instructions

- Keep commit messages descriptive. Summaries should be concise, followed by an empty line and a more detailed body if necessary.
- When modifying TypeScript or React files, ensure the project builds by running `npm run build` before submitting a pull request.
- Run `npm run lint` and address any warnings or errors. The lint check should pass before committing.
- For Python changes, format code with `black` (if available) and include docstrings for any new functions or modules.

## Additional notes

- The agent should search for nested `AGENTS.md` files in subdirectories whenever a task involves files in those folders. Instructions inside nested files take precedence over this root-level guide.
- If programmatic checks fail because dependencies are missing, mention that setup may be required and note the failure in the pull request summary.
- Keep this document up to date when repository conventions change.

