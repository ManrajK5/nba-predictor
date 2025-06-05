import pandas as pd

def add_elo_features(df):
    """
    Add Elo-based features to the matchup-level data.
    """

    # Feature 1: Difference in Elo (advantage for home team)
    df['elo_diff'] = df['home_elo'] - df['away_elo']

    # Feature 2: Average Elo (overall matchup strength)
    df['avg_elo'] = (df['home_elo'] + df['away_elo']) / 2

    print("Feature engineering complete: added elo_diff and avg_elo.")
    return df


