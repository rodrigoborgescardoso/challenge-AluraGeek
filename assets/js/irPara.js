export const irPara = (botao) => {
    const tipoBotao = botao.dataset.botao;
    
    if(caminho[tipoBotao]) {
        caminho[tipoBotao]();
    }
};

const caminho = {
    //login: () => window.location.href = '../screens/login.html',
    adicionarProduto: () => window.location.href = '../screens/cadastro-produto.html',
    banner: () => window.location.href = '#consoles'
};