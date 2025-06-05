from data_collection import get_elo_data
from data_processing import process_elo_data
from feature_engineering import add_elo_features
from model import train_model

# Step 1: Get game-level ELO data
raw_data = get_elo_data()

if not raw_data.empty:
    # Step 2: Clean/process data
    processed_data = process_elo_data(raw_data)

    # Step 3: Add engineered features
    featured_data = add_elo_features(processed_data)

    # Step 4: Train model and show results
    model, X_test, y_test, y_pred = train_model(featured_data)
else:
    print("Failed to load data.")

