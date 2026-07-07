# 🚀 Diabetes Risk Predictor

This project is an end-to-end Machine Learning engineering pipeline, from model training to cloud deployment, featuring a modern web interface.

A trained ML model is served as a REST API using FastAPI, containerized with Docker, and connected to a React frontend built with Vite and Tailwind CSS.

## 📁 Project Structure

The project is divided into two main components:

- **`/backend`**: The Python FastAPI application and Machine Learning pipeline.
- **`/frontend`**: The React Single-Page Application (SPA) built with Vite and Tailwind CSS.

---

## ⚙️ Backend (Machine Learning & API)

**Tech Stack**: FastAPI, Scikit-learn, joblib, Docker, AWS EC2 / Render

### Features
- Predicts diabetes risk using medical features (Age, BMI, Blood Pressure, etc.).
- Robust data preprocessing using scikit-learn Pipelines.
- CORS-enabled for seamless frontend integration.
- Latency and prediction logging for MLOps tracking.

### Running Locally (with Docker)

Navigate to the backend directory and build the image:
```bash
cd backend
docker build -t ml-api .
docker run -p 8000:8000 ml-api
```
The API will be available at `http://localhost:8000`. You can view the interactive documentation at `http://localhost:8000/docs`.

### Running Locally (without Docker)
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

---

## 🎨 Frontend (User Interface)

**Tech Stack**: React, Vite, Tailwind CSS v4, Lucide React Icons

### Features
- Clean, modern health-tech aesthetic with a card-based layout.
- "Load Sample Data" feature for quick testing.
- Live animated gauge displaying the risk probability.
- Input validation and graceful API error handling.

### Running Locally

Ensure you have Node.js installed, then navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The web app will be available at `http://localhost:5173`. 
*(Note: If testing locally, update `API_BASE_URL` in `src/App.jsx` to point to `http://localhost:8000`)*

---

## ☁️ Cloud Deployment

- **Backend** is deployed on Render / AWS EC2.
- **Frontend** can be deployed easily on Vercel or Netlify using the `npm run build` command and setting the output directory to `dist`.

## 📈 Future Improvements

- Model monitoring & drift detection.
- Full CI/CD pipeline integration.
- Auto-scaling with a load balancer.