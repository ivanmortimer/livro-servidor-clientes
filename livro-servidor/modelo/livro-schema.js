/* Modelagem Dados de Objeto (Object Data Modeling ou ODM) */

// Importa a conexão Mongoose configurada
const banco = require('./conexao');

// Define a estrutura do esquema para a coleção "livros"
const LivroSchema = new banco.Schema({
  _id: banco.Schema.Types.ObjectId,
  titulo: { type: String, require: true },
  codEditora: { type: Number, require: true },
  resumo: { type: String },
  autores: { type: [String]},
});

// Cria o modelo "Livro" associado à coleção "livros"
const Livro = banco.model('Livro', LivroSchema, 'livros');

// Exporta o modelo "Livro"
module.exports = Livro;
