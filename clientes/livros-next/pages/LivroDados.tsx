import type { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import ControleEditora from "@/classes/controle/ControleEditora";
import ControleLivro from "@/classes/controle/ControleLivros"; // b. Adicionar instância de ControleLivros
import Livro from "@/classes/modelo/Livro";
import Head from "next/head";
import { Menu } from "@/componentes/Menu";

// b. Instanciar ControleLivro
const controleEditora = new ControleEditora();
const controleLivros = new ControleLivro(); // Instância do controlador de livros

interface Opcao {
  value: number;
  text: string;
}

const LivroDados: NextPage = () => {
  // Obter opções de editoras
  const opcoes: Array<Opcao> = controleEditora
    .getEditoras()
    .map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));

  // Estado para os campos do formulário
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  // Hook para navegação
  const router = useRouter();

  // Método para tratar alterações no combo de editoras
  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  // Método para incluir livro
  const incluir = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // c. Utilizar um texto vazio para o código
    const livro = new Livro("", codEditora, titulo, resumo, autores.split("\n"));

    // d. Chamar o método "push" apenas ao final do método "incluir"
    controleLivros
      .incluir(livro)
      .then(() => {
        router.push("/LivroLista");
      })
      .catch((erro) => {
        console.error("Erro ao incluir livro:", erro);
        alert("Erro ao incluir o livro.");
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Catálogo Next</title>
        <meta name="description" content="Aplicativo de gestão de livros" />
      </Head>
      <Menu />
      <main className="container d-flex justify-content-center">
        <div className="col-md-8">
          <h1 className="h1 mt-3">Dados do Livro</h1>
          <form onSubmit={incluir} className="text-start">
            <div className="mb-3">
              <label className="form-label" htmlFor="titulo">
                Título:
              </label>
              <input
                className="form-control"
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="resumo">
                Resumo:
              </label>
              <input
                className="form-control"
                type="text"
                id="resumo"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="codEditora">
                Editora:
              </label>
              <select
                className="form-select"
                id="codEditora"
                value={codEditora}
                onChange={tratarCombo}
                required
              >
                {opcoes.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="autores">
                Autores (um por linha):
              </label>
              <textarea
                className="form-control"
                id="autores"
                value={autores}
                onChange={(e) => setAutores(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Salvar Dados
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LivroDados;
