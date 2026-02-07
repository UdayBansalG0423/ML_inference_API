from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)



# Load model at startup (VERY IMPORTANT)
model = joblib.load("model/diabetes_model_v1.joblib")
logger.info("Model loaded successfully")

app = FastAPI(
    title="Diabetes Prediction API",
    description="ML inference service using FastAPI",
    version="1.0"
)
class DiabetesInput(BaseModel):
    features: list[float]
def validate_input(features, expected_features=10):
    if len(features) != expected_features:
        raise ValueError(f"Expected {expected_features} features")

@app.post("/predict")
def predict(data: DiabetesInput):
    start_time = datetime.now()

    try:
        validate_input(data.features)

        input_array = np.array(data.features).reshape(1, -1)
        prediction = model.predict(input_array)[0]
        probability = model.predict_proba(input_array)[0][1]

        response = {
            "prediction": int(prediction),
            "risk_probability": round(float(probability), 3)
        }

        latency = (datetime.now() - start_time).total_seconds()

        logger.info(
            f"Prediction={response['prediction']} "
            f"Probability={response['risk_probability']} "
            f"Latency={latency}s"
        )

        return response

    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    
