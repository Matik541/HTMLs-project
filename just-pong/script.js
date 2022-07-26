const p1 = {
    "y" : 300, 
    "size" : 1,
    "speed" : 1.5,
    "p" : 0,
    "ai" : false
}
const p2 = {
    "y" : 300, 
    "size" : 1,
    "speed" : 1.5,
    "p" : 0,
    "ai" : false
}
const ball = {
    "y" : 340,
    "x" : 490,
    "speed" : 10,
    "kierunek_x" : 1,
    "kierunek_y" : 1,
    "kat" : 1,
    "rev_kat" : 1,
}
const game = {
    "rounds" : 0,
    "max_rounds" : 3,
    "end" : 'true',
    "to_end" : '',
    "mode" : 0,
    "time" : 0,
}
var t = 0
var sec = 0
var min = 0

var odbij1 = 0
var kierunek1 = 1

var odbij2 = 0
var kierunek2 = 1
ref()

var lvl = document.getElementById("lvl").value*1
function level(){
    lvl = document.getElementById("lvl").value*1
    if(p1.ai){
        document.getElementById("p1ai").innerHTML = "AI lvl:"+(lvl+1)
    }
    if(p2.ai){
        document.getElementById("p2ai").innerHTML = "AI lvl:"+(lvl+1)
    }
}

function ball_move(){
    setTimeout(() => {
        t += 10
        if(game.mode == 2){
            if(game.time <= t)game_end() 
            sec = ((parseInt((game.time-t)/1000)%60))
            min = ((parseInt(((game.time-t)/1000)/60)%60))
            if(sec<10 && sec>0){sec="0"+sec}
            if(sec<1){sec="00"}
            document.getElementById("sec").innerText = sec
            document.getElementById("min").innerText = min
        } 
        else{
            sec = (parseInt(t/1000)%60)
            if(sec<10 && sec>0)sec="0"+sec
            if(sec<1)sec="00"
            min = (parseInt((t/1000)/60)%60)
            document.getElementById("sec").innerText = sec
            document.getElementById("min").innerText = min
        }

        ball.x+=1*(ball.speed/10)*ball.kierunek_x*ball.kat
        ball.y+=1*(ball.speed/10)*ball.kierunek_y*ball.rev_kat    
        document.getElementById("ball").style.marginTop = ball.y+"px"
        document.getElementById("ball").style.marginLeft = ball.x+"px"

        //zdobywanie
        if(ball.x >= 990){
            p1.p += 1
            ref()
        }
        else if(ball.x <= 0){
            p2.p += 1
            ref()
        }
        
        //odbijają gracze
        if(ball.x >= 950 && ball.x <= 980 && (ball.y >= p2.y*p2.size && ball.y <= (p2.y+100)*p2.size)){
            ball.kierunek_x = -1
            if(ball.kat >= 1){
                ball.kat -= Math.floor(Math.random()*5)/10
                ball.rev_kat = 2-ball.kat
            }
            else{
                ball.kat += Math.floor(Math.random()*5)/10
                ball.rev_kat = 2-ball.kat
            }
            ball.speed += 1
        }
        else if(ball.x <= 30 && ball.x >= 10 && (ball.y >= p1.y*p1.size && ball.y <= (p1.y+100)*p1.size)){
            ball.kierunek_x = 1
            if(ball.kat >= 1){
                ball.kat -= Math.floor(Math.random()*5)/10
                ball.rev_kat = 2-ball.kat
            }
            else{
                ball.kat += Math.floor(Math.random()*5)/10
                ball.rev_kat = 2-ball.kat
            }
            ball.speed += 1 
        }
        if(ball.speed > 100){ball.speed = 100}
        document.getElementById("ball_speed").innerText = ball.speed/10
        
        //odbijanie od ścian
        if(ball.y <= 0){
            ball.kierunek_y = 1
        }
        else if(ball.y >= 680){
            ball.kierunek_y = -1
        }

        if(p2.ai){
            switch (lvl){
                case 0:
                if(odbij2 == 0){
                        kierunek2 = kierunek2 *-1
                        odbij2 = Math.floor(Math.random()*50)+50
                    }
                    --odbij2
                    if(kierunek2 == 1){
                        p2.y += 20
                    }
                    else{
                        p2.y -= 20
                    }
                break;
                case 1:
                    if(kierunek2 == 1){
                        p2.y += 20
                    }
                    else{
                        p2.y -= 20
                    }
                break
                case 2:
                    p2.y = ball.y-50
                break;
            }
            if(p2.y < 0){
                p2.y = 0
                kierunek2 = 1
            }
            else if(p2.y > 600){
                p2.y = 600
                kierunek2 = 0
            }
            document.getElementById("p2").style.marginTop = p2.y+"px"
        }

        if(p1.ai){
            switch (lvl){
                case 0:
                    if(odbij1 == 0){
                        kierunek1 = kierunek1 *-1
                        odbij1 = Math.floor(Math.random()*50)+50
                    }
                    --odbij1
                    if(kierunek1 == 1){
                        p1.y += 20
                    }
                    else{
                        p1.y -= 20
                    }
                break;
                case 1:
                    if(kierunek1 == 1){
                        p1.y += 20
                    }
                    else{
                        p1.y -= 20
                    }
                break
                case 2:
                    p1.y = ball.y-50
                break;
            }
            if(p1.y < 0){
                p1.y = 0
                kierunek1 = 1
            }
            else if(p1.y > 600){
                p1.y = 600
                kierunek1 = 0
            }
            document.getElementById("p1").style.marginTop = p1.y+"px"
        }

        if(game.end == 'false'){
            ball_move()
        }
    }, 10);
}

document.addEventListener('keydown', (event) =>{
    if(event.key == ' '){
        if(game.end == 'true'){
            game.end = 'false';
            game.time = (document.getElementById("points").value*60*1000);
            setTimeout(() => {
                document.getElementById("panel").style.animation = "hide 0.5s 1"
                document.getElementById("panel").style.opacity = 0
                setTimeout(() =>{
                    ball_move()
                }, 550)
            }, 100)
        }
    }
     
    if(event.key == 'w' && p1.ai == false){
        p1.y -= (10*p1.speed)
    }
    else if(event.key == 's' && p1.ai == false){
        p1.y += (10*p1.speed)
    }
    if(event.key == 'ArrowUp' && p2.ai == false){
        p2.y -= (10*p1.speed)
    }
    else if(event.key == 'ArrowDown' && p2.ai == false){
        p2.y += (10*p1.speed)
    }

    if(p1.y < 0){
        p1.y = 0
    }
    else if(p1.y > 600){
        p1.y = 600
    }
    if(p2.y < 0){
        p2.y = 0
    }
    else if(p2.y > 600){
        p2.y = 600
    }
    document.getElementById("p1").style.marginTop = p1.y+"px"
    document.getElementById("p2").style.marginTop = p2.y+"px"
});

function ref(){
    var points = document.getElementById("points").value*1
    switch (game.mode){
        case 0:
            if(game.rounds == game.max_rounds)game_end()
        break;
        case 1:
            if(p1.p == p2.p+points || p2.p == p1.p+points)game_end()
        break;  
    }
    
    game.rounds += 1
    ball.speed = 10
    p1.y = 300
    p2.y = 300
    document.getElementById("p1").style.marginTop = p1.y+"px"
    document.getElementById("p2").style.marginTop = p2.y+"px"

    ball.y = 340
    ball.x = 490
    ball.rev_kat = Math.floor(Math.random()*15)/10 
    ball.kat = 2 - ball.rev_kat
    ball.kierunek_x = (Math.floor(Math.random()*2)?'-1':' 1')*1;
    ball.kierunek_y = (Math.floor(Math.random()*2)?'-1':' 1')*1;

    document.getElementById("p1_p").innerText = p1.p
    document.getElementById("p2_p").innerText = p2.p
    document.getElementById("ball_speed").innerText = ball.speed/10
}
function to_win(){
    let mode = document.getElementById("mode").value*1
    let tip;
    let points = document.getElementById("points").value*1
    game.mode = mode
    switch (mode){
        case 0:
            if(points <= 0){
                points = 1
                tip = 'no less than 1'
            }
            game.max_rounds = points
            if(points%2==1){
                game.to_end = 'the match has '+points+' rounds, then the game is over and one of the players wins'
                tip = "default game";
            }
            else{
                game.to_end = 'the match has '+points+' rounds, then the game is over. for an even number of rounds it can be a tie!'
                tip = 'even number of rounds it can be a tie!'
            }
        break;
        case 1:
            if(points <= 0){
                points = 1
                tip = 'no less than 1'
            }
            game.to_end = 'the match has no round limit. the game ends when one player has '+points+' points more than the other player'
            tip = 'be cearful with points'
        break;
        case 2:
            game.to_end = 'the match has no round limit. the game ends when playtime reaches 0'
            tip = 'time in minuts'
        break;
        case 3:
            document.getElementById("points").value = ""
            game.to_end = 'the match has no round limit. the game never ends!'
            tip = "It's will be a L-O-N-G match..."
            points = 0
        break;
    }
    document.getElementById("tip").innerText = tip
    document.getElementById("points").value = points
    document.getElementById("end").innerText = game.to_end
}
function game_end(){
    document.getElementById("settings").style.opacity = 0
    document.getElementById("AI").style.opacity = 0
    document.getElementById("lose").style.display = 'block'
    document.getElementById("panel").style.animation = "show 0.5s 1"
    document.getElementById("panel").style.opacity = 1
    game.end = 'true'
    if(p1.p>p2.p){
        document.getElementById("win").innerHTML = '<span style="font-size: 30px; font-weight: bold;">Winner:</span><p><span style="font-weight: bold; margin-top: -20px; color: blue; text-shadow: white 1px 1px 0px, white -1px 1px 0px, white -1px -1px 0px, white 1px -1px 0px ;">Player1</span></p><p>Points: '+p1.p+'</p>'
        document.getElementById("lose").innerHTML = '<span style="font-size: 30px; font-weight: bold;">Loser:</span><p><span style="font-weight: bold; margin-top: -20px; color: red; text-shadow: white 1px 1px 0px, white -1px 1px 0px, white -1px -1px 0px, white 1px -1px 0px ;">Player2</span></p><p>Points: '+p2.p+'</p>'
        document.getElementById("win").style.display = "block"
        document.getElementById("lose").style.display = "block"
        document.getElementById("tie").style.display = "none"
    }
    else if(p1.p<p2.p){
        document.getElementById("win").innerHTML = '<span style="font-size: 30px; font-weight: bold;">Winner:</span><p><span style="font-weight: bold; margin-top: -20px; color: red; text-shadow: white 1px 1px 0px, white -1px 1px 0px, white -1px -1px 0px, white 1px -1px 0px ;">Player2</span></p><p>Points: '+p2.p+'</p>'
        document.getElementById("lose").innerHTML = '<span style="font-size: 30px; font-weight: bold;">Loser:</span><p><span style="font-weight: bold; margin-top: -20px; color: blue; text-shadow: white 1px 1px 0px, white -1px 1px 0px, white -1px -1px 0px, white 1px -1px 0px ;">Player1</span></p><p>Points: '+p1.p+'</p>'
        document.getElementById("win").style.display = "block"
        document.getElementById("lose").style.display = "block"
        document.getElementById("tie").style.display = "none"
    }
    else if(p1.p == p2.p){
        document.getElementById("win").style.display = "none"
        document.getElementById("lose").style.display = "none"
        document.getElementById("tie").style.display = "block"
        document.getElementById("tie").innerHTML = '<span style="font-size: 30px; font-weight: bold;">This game is a TIE!</span><p><span style="font-weight: bold; margin-top: -20px; color: blue; text-shadow: white 1px 1px 0px, white -1px 1px 0px, white -1px -1px 0px, white 1px -1px 0px ;">Player1</span> and <span style="font-weight: bold; margin-top: -20px; color: red; text-shadow: white 1px 1px 0px, white -1px 1px 0px, white -1px -1px 0px, white 1px -1px 0px ;">Player2</span></p>have a same number of points!<p>P1: '+p1.p+' | P2: '+p2.p+'</p>'
    }
    setTimeout(() => {
        window.location.reload()
    }, 5000)
}         
function p1_ai(){
    p1.ai = document.getElementById("p1_AI").checked
    if(p1.ai){
        document.getElementById("p1ai").innerHTML = "AI lvl:"+(lvl+1)
    }
    else{
        document.getElementById("p1ai").innerHTML = "playable"
    }
}
function p2_ai(){
    p2.ai = document.getElementById("p2_AI").checked
    if(p2.ai){
        document.getElementById("p2ai").innerHTML = "AI lvl:"+(lvl+1)
    }
    else{
        document.getElementById("p2ai").innerHTML = "playable"
    }
}