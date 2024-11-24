import { Injectable } from '@angular/core';
import { Livro } from './livro';

// a. Definir a constante global com o nome "baseURL"
const baseURL = "http://localhost:3030/livros";

// b. Definir a interface "LivroMongo"
interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ControleLivrosService {
  constructor() {}

  // d. Alterar o método "obterLivros"
  public async obterLivros(): Promise<Livro[]> {
    try {
      const response = await fetch(baseURL, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Erro ao obter livros');
      }
      const data: LivroMongo[] = await response.json();
      return data.map(
        (item) =>
          new Livro(
            item._id || '',
            item.codEditora,
            item.titulo,
            item.resumo,
            item.autores
          )
      );
    } catch (error) {
      console.error('Erro ao obter livros:', error);
      return [];
    }
  }

  // e. Alterar o método "excluir"
  public async excluir(codigo: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      return false;
    }
  }

  // f. Alterar o método "incluir"
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livroMongo),
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao incluir livro:', error);
      return false;
    }
  }
}
