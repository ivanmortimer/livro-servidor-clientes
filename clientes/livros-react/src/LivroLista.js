import { useState, useEffect } from "react";
import ControleLivro from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";

var controleLivro = new ControleLivro();
var controleEditora = new ControleEditora();

function LinhaLivro(props) {
    var nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);
    var listaAutores = props.livro.autores;
    var listaAutoresHTML = listaAutores.map((autor, index) => (
        <li key={index.toString()}>{autor}</li>
    ));

    return (
        <tr key={props.index.toString()}>
            <td key="titulo">
                <p>{props.livro.titulo}</p>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => props.excluir(props.livro.codigo)}
                >
                    Excluir
                </button>
            </td>
            <td key="resumo">{props.livro.resumo}</td>
            <td key="nomeEditora">{nomeEditora}</td>
            <td key="listaAutoresHTML">
                <ul>{listaAutoresHTML}</ul>
            </td>
        </tr>
    );
}

function LivroLista() {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // a. Alterar "useEffect" para usar um modelo assíncrono com "then"
    useEffect(() => {
        if (!carregado) {
            controleLivro
                .obterLivros()
                .then((livrosObtidos) => setLivros(livrosObtidos))
                .catch((erro) => console.error("Erro ao carregar livros:", erro));
            setCarregado(true);
        }
    }, [carregado]);

    // b. Alterar o método "excluir" para usar "then" no controlador
    const excluir = (codigoLivro) => {
        controleLivro
            .excluir(codigoLivro)
            .then(() => setCarregado(false))
            .catch((erro) => console.error("Erro ao excluir livro:", erro));
    };

    return (
        <main style={{width: "100%"}}>
            <h1 className="text-start">Catálogo de Livros</h1>
            <table className="table table-striped table-hover text-start">
                <thead className="table table-dark table-hover">
                    <tr>
                        <th className="col-3" scope="col">Título</th>
                        <th className="col-5" scope="col">Resumo</th>
                        <th className="col-2" scope="col">Editora</th>
                        <th className="col-2" scope="col">Autores</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {livros.map((liv, ind) => (
                        <LinhaLivro livro={liv} excluir={excluir} index={ind} key={ind} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default LivroLista;
