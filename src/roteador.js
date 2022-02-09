const express = require('express');
const { todosProdutos, produtoId, valorFrete } = require('./controladores/frete');


const rotas = express();


rotas.get('/produtos', todosProdutos);
rotas.get('/produtos/:id', produtoId);
rotas.get('/produtos/:id/frete/:cep', valorFrete)






module.exports = rotas