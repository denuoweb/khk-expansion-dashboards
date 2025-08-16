# khk-expansion-dashboards

This project contains a React frontend powered by Vite and a minimal FastAPI backend.

## Development

The application is split into two parts: a FastAPI backend and a React
frontend.  During development you normally run them separately.

### Backend

1. **Install Python dependencies**
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Environment variables** – copy the provided example and fill in the
   database connection and secret:
   ```bash
   cp .env.sample .env
   # edit .env and set DATABASE_URL and SECRET_KEY
   ```
3. **Configure the chair account** – add a password to `.env`:
   ```bash
   echo "CHAIR_PASSWORD=my-secret" >> .env
   # optionally set CHAIR_EMAIL=user@example.com
   ```
   The database tables and chair user will be created automatically on first
   launch.
4. **Run the API** in autoreload mode on port 8000:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend

1. Install the Node dependencies:
   ```bash
   npm install
   ```
2. Make sure the frontend knows where the API lives by creating a `.env` file
   at the project root if needed:
   ```bash
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```

The Vite server serves the app on <http://localhost:5173> and proxies API
requests to the backend defined in `VITE_API_URL`.

## Production

1. **Build the frontend** assets:
   ```bash
   npm run build
   ```
   The optimized static files will be generated in the `dist/` directory.
2. **Run the backend** with a production server:
   ```bash
   cd backend
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
   You can also use `gunicorn` with the `uvicorn.workers.UvicornWorker`
   class if deploying behind a process manager.
3. **Serve the frontend** – configure your web server (Nginx, Apache or any
  static host) to serve the contents of `dist/` and proxy API requests to the
  FastAPI instance.

## FastAPI implementation

The backend currently exposes several routes used by the React
application.  Authentication follows OAuth2 with bearer tokens.

### Available endpoints

* `POST /auth/login` – obtain an access token
* `POST /users/` – create a new user account
* `GET /users/me` – return the authenticated user
* `GET /tasks/` – list tasks
* `POST /tasks/` – create a task
* `GET /tasks/{id}` – retrieve a specific task
* `PUT /tasks/{id}` – update a task
* `DELETE /tasks/{id}` – delete a task
* `GET /contacts/` – list university contacts
* `POST /contacts/` – create a contact
* `PUT /contacts/{id}` – update a contact
* `DELETE /contacts/{id}` – remove a contact
* `GET /health` – simple health check
* `GET /calendar/calendars` – list available calendars
* `GET /calendar/events` – list events for a calendar
* `POST /calendar/events` – create a calendar event
* `PUT /calendar/events/{id}` – update a calendar event
* `DELETE /calendar/events/{id}` – remove a calendar event
* `POST /calendar/events/{id}/meeting-link` – generate a meeting link
* `GET /drive/files` – list files in Google Drive
* `POST /drive/files` – upload a file to Google Drive
* `DELETE /drive/files/{id}` – delete a Google Drive file
* `POST /drive/files/{id}/share` – share a Google Drive file
* `GET /drive/folders` – list root or nested folders
* `POST /drive/folders` – create a Google Drive folder
* `GET /drive/search` – search Google Drive files

### Future work

The Google Drive and Calendar routes provide mock functionality. Full support
would require integrating with Google's OAuth2 flow and persisting access
tokens as well as proxying requests to the real APIs.
