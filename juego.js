var films = ["spiderman","batman","resacon en las vegas", "iron man", "el curioso caso de benjamin button"];
a = parseInt(Math.random()*(films.length));
var word = films[a];
var numlives = 5;
var letselec = [];
document.addEventListener("DOMContentLoaded",function(){
    var abc = "abcdefghijklmnopqrstuvwxyz";
    var cuenta = 0;
    for(i=0;i<numlives;i++){
        miimg = document.createElement("img");
        miimg.setAttribute("class", "corazon");
        miimg.setAttribute("id", "live"+i);
        miimg.setAttribute("src", "live.png");
        miimg.setAttribute("width", "20px");
        miimg.setAttribute("height", "20px");
        document.querySelector(".lives").appendChild(miimg);
    }
    for (i=0;i<abc.length;i++){
        midiv= document.createElement("span");
        midiv.setAttribute("class","letter");
        midiv.setAttribute("id", abc[i]);
        midiv.innerHTML = abc[i];
        midiv.addEventListener("click",selection);
        document.querySelector(".letters").appendChild(midiv);
    }
    for(i=0;i<word.length;i++){
        mip=document.createElement("p");
        if(word[i]== " "){
            mip.innerHTML = " ";
            mip.setAttribute("id", "p"+i);
            mip.setAttribute("class", "letterword");
        } else {
            mip.innerHTML = "_";
            mip.setAttribute("id", "p"+i);
            mip.setAttribute("class", "letterword");
        }
        document.querySelector(".word").appendChild(mip);
    }

});

function selection(letra){
    var let = letra.target.innerHTML;
    var act = true;
    for(i=0;i<letselec.length;i++){
        if(letselec[i]==let){
            act = false;
        }
    }
    if (act==true){
            document.getElementById(let).classList.add("letterselection");
            document.getElementById(let).classList.remove("letter");
            var live = false;
            var strword = [];
            var gamewon = true;
            for(i=0;i<word.length;i++){
                if(let==word[i]){
                    document.getElementById("p"+i).innerHTML = let;
                    live = true;
                }
            }
            var comp = document.querySelectorAll(".letterword");
            for(i=0;i<comp.length;i++){
                strword.push(comp[i].innerHTML);
                if(strword[i]=="_"){
                    gamewon = false;
                }
            }
            if (gamewon==true){
                alert("Enhorabuena has ganado la partida!!!");
                ///añadir partida ganada
                document.querySelector(".word").innerHTML = "";
                miimg = document.createElement("img");
                miimg.setAttribute("src", "winner.png");
                miimg.setAttribute("width", "200px");
                miimg.setAttribute("height", "200px");
                document.querySelector(".word").appendChild(miimg);
            }
            if (live == false){
                alert("La letra pulsada no se encuentra en la palabra, HAS PERDIDO UNA VIDA");
                document.getElementById("live"+(numlives-1)).remove();
                numlives = numlives - 1;
                document.querySelector(".anim").innerHTML = "";
                miimg = document.createElement("img");
                miimg.setAttribute("src", "Ahorcado"+numlives+".png");
                miimg.setAttribute("width", "200px");
                miimg.setAttribute("height", "200px");
                document.querySelector(".anim").appendChild(miimg);
            }
            if(numlives==0){
                document.querySelector(".word").innerHTML = "";
                document.querySelector(".anim").innerHTML = "";
                miimgahor = document.createElement("img");
                miimgahor.setAttribute("src", "Ahorcado"+numlives+".png");
                miimgahor.setAttribute("width", "200px");
                miimgahor.setAttribute("height", "200px");
                document.querySelector(".anim").appendChild(miimgahor);
                miimg = document.createElement("img");
                miimg.setAttribute("src", "dead.png");
                miimg.setAttribute("width", "200px");
                miimg.setAttribute("height", "200px");
                document.querySelector(".word").appendChild(miimg);
                ///añadir partida perdida
            }  
        }
    letselec.push(let);
}