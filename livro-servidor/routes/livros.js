/* Roteamento (Express) */

// Importa as funções do DAO
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

// Importa a biblioteca Express
const express = require('express');

// Cria o roteador
const router = express.Router();

/**
 * Rota GET: Obtém todos os livros
 * URL: "/livros"
 */
router.get('/', async (req, res) => {
  try {
    const livros = await obterLivros();
    res.json(livros);
  } catch (erro) {
    console.error('Erro ao obter livros:', erro);
    res.status(500).json({ mensagem: 'Erro ao obter livros.' });
  }
});

/**
 * Rota POST: Inclui um novo livro
 * URL: "/livros"
 * Corpo da requisição: { _id, titulo, codEditora, resumo, autores }
 */
router.post('/', async (req, res) => {
  try {
    const livro = req.body;
    await incluir(livro);
    res.status(201).json({ mensagem: 'Livro incluído com sucesso.' });
  } catch (erro) {
    console.error('Erro ao incluir livro:', erro);
    res.status(500).json({ mensagem: 'Erro ao incluir livro.' });
  }
});

/**
 * Rota DELETE: Exclui um livro pelo ID
 * URL: "/livros/:id"
 * Parâmetro: id (identificador único do livro)
 */
router.delete('/:id', async (req, res) => {
  try {
    const codigo = req.params.id;
    const resultado = await excluir(codigo);

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    res.json({ mensagem: 'Livro excluído com sucesso.' });
  } catch (erro) {
    console.error('Erro ao excluir livro:', erro);
    res.status(500).json({ mensagem: 'Erro ao excluir livro.' });
  }
});

// Exporta o roteador
module.exports = router;
