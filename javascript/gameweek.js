

const matchesForm = document.getElementById("matchesForm");
var teamData = {}
// learned from https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
// this is needed because we need to update this file when adding new scores
document.addEventListener("DOMContentLoaded", myFunction);

//https://stackoverflow.com/questions/66184755/can-i-store-the-result-of-fetch-in-a-global-variable-using-javascript
async function myFunction(){
    const res = await fetch('https://getpantry.cloud/apiv1/pantry/28e85847-9a92-4320-a997-d44fc3601859/basket/teams')
    const data = await res.json()
    teamData = data
    console.log("TEAM DATA: ")
    console.log(teamData)
    createMatches(teamData)
    matchesForm.addEventListener("submit", handler);
  }

function createMatches(data){
    matchesForm.innerHTML = "";
    let usedIndexes = [];

    while(usedIndexes.length < data.teams.length){
        console.log("generating match");
        const randomIndex1 = getRandomIndex(data.teams.length);
        console.log(`random number: ${randomIndex1}`);
        if(!usedIndexes.includes(randomIndex1)){
            usedIndexes.push(randomIndex1);
            let randomIndex2 = getRandomIndex(data.teams.length);
            console.log(`random number: ${randomIndex2}`);

            while(usedIndexes.includes(randomIndex2)){
                randomIndex2 = getRandomIndex(data.teams.length);
            }
            usedIndexes.push(randomIndex2);
            const team1 = data.teams[randomIndex1];
            const team2 = data.teams[randomIndex2];

            const matchLabel = document.createElement("label");
            matchLabel.textContent = `${team1.name.replaceAll("_", " ")} vs ${team2.name.replaceAll("_", " ")}`;
            const team1Input = document.createElement("input");
            team1Input.type = "number";
            team1Input.name = `${team1.name}_score`;
            team1Input.placeholder = "Score";
            team1Input.required = true;
            team1Input.addEventListener("input",function(){
                if(team1Input.value < 0){
                    team1Input.value = 0;
                }
            });

            const team2Input = document.createElement("input");
            team2Input.type = "number";
            team2Input.name = `${team2.name}_score`;
            team2Input.placeholder = "Score";
            team2Input.required = true;
            team2Input.addEventListener("input",function(){
                if(team2Input.value < 0){
                    team2Input.value = 0;
                }
            });


            const br = document.createElement("br");

            matchesForm.appendChild(matchLabel);
            matchesForm.appendChild(document.createElement("br"));
            matchesForm.appendChild(team1Input);
            matchesForm.appendChild(document.createTextNode(" - "));
            matchesForm.appendChild(team2Input);
            matchesForm.appendChild(br);
        }
    }

    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit";
    matchesForm.appendChild(submitButton);
}

function getRandomIndex(max){
    return Math.floor(Math.random() * max);
}




function handler(e){
    e.preventDefault(); 
    console.log(matchesForm.elements)

    for (let i = 0; i < matchesForm.elements.length; i++){
        if (matchesForm.elements[i].type === "number"){
            const team1Score = parseInt(matchesForm.elements[i].value);
            const team2Score = parseInt(matchesForm.elements[i + 1].value);

            const team1Name = matchesForm.elements[i].name.replaceAll("_score", "");
            const team2Name = matchesForm.elements[i + 1].name.replaceAll("_score", "");

            updateMatch(team1Score, team2Score, team1Name, team2Name);

            i++;
        }
    }
    // found how to sort using a custom function. this is because there is no simple way of sorting this object by the points
    // solution found here: https://stackoverflow.com/questions/4222690/sorting-a-json-object-in-javascript
    teamData.teams.sort((a, b) => b.points - a.points);

    for(let i = 0; i < teamData.teams.length; i++){
        teamData.teams[i].rank = i + 1;
    }

    matchesForm.reset();

    fetch('https://getpantry.cloud/apiv1/pantry/28e85847-9a92-4320-a997-d44fc3601859/basket/teams',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
    })

    createMatches(teamData);

    console.log(teamData);
}
function updateMatch(team1Score, team2Score, team1Name, team2Name){
    console.log(teamData)
    const team1 = teamData.teams.find(team => team.name === team1Name);
    const team2 = teamData.teams.find(team => team.name === team2Name);

    if(team1Score > team2Score){
        team1.played += 1;
        team2.played += 1;
        team1.won += 1;
        team2.lost += 1;
        team1.points += 3;
        console.log(`${team1Name} won against ${team2Name}`);
    }else if(team1Score < team2Score){
        team1.played += 1;
        team2.played += 1;
        team1.lost += 1;
        team2.won += 1;
        team2.points += 3;
        console.log(`${team2Name} won against ${team1Name}`);
    }else{
        team1.played += 1;
        team2.played += 1;
        team1.drawn += 1;
        team2.drawn += 1;
        team1.points += 1;
        team2.points += 1;
        console.log(`${team1Name} and ${team2Name} draw`);
    }
}

