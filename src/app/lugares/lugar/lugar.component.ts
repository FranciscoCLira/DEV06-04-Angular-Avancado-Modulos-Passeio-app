import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,

  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private service: LugarService
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  // console.log("Iniciando o componente LugarComponent - Carregando categorias...");
     this.categoriaService.obterTodas().subscribe({
         next: (listaCategorias) => this.categorias = listaCategorias,
     //  next: (listaCategorias) => {
     //  console.log("Categorias obtidas: ", listaCategorias);
     //       this.categorias = listaCategorias;
     //  }
    });
   
  }

  salvar() {

    this.camposForm.markAllAsTouched(); 
    // Marca todos os campos como tocados para exibir erros de validação
    // console.log("Formulário antes da validação: ", this.camposForm.value); 

    if (this.camposForm.valid) {
      // console.log("valores: ", this.camposForm.value);
      this.service.salvar(this.camposForm.value)
        .subscribe({
            next: (lugar) => {
              console.log("Lugar salvo com sucesso: ", lugar);
              this.camposForm.reset(); 
            },
            error: (erro) => { 
              console.error("Erro ao salvar lugar: ", erro)
            }
          }) 
    }

  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required'];
  }

}
