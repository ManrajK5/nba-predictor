import pandas as pd

def get_elo_data():
    """
    Loads NBA Elo data from FiveThirtyEight's GitHub (matchup-level).
    Filters regular season games and returns key columns for prediction.
    """

    url = "https://raw.githubusercontent.com/fivethirtyeight/data/master/nba-elo/nbaallelo.csv"

    try:
        df = pd.read_csv(url)

        # Keep only regular season games
        df = df[df['is_playoffs'] == 0]

        # Filter and rename relevant columns
        df = df[[
            'date_game',       # Date
            'team_id',         # Team
            'opp_id',          # Opponent
            'elo_i',           # Team's Elo before game
            'opp_elo_i',       # Opponent's Elo before game
            'pts',             # Team points
            'opp_pts',         # Opponent points
            'game_location',   # H (Home), A (Away)
            'game_result'      # W or L
        ]].rename(columns={
            'date_game': 'date',
            'team_id': 'team',
            'opp_id': 'opponent',
            'elo_i': 'team_elo',
            'opp_elo_i': 'opponent_elo',
            'pts': 'team_pts',
            'opp_pts': 'opponent_pts',
            'game_location': 'home_or_away',
            'game_result': 'team_result'
        })

        # Convert date column to datetime
        df['date'] = pd.to_datetime(df['date'])

        print(f"ELO data loaded successfully with {len(df)} games.")
        return df

    except Exception as e:
        print(f"Error loading ELO data: {e}")
        return pd.DataFrame()
