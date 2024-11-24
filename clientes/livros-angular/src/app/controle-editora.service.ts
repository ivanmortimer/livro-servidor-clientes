import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
  editoras: Array<Editora> = [
    { codEditora: 0, nome: "Novatec Editora" },
    { codEditora: 1, nome: "Pearson" },
    { codEditora: 2, nome: "Elsevier" }
  ];

  constructor() { }

  // Métodos de acesso

  public getNomeEditora(listaEditoras: Array<Editora>, codigoEditora: number): string {
      const novaListaEditoras: Array<Editora> = listaEditoras.filter((editora) => editora.codEditora == codigoEditora);
      const nomeEditora: string = novaListaEditoras[0].nome;
      return nomeEditora;
  }

  public getEditoras(): Array<Editora> {
    return this.editoras;
  }

}
