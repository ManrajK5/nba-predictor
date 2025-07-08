NBA Win Predictor
---
This is a simple, lightweight NBA prediction tool that uses Elo ratings to estimate which team is more likely to win a game. Just enter the Elo ratings of the home and away teams, and the app will instantly calculate the win probability and predicted winner.

- Live App: [nba-predictor.s3-website.us-east-2.amazonaws.com]([http://nba-predictor.s3-website.us-east-2.amazonaws.com](http://nba-predictor.s3-website.ca-central-1.amazonaws.com/)
- Elo Reference Sheet: [Google Sheet](https://docs.google.com/spreadsheets/d/1tQ2c9uWPN0cGxutQAXPVWTAmoqASaYYvHVBW61cxKiU/edit#gid=254973529)

---
What is Elo?
Elo ratings are a straightforward and effective way to rank competitors based on their performance. Originally developed for chess, Elo is now widely used in sports like basketball, football, and esports.

- Every team starts with a base rating (typically 1500)
- Ratings adjust based on game results and opponent strength
- A higher Elo rating means a stronger team
- The difference between the two teams' ratings gives the expected win probability

This app uses those Elo differences to predict outcomes using a machine learning model trained on historical NBA results.

---
Features
- 🔢 Input your own Elo ratings for any two teams
- 🧠 See win probability and predicted winner
- 💡 Includes a link to a live Elo tracking spreadsheet
- ⚡ Instant results powered by an XGBoost model served through a Flask API
- No installation needed, just use the link

---
Tech Stack

- Frontend: React, CSS, deployed on AWS S3
- Backend: Flask (Python), deployed on Render
- Model: XGBoost, using Elo rating differentials
