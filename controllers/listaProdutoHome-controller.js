import { produtoService } from "../services/produto-services.js";

const novoProduto = (url, nome, preco, categoria, descricao, id) => {
    const card = document.createElement('div');
    const conteudo = `
    <div class="produto">
        <img class="produto__imagem" src="${url}" alt="">
        <p class="produto__nome">${nome}</p>
        <p class="produto__preco">R$ ${parseFloat(preco.replace(',', '.')).toFixed(2).replace('.', ',')}</p>
        <a href="#" class="produto__link">Ver produto</a>
    </div>
    `
    card.innerHTML = conteudo;
    card.dataset.id = id;
    return card;
}

const produtosContainerStarWars = document.querySelector('[data-produtos="starWars"]');
const produtosContainerConsoles = document.querySelector('[data-produtos="consoles"]');
const produtosContainerDiversos = document.querySelector('[data-produtos="diversos"]');

const render = async () => {
    try {
        const listaProdutos = await produtoService.listaProduto();
        listaProdutos.forEach(elemento => {
            if(elemento.categoria.toUpperCase() === 'STAR WARS' || elemento.categoria.toUpperCase() === 'STARWARS') {
                produtosContainerStarWars.appendChild(novoProduto(elemento.url, elemento.nome, elemento.preco, elemento.categoria, elemento.descricao, elemento.id));
            } else if(elemento.categoria.toUpperCase() === 'CONSOLES') {
                produtosContainerConsoles.appendChild(novoProduto(elemento.url, elemento.nome, elemento.preco, elemento.categoria, elemento.descricao, elemento.id));
            } else {
                produtosContainerDiversos.appendChild(novoProduto(elemento.url, elemento.nome, elemento.preco, elemento.categoria, elemento.descricao, elemento.id));
            }
        });
    }
    catch(erro) {
        console.log(erro);
    }
};

render();