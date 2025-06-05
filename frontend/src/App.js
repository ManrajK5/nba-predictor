import React, { useState } from "react";

function App() {
  const [homeElo, setHomeElo] = useState("");
  const [awayElo, setAwayElo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form validation
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
      // Using full URL for clarity - change this to your actual API endpoint
      // If your API is on the same origin, you can use relative paths
      const apiUrl = process.env.REACT_APP_API_URL || "/predict";
      
      console.log(`Sending request to: ${apiUrl}`);
      console.log("Request payload:", { home_elo: parseFloat(homeElo), away_elo: parseFloat(awayElo) });
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          home_elo: parseFloat(homeElo),
          away_elo: parseFloat(awayElo),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      setResult(data);
    } catch (error) {
      console.error("Prediction failed:", error);
      setErrorMessage(`Failed to get prediction: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">🏀 NBA Win Predictor</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Team ELO Rating</label>
            <input
              type="number"
              placeholder="e.g., 1500"
              value={homeElo}
              onChange={(e) => setHomeElo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Away Team ELO Rating</label>
            <input
              type="number"
              placeholder="e.g., 1450"
              value={awayElo}
              onChange={(e) => setAwayElo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {errorMessage && (
            <div className="text-red-500 text-sm py-1">{errorMessage}</div>
          )}
          
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? "Predicting..." : "Predict Outcome"}
          </button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium text-gray-900">
              Prediction: {result.prediction}
            </h3>
            <p className="text-gray-700">
              Win Probability: {Math.round(result.win_probability * 100)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
