export class Livro {
    public codigo: string; // Alterar tipo para String e ...
    public codEditora: number;
    public titulo: string;
    public resumo: string;
    public autores: string[];

    constructor(
        codigo: string = "", // ... inicializar com texto vazio
        codEditora: number = 0,
        titulo: string = "",
        resumo: string = "",
        autores: string[] = []
    ) {
        this.codigo = codigo;
        this.codEditora = codEditora;
        this.titulo = titulo;
        this.resumo = resumo;
        this.autores = autores;
    }
}
