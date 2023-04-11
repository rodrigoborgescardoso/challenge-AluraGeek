import { produtoService } from "../services/produto-services.js";

const novoProduto = (url, nome, preco, categoria, descricao, id) => {
    const card = document.createElement('div');
    const conteudo = `
    <div class="produto">
        <div class="produto__botoes">
            <button class="produto__delete produto__botao-imagem"></button>
            <button class="produto__edit produto__botao-imagem" onclick="window.location.href='../screens/atualiza-produto.html?id=${id}'"></button>
        </div>
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

const produtosContainer = document.querySelector('[data-produtos]');

produtosContainer.addEventListener('click', async (evento) => {
    let botaoDeletar = evento.target.className === 'produto__delete produto__botao-imagem';
    if(botaoDeletar) {
        try {
            const produto = evento.target.closest('[data-id]');
            let id = produto.dataset.id;
            await produtoService.removeProduto(id);
            produto.remove();
        }
        catch(erro) {
            console.log(erro);
        }
    }
});

const render = async () => {
    try {
        const listaProdutos = await produtoService.listaProduto();
        listaProdutos.forEach(elemento => {
            produtosContainer.appendChild(novoProduto(elemento.url, elemento.nome, elemento.preco, elemento.categoria, elemento.descricao, elemento.id));
        });
    }
    catch(erro) {
        console.log(erro);
    }
};

render();