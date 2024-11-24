class Livro {
    public codigo: string;
    public codEditora: number;
    public titulo: string;
    public resumo: string;
    public autores: string[];

    constructor(codigo: string, codEditora: number, titulo: string, resumo: string, autores: string[]) {
        this.codigo = codigo;
        this.codEditora = codEditora;
        this.titulo = titulo;
        this.resumo = resumo;
        this.autores = autores;
    }
}

export default Livro;
