//Rolar suavemente até um elemento
//export => exporta função para ser usada em outros arquivos
export function scrollToElement(element) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
    });
}