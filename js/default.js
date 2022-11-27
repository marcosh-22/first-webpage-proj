//Pega todos os elementos de navegação do header
var navButtons = document.getElementById("navbuttons").children
var homebuttons = document.getElementsByClassName("home");

//Pega todos os cards
var productcard = document.getElementsByClassName("productcard");
var drinkscard = document.getElementsByClassName("drinkcard");

var menubtn_onClick = function(e) {
    //Pegar o elemento que foi clicado
    var target = e.target;
    //Pegar id do elemento clicado
    var id = target.id;
    switch(id){
        case "imperio_logo":
        case "burguer":
            window.location = "./index.html#";
            break;
        case "promo":
            scrollToElement(document.getElementById("jsbestsale"));
            break;
        case "info":
            scrollToElement(document.getElementById("jsinfo"));
            break;
    }
};

//Pegar cada botão do menu e adicionar evento de clique
for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", menubtn_onClick);
}
for (let i = 0; i < homebuttons.length; i++) {
    homebuttons[i].addEventListener("click", menubtn_onClick);
}

var originalPrice;

var card_onClick = function(e) {
    //Pegar o elemento que foi clicado
    var target = e.target;

    target = getParentByClass(target, 'productcard', 'drinkcard');
    if (target){
        let cartpopup = document.getElementsByClassName("cartconfirm")[0];
        cartpopup.style.display = "flex";

        //Pegar atributos do target
        let targetName = target.children[1].children[0].children[0];
        let targetDesc = target.children[1].children[0].children[1];
        let targetPrice = target.children[1].children[1];

        //Definir valores no popup
        document.getElementById("name").innerHTML = targetName.innerHTML;
        if (targetDesc == undefined)
            document.getElementById("desc").innerHTML = "";
        else
            document.getElementById("desc").innerHTML = targetDesc.innerHTML;
        document.getElementById("price").innerHTML = targetPrice.innerHTML;
        document.getElementById("qtdselect").value = 1;

        //Salvar preço original para uso futuro
        originalPrice = parseFloat(targetPrice.innerHTML.replace("R$", "").replace(",", "."));
    }
};

function getParentByClass(el, className, alternativeclassName) {
    do {
        if (el.classList.contains(className) || el.classList.contains(alternativeclassName)) {
            return el;
        } else {
            el = el.parentNode;
        }
    } while (el && el.parentNode)
}

//Pegar cada card e adicionar o evento de clique
for (let i = 0; i < productcard.length; i++) {
    productcard[i].addEventListener("click", card_onClick);
}
for (let i = 0; i < drinkscard.length; i++) {
    drinkscard[i].addEventListener("click", card_onClick);
}

//qtdselect onchange event
var qtdSelect = document.getElementById("qtdselect");
qtdSelect.onchange = function() {
    let price = document.getElementById("price");

    let qtd = qtdSelect.value;
    let priceValue = originalPrice * qtd;

    priceValue = priceValue.toFixed(2);
    priceValue = priceValue.replace(".", ",");

    price.innerHTML = "R$" + priceValue;
}

//Criar array com todos os cartmenu_content
var cartmenu_content_arr = [];

//cart_remove_onClick
var cart_remove_onClick = function(e) {
    //Pegar o elemento que foi clicado
    var target = e.target;
    //Pegar parente do elemento clicado
    var parent = target.parentNode;
    //Pegar parente do parente do elemento clicado
    var grandparent = parent.parentNode;
    //Excluir grandparent
    grandparent.remove();
    //Excluir do array
    cartmenu_content_arr.splice(cartmenu_content_arr.indexOf(grandparent.outerHTML), 1);
    //Excluir do localstorage
    localStorage.setItem("cartmenu_content", JSON.stringify(cartmenu_content_arr));
}

//botões de confirmações do popup
var confirmbtn_onClick = function(e) {
    //Pegar o elemento que foi clicado
    var target = e.target;
    //Pegar id do elemento clicado
    var id = target.id;
    switch(id){
        case "yes":
            //Pegar cart_productjs
            let element = document.getElementById("cart_productjs");
            let cart_productjs = element.children[0].cloneNode(true);

            //Insertir dentro do id cartmenu_content
            let cartmenu_content = document.getElementById("cartmenu_content");

            //Pegar atributos
            let name = document.getElementById("name").innerHTML;
            let price = document.getElementById("price").innerHTML;
            let qtd = document.getElementById("qtdselect").value;

            //Colocar valores no cartmenu_content
            cart_productjs.children[1].children[0].innerHTML = name;
            cart_productjs.children[1].children[1].innerHTML = price;
            cart_productjs.children[2].children[1].innerHTML = "x" + qtd;

            //Mudar foto do produto
            let img = cart_productjs.children[0];

            img.src = "./img/products/" + name.toLowerCase().replace(/\s+/g, '') + ".png";

            //Salvar html do cart_productjs no localstorage
            cartmenu_content_arr.push(cart_productjs.outerHTML);
            localStorage.setItem("cartmenu_content", JSON.stringify(cartmenu_content_arr));

            //Pegar cart_remove e adicionar evento de clique
            let cart_remove = cart_productjs.children[2].children[0];
            cart_remove.addEventListener("click", cart_remove_onClick);

            //Inserir no cartmenu_content
            cartmenu_content.appendChild(cart_productjs);
            break;
        case "no":
            break;
    }
    let cartpopup = document.getElementsByClassName("cartconfirm")[0];
    cartpopup.style.display = "none";
};

//Pagina onload
window.onload = function() {
    //Pegar cartmenu_content do localstorage
    let cartmenu_content = document.getElementById("cartmenu_content");
    let arr = JSON.parse(localStorage.getItem("cartmenu_content"));

    if (arr){
        for (let i = 0; i < arr.length; i++) {
            cartmenu_content.innerHTML += arr[i];
            cartmenu_content_arr.push(arr[i]);
        }
        //Pegar todos os cart_remove e adicionar evento de clique
        let cart_remove = document.getElementsByClassName("cart_remove");
        for (let i = 0; i < cart_remove.length; i++) {
            cart_remove[i].addEventListener("click", cart_remove_onClick);
        }
    }
}


//Pegar cada botão do menu e adicionar evento de clique
var confirmbtns = document.getElementById("confirmbtns").children;
for (let i = 0; i < confirmbtns.length; i++) {
    confirmbtns[i].addEventListener("click", confirmbtn_onClick);
}

//Pegar o botão shopping_cart e adicionar evento de clique
var shopping_cart = document.getElementById("shopping_cart");
shopping_cart.addEventListener("click", function(e) {
    let cartpopup = document.getElementById("cartmenu");
    cartpopup.style.display = cartpopup.style.display == "flex" ? "none" : "flex";
});


//Rolar suavemente até um elemento
//export => exporta função para ser usada em outros arquivos
export function scrollToElement(element) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - 110,
    });
}