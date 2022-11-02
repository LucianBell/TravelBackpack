const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (element) => {
    criaElemento(element);
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const existe = itens.find(element => element.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = ""
    quantidade.value = ""
})  

function criaElemento(itemAtual) {
    
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = itemAtual.quantidade;
    numeroItem.dataset.id = itemAtual.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += itemAtual.nome;

    novoItem.appendChild(botaoDeletar(itemAtual.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(itemAtual) {
    document.querySelector("[data-id='"+itemAtual.id+"']").innerHTML = itemAtual.quantidade;
}

function botaoDeletar(id) {
    const elementBotao = document.createElement("button");
    elementBotao.innerText = "X"

    elementBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}