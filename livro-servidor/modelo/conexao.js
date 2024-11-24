/* Estabelecimento de conexão com a database 'livraria' dentro do SGBD MongoDB */


// Importa a biblioteca Mongoose
const banco = require('mongoose');

// Define as opções de conexão
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Conecta ao banco de dados MongoDB usando a URI de conexão
banco.connect('mongodb://localhost:27017/livraria', options)
  .then(() => console.log("Conexão com a base de dados 'livraria' no MongoDB estabelecida!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Exporta a conexão para ser usada em outros arquivos
module.exports = banco;
