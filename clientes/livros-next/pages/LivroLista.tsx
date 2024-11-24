import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import clsx from "clsx"; // Biblioteca para combinar classes
import Livro from "@/classes/modelo/Livro";
import Head from "next/head";
import { LinhaLivro } from "@/componentes/LinhaLivro";
import { Menu } from "@/componentes/Menu";
import ControleLivro from "@/classes/controle/ControleLivros"; // Substituir pelo novo ControleLivros

// b. Adicionar instância de ControleLivros
const controleLivros = new ControleLivro();

const LivroLista: NextPage = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  // c. Alterar a implementação de useEffect
  useEffect(() => {
    if (!carregado) {
      controleLivros
        .obterLivros()
        .then((dados) => setLivros(dados))
        .catch((erro) => console.error("Erro ao carregar livros:", erro))
        .finally(() => setCarregado(true));
    }
  }, [carregado]);

  // d. Alterar a assinatura do método "excluir" para usar código como string
  const excluir = (codigo: string) => {
    // e. Alterar a implementação de "excluir" para usar "then" no controlador
    controleLivros
      .excluir(codigo)
      .then(() => setCarregado(false))
      .catch((erro) => console.error("Erro ao excluir livro:", erro));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Catálogo Next</title>
        <meta name="description" content="Aplicativo de gestão de livros" />
      </Head>
      <Menu />
      <main className={styles.principal}>
        <h1 className="h1 mt-3">Catálogo</h1>
        <table
          className={clsx(styles.tabela, "table", "table-striped", "table-hover")}
        >
          <thead className={clsx(styles.cabecalhoTabela, "table-dark")}>
            <tr>
              <th className="col-3" scope="col">Título</th>
              <th className="col-5" scope="col">Resumo</th>
              <th className="col-2" scope="col">Editora</th>
              <th className="col-2" scope="col">Autores</th>
            </tr>
          </thead>
          <tbody className={clsx(styles.tabelaCorpo, "table-group-divider")}>
            {livros.map((liv, index) => (
              <LinhaLivro key={index} livro={liv} excluir={excluir} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
