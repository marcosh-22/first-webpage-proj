import { scrollToElement } from "./default.js";

var navButtons = document.getElementById("navbuttons").children

var func = function(e) {
    //Pegar o elemento que foi clicado
    var target = e.target;
    //Pegar id do elemento clicado
    var id = target.id;
    switch(id){
        case "promo":
            scrollToElement(document.getElementById("jsbestsale"));
            break;
        case "info":
            scrollToElement(document.getElementById("jsinfo"));
            break;
    }
};

//Pegar cada botão e adicionar evento de clique
for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", func);
}