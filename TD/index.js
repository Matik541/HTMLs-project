{ //custom function

function random(times, inequal){
    return Math.floor(Math.random()*times)+inequal;
}
function Position(y, x){
    this.pos = y+"-"+x,
    this.y = y,
    this.x = x,
    this.type = "blank"
    this.happy = -1
    this.boost = []
}
Position.prototype.position = function(){
    return document.getElementById(this.pos);
}

}

var pos = []; //position of div in grid
const stats = {
    "gold" : 200,
    "wood" : 100,
    "stone" : 100,
    "people" : 0,
}

function grid_size(){
    var row = document.getElementById("row").value*1
    var col = document.getElementById("col").value*1
    document.getElementById("grid").style.gridTemplateRows = "repeat("+row+", min-content)"
    document.getElementById("grid").style.gridTemplateColumns = "repeat("+col+", min-content)"
    document.getElementById("grid").innerHTML = ""
    var pos1;
    for(let l=0;l<row;l++){
        pos1 = [];
        for(let i=0; i<col; i++){
            let pos2 = new Position(l, i)
            pos1.push(pos2)
            document.getElementById("grid").innerHTML += '<div class="tile" onclick="tile_click(this)" id="'+l+"-"+i+'"></div>'
        }
        pos.push(pos1)
    }
}
grid_size()

var x, y;
document.addEventListener("keydown", (event)=>{
    var ths = {
        id : "home",
    } 
    switch(event.key){
        case '1':
            ths.id = "home"
            tile_type(ths)
        break;
        case '2':
            ths.id = "mine"
            tile_type(ths)
        break;
        case '3':
            ths.id = "wood"
            tile_type(ths)
        break;
        case '4':
            ths.id = "shop"
            tile_type(ths)
        break;
        case '5':
            ths.id = "blank"
            tile_type(ths)
        break;
        case 'q':
            ths.id = "tree"
            tile_boost(ths)
        break;
        case 'w':
            ths.id = "ore"
            tile_boost(ths)
        break;
        case '0':
            tile_status()
        break;
    }
})
function tile_click(ths){
    [x, y] = [((ths.id).split("-"))[0], ((ths.id).split("-"))[1]]
    document.getElementById("tiles").style.opacity = 1
}
function tile_boost(ths){
    var row = document.getElementById("row").value*1
    var col = document.getElementById("col").value*1
    var [r1, r2] = [Math.floor(Math.random()*(row+1)),Math.floor(Math.random()*(col+1))]
    pos[r1][r2].boost.push(ths.id)
    document.getElementById(pos[r1][r2].pos).innerText += document.getElementById(ths.id).innerText
}
function tile_type(ths){
    pos[x][y].type = ths.id
    let type = ths.id
    if(type == "home"){type=type+Math.floor(Math.random()*2)}
    if(type != "blank"){
        document.getElementById(pos[x][y].pos).style.backgroundImage = "url(./"+type+".png)"
    }
    else{
        document.getElementById(pos[x][y].pos).style.backgroundImage = "url()"
        document.getElementById(pos[x][y].pos).style.backgroundColor = "#666"
    }
}
var happyness = true
tile_status()
function tile_status(){
    if(happyness == false){
        happyness = true
    }
    else{
        happyness = false
        for(let l=0; l<pos.length; l++){
            for(let i=0; i<pos[l].length; i++){
                if(pos[l][i].type != "blank"){
                    document.getElementById(pos[l][i].pos).style.backgroundColor = "#666"
                }
            }
        }
    }
    setInterval(() => {
        var [happy, homes, shops, works, ores, trees] = [0, 0, 0, 0, 0, 0]
        for(let l=0; l<pos.length; l++){
            for(let i=0; i<pos[l].length; i++){
                [happy, homes, shops, works, ores, trees] = [0, 0,0, 0, 0, 0]
                if(pos[l][i].type != "blank"){
                    for(let dx=-1; dx<=1; dx++){
                        if(l == 0 && dx == -1){dx+=1}
                        else if(l == 9 && dx == 1){break}
                        for(let dy=-1; dy<=1; dy++){
                            if(i == 0 && dy == -1){dy+=1}
                            else if(i == 9 && dy == 1){break}
            
                            if(pos[l+dx][i+dy] != pos[l][i]){
                                if(pos[l+dx][i+dy].type=="home"){
                                    homes+=1
                                }
                                else if(pos[l+dx][i+dy].type=="shop"){
                                    shops+=1
                                }
                                else if(pos[l+dx][i+dy].type=="wood" || pos[l+dx][i+dy].type=="mine" ){
                                    works+=1
                                }
                            }
                            if(pos[l+dx][i+dy].boost.includes("ore")){
                                ores+=1
                            }
                            if(pos[l+dx][i+dy].boost.includes("tree")){
                                trees+=1
                            }
                        }
                    }
                }
                if(pos[l][i].type == "home"){
                    if(shops > 0){
                        happy += 1
                    }
                    if(homes > 2){
                        happy += 1
                    }
                    if(works > 0){
                        happy += 1
                    }
                }
                else if(pos[l][i].type == "shop"){
                    if(shops == 1){
                        happy += 1
                    }
                    if(homes > 1){
                        happy += 1
                    }
                    if(homes > 3){
                        happy += 1
                    }
                }
                else if(pos[l][i].type == "wood"){
                    if(homes > 0){
                        happy += 1
                    }
                    if(homes > 3 && trees > 1){
                        happy += 1
                    }
                    if(trees > 0){
                        happy += 1
                    }
                }
                else if(pos[l][i].type == "mine"){
                    if(homes > 0){
                        happy += 1
                    }
                    if(homes > 3 && ores > 1){
                        happy += 1
                    }
                    if(ores > 0){                            
                        happy += 1
                    }
                }    
                pos[l][i].happy = happy
                if(happyness == true){
                    if(pos[l][i].type != "blank"){
                        switch (happy){
                            case 0:
                                document.getElementById(pos[l][i].pos).style.backgroundColor = "#f00"
                            break;
                            case 1:
                                document.getElementById(pos[l][i].pos).style.backgroundColor = "#a40"
                            break;
                            case 2:
                                document.getElementById(pos[l][i].pos).style.backgroundColor = "#4a0"
                            break;
                            case 3:
                                document.getElementById(pos[l][i].pos).style.backgroundColor = "#0f0"
                            break;
                        }
                    }
                }
            }
        }
    }, 100);
}


setInterval(() => {
    stats.people = 0
    for(let l=0; l<pos.length; l++){
        for(let i=0; i<pos[l].length; i++){
            switch (pos[l][i].type){
                case "shop":
                    stats.gold += 1+(pos[l][i].happy/2)
                break;
                case "mine":
                    stats.stone += 1+(pos[l][i].happy/2)
                break;
                case "wood":
                    stats.wood += 1+(pos[l][i].happy/2)
                break;
                case "home":
                    stats.people += 2+(2*(pos[l][i].happy/2))
                break;
            }
        }
    }
    document.getElementById("gold").innerText = parseInt(stats.gold)
    document.getElementById("people").innerText = parseInt(stats.people)
    document.getElementById("timber").innerText = parseInt(stats.wood)
    document.getElementById("stone").innerText = parseInt(stats.stone)
}, 1000);