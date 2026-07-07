import joblib
import numpy as np

# Load pipeline
pipeline = joblib.load("model/diabetes_model_v1.joblib")


def validate_input(input_data):
    """Validate input data"""
    if not isinstance(input_data, (list, np.ndarray)):
        raise TypeError("Input must be a list or numpy array")
    if len(input_data) == 0:
        raise ValueError("Input cannot be empty")

def predict_diabetes(input_data):
    validate_input(input_data)

    input_array = np.array(input_data).reshape(1, -1)
    prediction = pipeline.predict(input_array)[0]
    probability = pipeline.predict_proba(input_array)[0][1]

    return {
        "prediction": int(prediction),
        "risk_probability": round(float(probability), 3)
    }


# Example usage
# Access the model from the pipeline (assuming it's named "model")
n_features = pipeline.coef_[0].shape[0]
sample_input = [0.5] * n_features
result = predict_diabetes(sample_input)

print(result)
