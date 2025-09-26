CapstoneProject – Frontend & Backend (Local Run Guide)

This README explains how to run the Python backend and React frontend
for CapstoneProject locally on Windows or macOS.

------------------------------------------------------------------------

🧱 Tech Stack

-   Backend: Python (Flask/FastAPI) – files: app.py, models.py,
    mock_data.py, grants.db, requirements.txt
-   Frontend: React (Node.js) – folders: src/, public/, files:
    package.json, package-lock.json

  If your framework differs, the commands below still work for a typical
  Flask/FastAPI + React setup.

------------------------------------------------------------------------

📁 Repository Structure

    CapstoneProject/
    ├── backend/
    │   ├── app.py
    │   ├── models.py
    │   ├── mock_data.py
    │   ├── grants.db
    │   └── requirements.txt
    └── frontend/
        ├── package.json
        ├── package-lock.json
        ├── src/
        └── public/

------------------------------------------------------------------------

✅ Prerequisites

-   Python 3.10+ → check: python --version
-   Node.js LTS + npm → check: node -v and npm -v
-   Git (optional)

------------------------------------------------------------------------

1) 🚀 Start the Backend (Python)

Open a terminal inside backend/ and run:

Windows (PowerShell)

    # from CapstoneProjectackend
    python -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt

    # If your app runs directly with app.py (common for Flask/FastAPI)
    python app.py

macOS/Linux

    # from CapstoneProject/backend
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt

    # If your app runs directly with app.py (common for Flask/FastAPI)
    python app.py

Default backend URL: http://localhost:5000 (Flask) or
http://localhost:8000 (FastAPI/uvicorn).
If your app.py uses uvicorn, start it with:

    uvicorn app:app --reload --port 8000

  Tip: If you need to load example data, run python mock_data.py (if
  that script seeds the DB).

------------------------------------------------------------------------

2) 💻 Start the Frontend (React)

Open another terminal inside frontend/ and run:

    npm install
    npm start

This usually opens the app on http://localhost:3000.

------------------------------------------------------------------------

3) 🔗 Connect Frontend → Backend

The frontend needs to know your backend URL. Use one of the methods
below, depending on your setup:

A) Create React App (CRA)

Create a file frontend/.env:

    REACT_APP_API_URL=http://localhost:5000

Use it in code as: process.env.REACT_APP_API_URL

B) Vite

Create frontend/.env:

    VITE_API_URL=http://localhost:5000

Use it in code as: import.meta.env.VITE_API_URL

  If you run FastAPI/uvicorn on port 8000, swap 5000 with 8000 in the
  URL above.

Optional: CRA Proxy (for /api requests)

Add this to frontend/package.json if your API paths start with /api:

    "proxy": "http://localhost:5000"

Then you can call /api/... without hardcoding a full URL.

------------------------------------------------------------------------

4) 🗃️ Database Notes

-   Your repo contains backend/grants.db (SQLite). The backend should
    connect to this file automatically.

-   If you need to re-seed sample data, check and run:

        python mock_data.py

------------------------------------------------------------------------

5) 🧪 Quick Test Checklist

-   Backend terminal shows: “Running on http://127.0.0.1:5000” (or 8000)
-   Hitting http://localhost:5000/health or
    http://localhost:5000/api/... (whatever you implemented) returns
    JSON
-   Frontend at http://localhost:3000 loads and can fetch data from the
    backend

------------------------------------------------------------------------

6) 🛠️ Troubleshooting

-   Port already in use
    Change the port or stop the other process. Example (Flask):

        set FLASK_RUN_PORT=5001  # Windows PowerShell
        export FLASK_RUN_PORT=5001  # macOS/Linux

-   CORS error in browser
    Install/enable CORS in backend (Flask example):

        pip install flask-cors

    In app.py:

        from flask_cors import CORS
        CORS(app)

-   ModuleNotFoundError
    Make sure your virtual environment is activated and you ran
    pip install -r requirements.txt.

-   React not picking up env file
    Restart npm start after creating or changing .env.

------------------------------------------------------------------------

7) 📦 Build for Submission/Production (Optional)

Frontend build:

    cd frontend
    npm run build

Outputs static files to frontend/build/ (CRA) or frontend/dist/ (Vite).

Backend (still local): Use python app.py or a production server like
gunicorn/uvicorn.

------------------------------------------------------------------------

8) 📚 API Endpoints (Document yours here)

-   GET /api/... – description
-   POST /api/... – description
-   Example response …

------------------------------------------------------------------------

9) 📝 Submission Checklist

-   ☐ frontend/: keep src/, public/, package.json, package-lock.json;
    exclude node_modules/
-   ☐ backend/: keep Python files, grants.db, requirements.txt; exclude
    .venv/ and __pycache__/
-   ☐ Add this README.md
-   ☐ Optional: add LICENSE and screenshots

------------------------------------------------------------------------

👤 Maintainers

-   Capstone team – add names/emails here.
