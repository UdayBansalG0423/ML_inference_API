🚀 Production-Ready ML Inference API
📌 Overview

This project demonstrates an end-to-end Machine Learning engineering pipeline, from model training to cloud deployment.
A trained ML model is served as a REST API using FastAPI, containerized with Docker, and deployed on AWS EC2.

🧠 Problem Statement

Predict diabetes risk using medical features while ensuring:

reproducible training

safe inference

low-latency predictions

production-ready deployment

🏗️ System Architecture
Client → FastAPI → ML Pipeline → Prediction
               ↓
           Docker Container
               ↓
             AWS EC2


(Add a simple diagram later if you want)

⚙️ Tech Stack

ML: Scikit-learn, NumPy

Backend: FastAPI

MLOps: Docker, Joblib

Cloud: AWS EC2

API Docs: Swagger (OpenAPI)

🔬 ML Engineering Highlights

Implemented training–inference separation

Used sklearn Pipelines to prevent preprocessing mismatch

Added input validation & error handling

Logged predictions, errors, and inference latency

Versioned ML models for safe rollback

🚀 Run Locally (Docker)
docker build -t ml-api .
docker run -p 8000:8000 ml-api


Open:

http://localhost:8000/docs

☁️ Cloud Deployment

Deployed Dockerized API on AWS EC2

Exposed service via public endpoint

API accessible using Swagger UI

📈 Future Improvements

Model monitoring & drift detection

CI/CD pipeline

Auto-scaling with load balancer