import React, { useState } from "react";
import "./App.css";

function App() {
  const [homeElo, setHomeElo] = useState("");
  const [awayElo, setAwayElo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid = () => {
    if (!homeElo || !awayElo) {
      setErrorMessage("Please enter both home and away ELO ratings");
      return false;
    }
    if (isNaN(parseFloat(homeElo)) || isNaN(parseFloat(awayElo))) {
      setErrorMessage("ELO ratings must be valid numbers");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handlePredict = async () => {
    if (!isFormValid()) return;

    setLoading(true);
    setResult(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "/predict";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          home_elo: parseFloat(homeElo),
          away_elo: parseFloat(awayElo),
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setErrorMessage(`Failed to get prediction: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🏀 NBA Win Predictor 🏀</h1>

      <div className="input-group">
        <label>Home Team ELO Rating</label>
        <input
          type="number"
          placeholder="e.g. 1673"
          value={homeElo}
          onChange={(e) => setHomeElo(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Away Team ELO Rating</label>
        <input
          type="number"
          placeholder="e.g. 1612"
          value={awayElo}
          onChange={(e) => setAwayElo(e.target.value)}
        />
      </div>

      <p className="elo-link">
        🔗 Need team ELOs?{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/1tQ2c9uWPN0cGxutQAXPVWTAmoqASaYYvHVBW61cxKiU/edit?gid=254973529"
          target="_blank"
          rel="noopener noreferrer"
        >
          View ELO Spreadsheet
        </a>
      </p>

      {errorMessage && <div className="error">{errorMessage}</div>}

      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict Outcome"}
      </button>

      {result && (
        <div className="result-box">
          <h3>Prediction: {result.prediction}</h3>
          <p>Win Probability: {Math.round(result.win_probability * 100)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
