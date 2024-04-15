
window.addEventListener('load', function(){
    for(let i = 0; i < 20; i++){
        let row = this.document.getElementById(i+1);
        row.addEventListener('click', goToPage);
    }
});

function goToPage(){
    let name = this.querySelector('.name').textContent.replaceAll(" ", "_");
    window.location.href = `teams/${name}/${name}.html`
}

  