function Position(y, x){
    this.pos = y+"-"+x;
    this.y = y;
    this.x = x;
    this.name = "none";
    this.hp = 100
    this.dmg = 100
}
Position.prototype.element = function(){
    return document.getElementById(this.pos);
}

function Enemy(y, num, type, hp, dmg, speed, dif){
    this.line = y;
    this.id = type+"_"+num
    this.type = type;
    this.hp = hp*dif;
    this.dmg = dmg*dif;
    this.speed = speed*dif;
    this.pos = 20
}
Enemy.prototype.info = function(){
    return (this.type+" | HP: "+this.hp+" | DMG: "+this.dmg+" | SP: "+this.speed);
}


Enemy.prototype.move = function(){
    var ths = this;
    var move = setInterval(()=>{
        let unit = pos[ths.line][parseInt(ths.pos/2)]
        if((ths.pos/2) < 0){
            document.getElementById(ths.id).remove()
            console.log("koniec!")
            ths.pos = 100
            return clearInterval(move)
        }
        else if(ths.pos <= 19 && unit.name != "none"){
            setTimeout(()=>{
                unit.name = "none"
                document.getElementById(unit.pos).style.backgroundColor = "#00000000"
            }, ((unit.hp)/2-ths.dmg)*20)
        }
        else{
            document.getElementById(ths.id).style.left = ths.pos-((ths.speed)/250)+"cm"
            ths.pos -= (ths.speed)/250
        }
    }, 10)
}


function EnemyTemplate(num){
    const enemies = []
    return enemies[num]
}

var [pos, now_use] = [[], "mine"];


function grid(row, col){
    document.getElementById("grid").style.gridTemplateRows='repeat('+row+', min-content)'
    document.getElementById("grid").style.gridTemplateColumns='repeat('+(col+1)+', min-content)'
    document.getElementById("units").style.width = (col*2.25)+"cm"

    for(let y=0; y<row; y++){
        var posx = [];
        for(let x=0; x<col; x++){
            posx.push(new Position(y, x))
            document.getElementById("grid").innerHTML += '<div class="tile" id="'+y+'-'+x+'" onclick="set(this)"></div>'
        }
        pos.push(posx)
        document.getElementById("grid").innerHTML += 
        '<div id="enemy'+y+'" class="line"></div>'
    }
}
grid(5, 10)

function select(ths){
    var select = document.getElementsByClassName("select");
    for(let i=0;i<select.length;i++){
        select[i].style.backgroundColor = "#666";
    }
    now_use = ths.id
    ths.style.backgroundColor = "#888"

}
function set(ths){
    var [y, x] = [(ths.id).split('-')[0], (ths.id).split('-')[1]]
    if(now_use == "delete"){
        pos[y][x].name = "none"
        ths.style.backgroundColor = "#00000000"
    }
    if(pos[y][x].name == "none"){
        pos[y][x].name = now_use
        switch (now_use){
            case "mine":
                pos[y][x].hp = 100
                pos[y][x].dmg = 0
                pos[y][x].speed = 0
                ths.style.backgroundColor = "yellow"
            break
            case "ballista":
                pos[y][x].hp = 75
                pos[y][x].dmg = 150
                pos[y][x].speed = 0
                ths.style.backgroundColor = "orange"
            break
            case "archer":
                pos[y][x].hp = 100
                pos[y][x].dmg = 25
                pos[y][x].speed = 150
                ths.style.backgroundColor = "red"
            break
            case "wizard":
                pos[y][x].hp = 75
                pos[y][x].dmg = 75
                pos[y][x].speed = 75
                ths.style.backgroundColor = "purple"
            break
            case "sheald":
                pos[y][x].hp = 500
                pos[y][x].dmg = 0
                pos[y][x].speed = 0
                ths.style.backgroundColor = "blue"
            break
            case "trap":
                pos[y][x].hp = 50
                pos[y][x].dmg = 1000
                pos[y][x].speed = 5
                ths.style.backgroundColor = "green"
            break
            //ths.backgroundImage = "url(./"+now_use+".png)"
        }
    }
}

var eNum = 0;
function summon(r, w){
    console.log(r)
    if(r == undefined){
        r = Math.floor(Math.random()*5);
    }
    if(w == undefined){
        w = Math.floor(Math.random()*3);
    }
    let line = "enemy"+r
    let eT = EnemyTemplate(w);
    let e = new Enemy(r, eNum, eT[0],eT[1],eT[2],eT[3], 1)
    pos[r].push(e)
    document.getElementById(line).innerHTML += '<div id="'+e.id+'" class="enemy '+eT[0]+'"></div>'
    e.move()
    eNum++
}