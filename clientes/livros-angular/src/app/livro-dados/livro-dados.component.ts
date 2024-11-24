import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro = new Livro();
  public autoresForm: string = "";
  public editoras: Array<Editora> = [];

  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;
  private router: Router;

  constructor(servEditora: ControleEditoraService, servLivros: ControleLivrosService, router: Router) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
    this.router = router;
  }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  // a. Alterar o método incluir para usar then no método incluir do controlador
  incluir = (): void => {
    // Atualizar os atributos do objeto livro
    this.livro.autores = this.autoresForm.split('\n');
    this.livro.codEditora = Number(this.livro.codEditora);

    // Chamar o método incluir do serviço e navegar apenas após sucesso
    this.servLivros.incluir(this.livro)
      .then((sucesso) => {
        if (sucesso) {
          this.router.navigateByUrl('/lista'); // Navegar após a inclusão bem-sucedida
        } else {
          alert('Erro ao incluir o livro.');
        }
      })
      .catch((erro) => {
        console.error('Erro ao incluir o livro:', erro);
        alert('Erro ao incluir o livro.');
      });
  }
}
