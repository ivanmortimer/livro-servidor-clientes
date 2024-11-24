import Editora from "../modelo/Editora"

var editoras: Array<Editora> = [
    new Editora(0, "Novatec Editora"),
    new Editora(1, "Pearson"),
    new Editora(2, "Elsevier")
];

class ControleEditora {

    // Métodos de acesso

    public getEditoras(): Array<Editora> {
        return editoras;
    }

    public getNomeEditora(codigoEditora: number): string {
        const novaListaEditoras: Array<Editora> = editoras.filter((editora) => editora.codEditora === codigoEditora);
        const nomeEditora: string = novaListaEditoras[0].nome;
        return nomeEditora;
    }
}

// console.log(editoras);
// console.log(ControleEditora.getNomeEditora(1));

export default ControleEditora
