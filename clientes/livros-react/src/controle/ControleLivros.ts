import Livro from "../modelo/Livro";

// Constante global com a URL base
const baseURL = "http://localhost:3030/livros";

// Interface compatível com o MongoDB
interface LivroMongo {
    _id: string | null;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

class ControleLivro {
    // Método para obter livros do servidor
    public async obterLivros(): Promise<Array<Livro>> {
        try {
            const response = await fetch(baseURL, { method: "GET" });
            if (!response.ok) {
                throw new Error("Erro ao obter livros");
            }
            const data: LivroMongo[] = await response.json();
            return data.map(
                (item) =>
                    new Livro(
                        item._id || "",
                        item.codEditora,
                        item.titulo,
                        item.resumo,
                        item.autores
                    )
            );
        } catch (error) {
            console.error("Erro ao obter livros:", error);
            return [];
        }
    }

    // Método para excluir um livro
    public async excluir(codigo: string): Promise<boolean> {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, {
                method: "DELETE",
            });
            return response.ok;
        } catch (error) {
            console.error("Erro ao excluir livro:", error);
            return false;
        }
    }

    // Método para incluir um novo livro
    public async incluir(livro: Livro): Promise<boolean> {
        try {
            const livroMongo: LivroMongo = {
                _id: null,
                codEditora: livro.codEditora,
                titulo: livro.titulo,
                resumo: livro.resumo,
                autores: livro.autores,
            };

            const response = await fetch(baseURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(livroMongo),
            });

            return response.ok;
        } catch (error) {
            console.error("Erro ao incluir livro:", error);
            return false;
        }
    }
}

export default ControleLivro;
