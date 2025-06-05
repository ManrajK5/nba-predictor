import pandas as pd

def process_elo_data(df):
    """
    Process raw Elo data into a matchup-based format: 1 row per game with home and away teams.
    """
    # Keep only games with valid home/away designation
    df = df[df['home_or_away'].isin(['H', 'A'])]

    # Split into home and away
    home_df = df[df['home_or_away'] == 'H'].copy()
    away_df = df[df['home_or_away'] == 'A'].copy()

    # Merge on date and opponent/team alignment
    merged = pd.merge(
    home_df,
    away_df,
    how='inner',
    validate='many_to_many',  # allow team to play same opponent more than once
    left_on=['date', 'opponent'],
    right_on=['date', 'team'],
    suffixes=('_home', '_away')
)


    # Filter rows where match is actually team vs opponent
    merged = merged[merged['opponent_away'] == merged['team_home']]

    # Binary target: 1 if home team won
    merged['home_win'] = merged['team_result_home'].apply(lambda x: 1 if x == 'W' else 0)

    # Keep and rename relevant columns
    matchup_df = merged[[
        'date',
        'team_home', 'team_away',
        'team_elo_home', 'team_elo_away',
        'team_pts_home', 'team_pts_away',
        'home_win'
    ]].rename(columns={
        'team_home': 'home_team',
        'team_away': 'away_team',
        'team_elo_home': 'home_elo',
        'team_elo_away': 'away_elo',
        'team_pts_home': 'home_score',
        'team_pts_away': 'away_score'
    })

    print(f"Processed {len(matchup_df)} valid home vs away games.")
    return matchup_df

