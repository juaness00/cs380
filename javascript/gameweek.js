const matchesForm = document.getElementById("matchesForm");

function createMatches(data){
    matchesForm.innerHTML = "";

    let usedIndexes = new Set();

    while(usedIndexes.size < data.teams.length){
        console.log("generating match");
        const randomIndex1 = getRandomIndex(data.teams.length);
        console.log(`random number: ${randomIndex1}`);
        if(!usedIndexes.has(randomIndex1)){
            usedIndexes.add(randomIndex1);
            let randomIndex2 = getRandomIndex(data.teams.length);
            console.log(`random number: ${randomIndex2}`);

            while(usedIndexes.has(randomIndex2)){
                randomIndex2 = getRandomIndex(data.teams.length);
            }
            usedIndexes.add(randomIndex2);
            const team1 = data.teams[randomIndex1];
            const team2 = data.teams[randomIndex2];

            const matchLabel = document.createElement("label");
            matchLabel.textContent = `${team1.name.replace("_"," ")} vs ${team2.name.replace("_"," ")}`;
            const team1Input = document.createElement("input");
            team1Input.type = "number";
            team1Input.name = `${team1.name}_score`;
            team1Input.placeholder = "Score";
            team1Input.required = true;

            const team2Input = document.createElement("input");
            team2Input.type = "number";
            team2Input.name = `${team2.name}_score`;
            team2Input.placeholder = "Score";
            team2Input.required = true;

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


matchesForm.addEventListener("submit", function(event){
    event.preventDefault(); 
    console.log(matchesForm.elements)

    for (let i = 0; i < matchesForm.elements.length; i++){
        if (matchesForm.elements[i].type === "number"){
            const team1Score = parseInt(matchesForm.elements[i].value);
            const team2Score = parseInt(matchesForm.elements[i + 1].value);

            const team1Name = matchesForm.elements[i].name.replace("_score", "");
            const team2Name = matchesForm.elements[i + 1].name.replace("_score", "");

            updateMatch(data, team1Score, team2Score, team1Name, team2Name);

            i++;
        }
    }
    data.teams.sort((a, b) => b.points - a.points);

    for(let i = 0; i < data.teams.length; i++){
        data.teams[i].rank = i + 1;
    }

    matchesForm.reset();


    createMatches(data);

    console.log(data);
});


function updateMatch(data, team1Score, team2Score, team1Name, team2Name){
    const team1 = data.teams.find(team => team.name === team1Name);
    const team2 = data.teams.find(team => team.name === team2Name);

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

document.addEventListener("DOMContentLoaded", function(){
    fetch('https://raw.githubusercontent.com/juaness00/cs380/master/javascript/team_data.json')
        .then(response => response.json())
        .then(data => {
            createMatches(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
