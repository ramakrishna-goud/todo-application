# Todo Manager

React frontend + Python FastAPI backend sample application.

## Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API: http://localhost:8000  
Swagger: http://localhost:8000/docs

## Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Technology

- React
- Vite
- Python
- FastAPI
- REST API
- CORS

> This learning version stores data in memory, so data resets when the backend restarts.
