import { Component, OnInit } from '@angular/core';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;

  constructor(servEditora: ControleEditoraService, servLivros: ControleLivrosService) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
  }

  // a. Alterar ngOnInit para usar o modelo assíncrono com then
  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
    this.servLivros.obterLivros()
      .then((dados) => {
        this.livros = dados; // Atualizar o vetor "livros" com os dados obtidos
      })
      .catch((erro) => {
        console.error('Erro ao carregar os livros:', erro);
      });
  }

  // b. Assinatura do método "excluir" já está correta (parâmetro "codigo" é uma String)

  // c. Alterar o método excluir para usar then no método excluir do controlador
  excluir = (codigo: string): void => {
    this.servLivros.excluir(codigo)
      .then((sucesso) => {
        if (sucesso) {
          // Recarregar os livros após a exclusão bem-sucedida
          return this.servLivros.obterLivros();
        } else {
          console.error('Erro ao excluir o livro.');
          return [];
        }
      })
      .then((dados) => {
        this.livros = dados; // Atualizar o vetor "livros" com os dados atualizados
      })
      .catch((erro) => {
        console.error('Erro ao excluir ou recarregar os livros:', erro);
      });
  }

  obterNome = (listaEditoras: Array<Editora>, codEditora: number): string | undefined => {
    return this.servEditora.getNomeEditora(listaEditoras, codEditora);
  }
}
