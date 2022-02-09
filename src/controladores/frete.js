const bancoDeDados = require('../bancodedados/produtos');
const { getStateFromZipcode } = require('utils-playground');


const todosProdutos = (req, res) => {
    return res.status(200).json(bancoDeDados);
}

const produtoId = (req, res) => {
    const { id } = req.params;

    if(!Number(id)){
        return res.status(400).json({
            mensagem: 'O id não é um número valido'
        })
    }
    const produto = bancoDeDados.find((produto) => {
        return produto.id === Number(id);
    })

    if(!produto){
        return res.status(400).json({
            mensagem: 'Não existe produto neste ID'
        })
    }

    return res.status(200).json(produto);
}

const valorFrete = async (req, res) => {
    const { id, cep } = req.params

    const produto = bancoDeDados.find((produto) => {
        return produto.id === Number(id);
    })

    const cepInformado = await getStateFromZipcode(cep)
    let valorDoFrete;
    
    if(cepInformado === "BA" || cepInformado === "SE" || cepInformado === "AL" || cepInformado === "PE" || cepInformado === "PB"){
            valorDoFrete = produto.valor * 0.1
    }

    else if(cepInformado === "SP" || cepInformado === "RJ"){
        valorDoFrete = produto.valor * 0.15
    }

    else{
        valorDoFrete = produto.valor * 0.12
    }

    return res.status(200).json({
        produto: produto,
        cep: cepInformado,
        frete: valorDoFrete
    });


}



module.exports = {
    todosProdutos,
    produtoId,
    valorFrete
}