# Investment Dashboard

A personal investment dashboard with FastAPI backend and React frontend.

## Default Admin Login

**Username**: `dev`  
**Password**: `dev`

## Quick Start

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install email-validator bcrypt==3.2.0
uvicorn app.main:app --reload
```

Backend will run on: http://localhost:8000

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: http://localhost:5173

## Features

- **Authentication**: JWT-based user authentication
- **Portfolio Management**: View and manage investment holdings (auto-loaded from PDF)
- **PDF Data Source**: Portfolio automatically loaded from Fidelity statement PDF in resources
- **Market Data**: Real-time stock quotes (mocked/API-based)
- **Recommendations**: AI-driven investment suggestions

## Tech Stack

**Backend**:
- FastAPI
- SQLAlchemy (SQLite)
- Pydantic
- JWT Authentication

**Frontend**:
- React + TypeScript
- Material-UI
- React Query
- React Router
- Recharts

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
