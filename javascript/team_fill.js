function fill(data){
    console.log("starting");
    for(let i = 0; i < 20; i++){
        console.log(data["teams"][i]["rank"]);

        let row = document.getElementById('table').rows[data["teams"][i]["rank"]];

        row.cells[0].innerHTML = data["teams"][i]["rank"];
        row.cells[1].innerHTML = '<img src="teams/'+data["teams"][i]["name"].toLowerCase()+'/'+data["teams"][i]["name"].toLowerCase()+'.png">';
        row.cells[2].innerHTML = data["teams"][i]["name"].replaceAll("_", " ");  
        row.cells[3].innerHTML = data["teams"][i]["played"];
        row.cells[4].innerHTML = data["teams"][i]["won"];
        row.cells[5].innerHTML = data["teams"][i]["drawn"];
        row.cells[6].innerHTML = data["teams"][i]["lost"];  
        row.cells[7].innerHTML = data["teams"][i]["points"]; 

    }
}

// learned from https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
// this is needed because we need to update this file when adding new scores
document.addEventListener("DOMContentLoaded",function(){
    fetch('https://getpantry.cloud/apiv1/pantry/28e85847-9a92-4320-a997-d44fc3601859/basket/teams')
        .then(response => response.json())
        .then(data => {
            fill(data);
        });
});
