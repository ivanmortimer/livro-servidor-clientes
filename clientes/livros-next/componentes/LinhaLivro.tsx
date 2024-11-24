import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";
import React from "react";


let controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir(codigo: string): void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    let nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);
    let listaAutores = props.livro.autores;
    let listaAutoresHTML = listaAutores.map((autor, index) => <li key={index.toString()}>{autor}</li>);

    return (
        <tr key={props.livro.codigo.toString()}>
            <td key="titulo">
                <p>{ props.livro.titulo }</p>
                <button type="button" className="btn btn-danger" onClick={() => props.excluir(props.livro.codigo)}>Excluir</button>
            </td>
            <td key="resumo">{ props.livro.resumo }</td>
            <td key="nomeEditora">{ nomeEditora }</td>
            <td key="listaAutoresHTML">
                <ul>{ listaAutoresHTML }</ul>
            </td>
        </tr>
    );
}
