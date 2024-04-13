function fill(){
    console.log("starting");
    for(let i = 0; i < 20; i++){
        console.log(data["teams"][i]["rank"]);

        let row = document.getElementById('table').rows[data["teams"][i]["rank"]];

        row.cells[0].innerHTML = data["teams"][i]["rank"];
        row.cells[1].innerHTML = '<img src="teams/'+data["teams"][i]["name"].toLowerCase()+'/'+data["teams"][i]["name"].toLowerCase()+'.png">';
        row.cells[2].innerHTML = '<a href="teams/'+data["teams"][i]["name"].toLowerCase()+'/'+data["teams"][i]["name"].toLowerCase()+'.html">'+ data["teams"][i]["name"].replace("_", " ") + "</a>";  
        row.cells[3].innerHTML = data["teams"][i]["played"];
        row.cells[4].innerHTML = data["teams"][i]["won"];
        row.cells[5].innerHTML = data["teams"][i]["drawn"];
        row.cells[6].innerHTML = data["teams"][i]["lost"];  
        row.cells[7].innerHTML = data["teams"][i]["points"]; 

    }
}

document.addEventListener("DOMContentLoaded",function(){
    fill();
});
