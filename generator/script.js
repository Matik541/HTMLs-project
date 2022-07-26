document.getElementById("preview").addEventListener("change",
 function preview(){
    document.getElementById("imgh").innerHTML = '<img id="frameh" alt="Your IMG" width="auto" height="100%">'
    document.getElementById("framev").src=URL.createObjectURL(event.target.files[0]);
    document.getElementById("frameh").src=URL.createObjectURL(event.target.files[0]);
    document.getElementById("framev").style.right = 0
    document.getElementById("frameh").style.right = 0

    setTimeout(() => {
        var x = document.getElementById("frameh")
        document.getElementById("offset").value = 0
        document.getElementById("offset").max = (x.clientWidth/2)
        document.getElementById("offset").min = -(x.clientWidth/2)
    }, 100);
})
document.getElementById("owner").addEventListener("change",
function nick(){
    let x = document.getElementById("owner")
    document.getElementById("ownerv").innerText = "Owner: "+ x.value
    document.getElementById("ownerh").innerText = "Owner: "+ x.value
})
document.getElementById("sec").addEventListener("change",
function sec(){
    let x = document.getElementById("sec")
    document.getElementById("secv").innerText = "Security: "+ x.value
    document.getElementById("sech").innerText = "Security: "+ x.value
})
document.getElementById("code").addEventListener("change",
function code(){
    let x = document.getElementById("code")
    while(x.value.length<=2){
        x.value =  "0"+x.value
    }
    if(x.value.length>3)x.value = "000"
    document.getElementById("codev").innerText = "Code: "+x.value
    document.getElementById("codeh").innerText = "Code: "+x.value
})
{//admin
    document.getElementById("adm").addEventListener("change",
    function adm(){
        let x = document.getElementById("adm")
        document.getElementById("yourtype").innerHTML = " "
        
        if(x.value == "*Your Type*"){
            document.getElementById("yourtype").innerHTML = '<input title="Your type" placeholder="Your type" class="inputs" type="text" onchange="admin(this);"><br>'
        }
        else{
            admin(x)
        }
    })
    function admin(x){
        let adm = x.value.toUpperCase().slice(0,3)
        if(adm == "ZER"){
            adm = "002"
        }
        document.getElementById("adminv").innerText = "ADM: "+adm
        document.getElementById("adminh").innerText = "ADM: "+adm
    }
}
document.getElementById("lvl").addEventListener("change",
function lvl(){
    let x = document.getElementById("lvl")
    document.getElementById("lvlv").innerText = "Class: "+ x.value
    document.getElementById("lvlh").innerText = "Class: "+ x.value
})
document.getElementById("year").addEventListener("change", function date(){
    let mon = document.getElementById("mon").value
    let year = document.getElementById("year").value
    if(mon < 1 || mon > 12){
        mon = 1
        document.getElementById("mon").value = 1
    }
    if(mon < 10){
        mon = "0"+mon
    }
    if(year < 21 || year > 99){
        year = 21
        document.getElementById("year").value = 21
    }

    let date = mon+"/"+year
    document.getElementById("validv").innerText = "Valid: "+date
    document.getElementById("validh").innerText = "Valid: "+date
})
document.getElementById("mon").addEventListener("change", function date(){
    let mon = document.getElementById("mon").value
    let year = document.getElementById("year").value
    if(mon < 1 || mon > 12){
        mon = 1
        document.getElementById("mon").value = 1
    }
    if(mon < 10){
        mon = "0"+mon
    }
    if(year < 21 || year > 99){
        year = 21
        document.getElementById("year").value = 21
    }

    let date = mon+"/"+year
    document.getElementById("validv").innerText = "Valid: "+date
    document.getElementById("validh").innerText = "Valid: "+date
})
document.getElementById("idcode").addEventListener("change",
function idcode(){
    let x = document.getElementById("idcode")
    x.value = x.value.toUpperCase()
    while(x.value.length<=11){
        x.value = x.value + "0"
    }
    let part1 = x.value.slice(0, 4)
    let part2 = x.value.slice(4, 8) 
    let part3 = x.value.slice(8, 12)
    document.getElementById("idv").innerText = "ID: "+part1+"-"+part2+"-"+part3
    document.getElementById("idh").innerText = "ID: "+part1+"-"+part2+"-"+part3
})
document.getElementById("ho").addEventListener("click",
function ho(){
    document.getElementById("cardh").style.display = "block"
    document.getElementById("cardv").style.display = "none"
})
document.getElementById("ver").addEventListener("click",
function ver(){
    document.getElementById("cardh").style.display = "none"
    document.getElementById("cardv").style.display = "block"
})
document.getElementById("offset").addEventListener("mousemove",
function offset(){
    let x = document.getElementById("offset")
    if(document.getElementById("framev").style.right !== ""){
        document.getElementById("framev").style.right = x.value+"px"
        document.getElementById("frameh").style.right = x.value+"px"
    }
})