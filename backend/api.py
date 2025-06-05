from flask import Flask, request, jsonify
import joblib
import numpy as np
import xgboost as xgb
from flask_cors import CORS


# Load trained XGBoost model
model = joblib.load("xgb_model.pkl")

app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return "NBA Predictor API running..."

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    home_elo = data.get("home_elo")
    away_elo = data.get("away_elo")

    if home_elo is None or away_elo is None:
        return jsonify({"error": "Missing home_elo or away_elo"}), 400

    # Build feature vector
    elo_diff = home_elo - away_elo
    avg_elo = (home_elo + away_elo) / 2
    X = np.array([[elo_diff, avg_elo]])

    # Predict
    win_prob = model.predict_proba(X)[0][1]
    prediction = "home" if win_prob >= 0.5 else "away"

    return jsonify({
        "prediction": prediction,
        "win_probability": round(float(win_prob), 2)
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)

