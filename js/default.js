//Pega todos os elementos de navegação do header
var navButtons = document.getElementById("navbuttons").children
var homebuttons = document.getElementsByClassName("home");

var func = function(e) {
    //Pegar o elemento que foi clicado
    var target = e.target;
    //Pegar id do elemento clicado
    var id = target.id;
    switch(id){
        case "imperio_logo":
        case "burguer":
            window.location = "./index.html";
            break;
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
for (let i = 0; i < homebuttons.length; i++) {
    homebuttons[i].addEventListener("click", func);
}

//Rolar suavemente até um elemento
//export => exporta função para ser usada em outros arquivos
export function scrollToElement(element) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
    });
}