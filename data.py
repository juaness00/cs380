import os
import json
import random

# Sample data for testing
sample_data = {
    "teams": [
        {
            "rank": 6,
            "name": "Newcastle_United",
            "played": 32,
            "won": 15,
            "drawn": 5,
            "lost": 12,
            "goalsDifference": "+17",
            "points": 50,
            "description": "Newcastle United Football Club, based in Newcastle upon Tyne, England, has a devoted fanbase and a history of competing at the highest levels of English football.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 7,
            "name": "Manchester_United",
            "played": 32,
            "won": 15,
            "drawn": 5,
            "lost": 12,
            "goalsDifference": "-1",
            "points": 50,
            "description": "Manchester United Football Club, based in Manchester, England, is one of the most successful clubs in English football history. They have a global fanbase and a legacy of success.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 8,
            "name": "West_Ham_United",
            "played": 32,
            "won": 13,
            "drawn": 9,
            "lost": 10,
            "goalsDifference": "-4",
            "points": 48,
            "description": "West Ham United Football Club, based in London, England, has a history of passionate support and a reputation for producing talented players. They have had success both domestically and in Europe.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 9,
            "name": "Chelsea",
            "played": 30,
            "won": 12,
            "drawn": 8,
            "lost": 10,
            "goalsDifference": "+3",
            "points": 44,
            "description": "Chelsea Football Club, based in London, England, is one of the top clubs in English and European football. Known for their success in recent years, they have a strong squad and passionate fanbase.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 10,
            "name": "Brighton",
            "played": 32,
            "won": 11,
            "drawn": 11,
            "lost": 10,
            "goalsDifference": "+2",
            "points": 44,
            "description": "Brighton & Hove Albion Football Club, based in Brighton, England, has a history of competing in the top tiers of English football. They are known for their community spirit and attractive style of play.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 11,
            "name": "Wolverhampton_Wanderers",
            "played": 32,
            "won": 12,
            "drawn": 7,
            "lost": 13,
            "goalsDifference": "-5",
            "points": 43,
            "description": "Wolverhampton Wanderers Football Club, known as Wolves, is based in Wolverhampton, England. They have a strong history and have experienced success in both domestic and European competitions.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 12,
            "name": "Bournemouth",
            "played": 32,
            "won": 11,
            "drawn": 9,
            "lost": 12,
            "goalsDifference": "-10",
            "points": 42,
            "description": "AFC Bournemouth, based in Bournemouth, England, has risen through the English football leagues in recent years. They are known for their attacking style of play and passionate supporters.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 13,
            "name": "Fulham",
            "played": 32,
            "won": 11,
            "drawn": 6,
            "lost": 15,
            "goalsDifference": "-4",
            "points": 39,
            "description": "Fulham Football Club, based in London, England, has a rich history and has competed in the top tiers of English football. They are known for their historic stadium and loyal fanbase.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 14,
            "name": "Brentford",
            "played": 33,
            "won": 8,
            "drawn": 8,
            "lost": 17,
            "goalsDifference": "-11",
            "points": 32,
            "description": "Brentford Football Club, based in London, England, has a strong fanbase and a history of competing in the lower divisions of English football. They have recently earned promotion to the top tier.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 15,
            "name": "Crystal_Palace",
            "played": 31,
            "won": 7,
            "drawn": 9,
            "lost": 15,
            "goalsDifference": "-18",
            "points": 30,
            "description": "Crystal Palace Football Club, based in London, England, has a loyal fanbase and a history of exciting football. They have competed in the top tiers of English football for many years.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 16,
            "name": "Everton",
            "played": 31,
            "won": 9,
            "drawn": 8,
            "lost": 14,
            "goalsDifference": "-10",
            "points": 27,
            "description": "Everton Football Club, based in Liverpool, England, has a long history and a strong fanbase. They have a legacy of success in English football, including European competition.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 17,
            "name": "Nottingham_Forest",
            "played": 33,
            "won": 7,
            "drawn": 9,
            "lost": 17,
            "goalsDifference": "-16",
            "points": 26,
            "description": "Nottingham Forest Football Club, based in Nottingham, England, has a rich history of success. They are known for their iconic European Cup victories under legendary manager Brian Clough.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 18,
            "name": "Luton",
            "played": 33,
            "won": 6,
            "drawn": 7,
            "lost": 20,
            "goalsDifference": "-24",
            "points": 25,
            "description": "Luton Town Football Club, based in Luton, England, has a long history in English football. They have experienced both success and challenging times, with a loyal fanbase supporting them through thick and thin.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 19,
            "name": "Burnley",
            "played": 33,
            "won": 4,
            "drawn": 8,
            "lost": 21,
            "goalsDifference": "-35",
            "points": 20,
            "description": "Burnley Football Club, based in Burnley, England, has a history dating back to the late 19th century. They have a strong local following and a reputation for resilience on the pitch.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        },
        {
            "rank": 20,
            "name": "Sheffield_United",
            "played": 32,
            "won": 3,
            "drawn": 7,
            "lost": 22,
            "goalsDifference": "-54",
            "points": 16,
            "description": "Sheffield United Football Club, based in Sheffield, England, has a history of success in English football. They have a loyal fanbase and have competed in the top tiers of English football.",
            "top_rated": {},
            "top_scorers": {},
            "top_assists": {}
        }
    ]
}


# Define the folder where team images are stored
teams_folder = "teams"

# Function to get list of images in a team folder
def get_team_images(team_folder, team_name):
    images = []
    for filename in os.listdir(team_folder):
        if filename.endswith(".png") and filename[:-4] != team_name:  # Exclude team image
            images.append(filename[:-4])  # Remove the ".png" extension
    return images

# Update each team's top scorers, top assists, and top rated
for team in sample_data["teams"]:
    team_name = team["name"].lower().replace(" ", "_")
    team_folder_path = os.path.join(teams_folder, team_name)
    
    if os.path.isdir(team_folder_path):
        images = get_team_images(team_folder_path, team_name)
        
        # Shuffle the images to get a random selection
        random.shuffle(images)
        
        # Assign top scorers
        top_scorers = []
        for player in images:
            if len(top_scorers) == 4:
                break
            if player not in top_scorers:
                top_scorers.append(player)
        # Assign random scores to top scorers
        team["top_scorers"] = {player: random.randint(5, 20) for player in top_scorers}
        random.shuffle(images)
        # Assign top assists
        top_assists = []
        for player in images:
            if len(top_assists) == 4:
                break
            if player not in top_assists:
                top_assists.append(player)
        # Assign random assists to top assists
        team["top_assists"] = {player: random.randint(3, 10) for player in top_assists}
        random.shuffle(images)
        # Assign top rated
        top_rated = []
        for player in images:
            if len(top_rated) == 4:
                break
            if player not in top_rated :
                top_rated.append(player)
        # Assign random ratings to top rated
        team["top_rated"] = {player: round(random.uniform(7.20, 8.60), 2) for player in top_rated}
        
        # Sort each category (top scorers, top assists, top rated) from high to low based on values
        team["top_scorers"] = dict(sorted(team["top_scorers"].items(), key=lambda x: x[1], reverse=True))
        team["top_assists"] = dict(sorted(team["top_assists"].items(), key=lambda x: x[1], reverse=True))
        team["top_rated"] = dict(sorted(team["top_rated"].items(), key=lambda x: x[1], reverse=True))

# Save the updated JSON (or print it)
updated_json = json.dumps(sample_data, indent=4)

# If you want to save to a file, uncomment the lines below
with open("updated_teams.json", "w") as f:
    json.dump(sample_data, f, indent=4)


