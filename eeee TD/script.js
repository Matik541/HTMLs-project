var pos = [];
tiles(10, 6)
function tiles(mx, my){
    document.getElementById("grid").style.gridTemplateRows = "repeat("+my+", min-content)"
    document.getElementById("grid").style.gridTemplateColumns = "repeat("+mx+", min-content)"
    document.getElementById("grid").style.marginLeft = - (128*mx/2)+"px"
    document.getElementById("grid").innerHTML = ""
    pos = [];
    var lista = [];
    for(let l=0;l<my;l++){
        for(let i=0; i<mx; i++){
            lista.push(l+'-'+i)
            document.getElementById("grid").innerHTML += '<div class="tile" id="'+l+"-"+i+'"></div>'
        }
        pos.push(lista)
        lista = [];
    }
    gen_gold()
}
function gen_gold(bonus){
    for(let l = 0; l<pos.length; l++){
        document.getElementById(pos[l][0]).style.backgroundColor = "gold"
        document.getElementById(pos[l][0]).classList.add("gold")
    }
    if(bonus != undefined){
        for(let l = 0; l<bonus; l++){
            document.getElementById(pos[l][1]).style.backgroundColor = "gold"
            document.getElementById(pos[l][1]).classList.add("gold")
        }
    }
    else{
        for(let l = 0; l<=Math.floor(Math.random()*6); l++){
            let r = Math.floor(Math.random()*6)
            document.getElementById(pos[r][1]).style.backgroundColor = "gold"
            document.getElementById(pos[r][1]).classList.add("gold")
        }
    }
}
/*document.getElementById().addEventListener("click", () => {
    let r = Math.floor(Math.random()*pos.length)
    let g = pos[r]
    pos = pos.slice(0, r).concat(pos.slice(r+1, 999999999999999999999))
    infected.push(g)
    document.getElementById(g).style.backgroundColor = "red"


})*/
