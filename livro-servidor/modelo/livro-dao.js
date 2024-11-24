/* Controlador para o gerenciamento de dados para o modelo 'Livro' (Padrão Facade) */

// Importa o modelo Livro
const Livro = require('./livro-schema');

// Função para obter todos os livros
const obterLivros = async () => {
  try {
    return await Livro.find();
  } catch (erro) {
    console.error('Erro ao obter livros:', erro);
    throw erro;
  }
};

// Função para incluir um novo livro
const incluir = async (livro) => {
  try {
    return await Livro.create(livro);
  } catch (erro) {
    console.error('Erro ao incluir livro:', erro);
    throw erro;
  }
};

// Função para excluir um livro por código (_id)
const excluir = async (codigo) => {
  try {
    return await Livro.deleteOne({ _id: codigo });
  } catch (erro) {
    console.error('Erro ao excluir livro:', erro);
    throw erro;
  }
};

// Exporta as funções para uso em outros arquivos
module.exports = {
  obterLivros,
  incluir,
  excluir,
};
