function fill(data){
    console.log("starting");
    const teamName = document.title.replaceAll(" ","_");
    console.log(teamName)
    const table = document.getElementById("player_data");
    const teamData = data.teams.find(team => team.name === teamName);
    const topRated = teamData.top_rated;
    const topScorers = teamData.top_scorers;
    const topAssists = teamData.top_assists;

    const topRatedHTML = createHTML(topRated, "Top Rated");

    const topScorersHTML = createHTML(topScorers, "Top Scorers");

    const topAssistsHTML = createHTML(topAssists, "Top Assists");

    table.innerHTML = `
        <table>
            <tr>
                <th>${topRatedHTML.header}</th>
            </tr>
            ${topRatedHTML.rows}
        </table>
        <table>
            <tr>
                <th>${topScorersHTML.header}</th>
            </tr>
            ${topScorersHTML.rows}
        </table>
        <table>
            <tr>
                <th>${topAssistsHTML.header}</th>
            </tr>
            ${topAssistsHTML.rows}
        </table>`;
}

function createHTML(object, header){
    let rowsHTML = "";
    for (const [name, value] of Object.entries(object)){
        rowsHTML += `
            <tr>
                <td><img src="${name}.png">${name.replaceAll("_", " ")}  ${value}</td>
            </tr>`;
    }

    return {
        header: header,
        rows: rowsHTML
    };
}

// learned from https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
// this is needed because we need to update this file when adding new scores
document.addEventListener("DOMContentLoaded", function(){
    fetch('https://getpantry.cloud/apiv1/pantry/28e85847-9a92-4320-a997-d44fc3601859/basket/teams')
        .then(response => response.json())
        .then(data => {
            fill(data);
        });
});
