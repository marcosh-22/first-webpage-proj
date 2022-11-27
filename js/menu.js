//Importar default.js
import { scrollToElement } from "./default.js";

//Pegar os botões do navSlider
var navButtons = document.getElementById("navSlider").children[0].children;

//Definir evento de clique para cada botão
var func = function(e) {
    //Pegar o elemento que foi clicado
    var target = e.target;

    //Procurar pela tag LI do elemento clicado
    while (target.tagName != "LI") {
        //Pegar o elemento pai do elemento atual
        target = target.parentElement;
    }

    //Pegar classes do elemento clicado
    var classes = target.classList;

    //Verificar se não tem a classe active
    if (!classes.contains("active")) {
        //Pegar o elemento ativo
        var active = document.getElementsByClassName("active")[0];
        //Ajustar imagem do elemento ativo
        active.children[0].src = "./img/slideicons/" + active.id + ".png";
        //Remover a classe active do elemento ativo
        active.classList.remove("active");
        //Adicionar a classe active ao elemento clicado
        classes.add("active");

        //Pegar o id do elemento clicado
        var id = target.id;
        //Ajustar imagem ao elemento clicado
        target.children[0].src = "./img/slideicons/" + id + "-active.png";

        scrollToElement(target)

        //Pegar o panel que deve ser mostrado
        var panel = document.getElementById(id + "panel");

        //Pegar o panel que está ativo
        var activePanel = document.getElementsByClassName("activePanel")[0];
        //Remover a classe activePanel do panel ativo
        activePanel.classList.remove("activePanel");

        //Adicionar a classe activePanel ao panel que deve ser mostrado
        panel.classList.add("activePanel");
    }
};

//Pegar cada botão e adicionar evento de clique
for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", func);
    //Definir evento de clique em todos os childrens
    for (let j = 0; j < navButtons[i].children.length; j++) {
        navButtons[i].children[j].addEventListener("click", func);
    }
}