import pandas as pd
from xgboost import XGBClassifier, plot_importance
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import matplotlib.pyplot as plt
import joblib

def train_model(data):
    """
    Train an XGBoost classifier to predict whether the home team will win.
    """

    # Use engineered features
    feature_cols = ['elo_diff', 'avg_elo']
    X = data[feature_cols]
    y = data['home_win']

    # Split into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Initialize and train the model
    model = XGBClassifier(
        use_label_encoder=False,
        eval_metric='logloss',
        max_depth=4,
        learning_rate=0.1,
        n_estimators=100,
        random_state=42
    )
    model.fit(x_train, y_train)

    # Predict and evaluate
    y_pred = model.predict(x_test)

    print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    # Plot feature importances
    plot_importance(model)
    plt.title("Feature Importances")
    plt.tight_layout()
    plt.show()

    #save model to file for Flask
    joblib.dump(model, "xgb_model.pkl")
    
    return model, x_test, y_test, y_pred


