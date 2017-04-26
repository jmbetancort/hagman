var word;
var clues;
var letselect=[];
var numlives=5;
$(document).ready(function () {
    $('.modegame').change(listenerRadioButton);
});
function listenerRadioButton(){
    if($('#multi').prop("checked")==true){
        $(".loaduser:last-child").prepend('<input class="filmIntroduced" type="text"><br>');
    } else {
        $(".filmIntroduced").remove();
    }
}
function autogame(){
    var terms = ["game","food","stars","war","love"];
    var a = parseInt(Math.random()*(terms.length));
    searchfilm(terms[a]);
}
/*function manualgame(){

}*/
function searchfilm(namesearch){
    $.getJSON("https://omdbapi.com?s="+namesearch+"&type=movie").then(function(response){ 
        $a = parseInt(Math.random()*(response.Search.length));
        $film = response.Search[$a];
        $titlefilm = $film.Title;
        generateclues($titlefilm);
    });
}
function generateclues(title){
    $.getJSON("https://omdbapi.com?t="+title).then(function(response){ 
        $director = response.Director;
        $year = response.Year;
        $genre = response.Genre;
        loadgame(title,$director,$year,$genre);
    });
}
function loadgame(title,cluedirector,clueyear,cluegenre){
    word = title.toLowerCase();
    clues = [cluedirector, clueyear, cluegenre];
    $(".user").css("display","none");
    $(".game").css("visibility", "visible");
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
    for(i=0;i<title.length;i++){
        mip=document.createElement("p");
        if(title[i]== " "){
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
}
function selection(letter){
    var let = letter.target.innerHTML;
    var act = true;
    for(i=0;i<letselect.length;i++){
        if(letselect[i]==let){
            act = false;
        }
    }
    if (act==true){
        $("#"+let).addClass("letterselection");
        $("#"+let).removeClass("letter");
        var livelost = true;
        var strword = [];
        var gamewon = true;
        for(i=0;i<word.length;i++){
            if(let==word[i]){
                $("#p"+i).html(let);
                livelost = false;
            }
        }
        var $comp = $(".letterword");
        for(i=0;i<$comp.length;i++){
            strword.push($comp[i].innerHTML);
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
        if (livelost == true){
            alert("La letra pulsada no se encuentra en la palabra, HAS PERDIDO UNA VIDA");
            document.getElementById("live"+(numlives-1)).remove();
            numlives = numlives - 1;
            if(numlives<4 && numlives>=1){
                $writeclue = $(".clues");
                $writeclue.append("<p>"+clues[(numlives-1)]+"</p>");
            }
            document.querySelector(".anim").innerHTML = "";
            miimg = document.createElement("img");
            miimg.setAttribute("src", "Ahorcado"+numlives+".png");
            miimg.setAttribute("width", "200px");
            miimg.setAttribute("height", "200px");
            document.querySelector(".anim").appendChild(miimg);
        }
        if(numlives==0){
            $(".clues").empty();
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
    letselect.push(let);
}
