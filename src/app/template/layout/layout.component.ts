import { Component } from '@angular/core';
import { LayoutProps } from './layoutprops';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  props: LayoutProps = { titulo: '', subTitulo: '' };

  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ){}


  // quando mudar de rota vai ativar o evento e capiturar a rota ativada 
  ngOnInit(): void {
    this.router.events
    .pipe(
      filter( () => this.ActivatedRoute.firstChild !== null ),
      map( () => this.obterPropriedadeLayout() )
    ).subscribe((props: LayoutProps) => this.props = props)

  }

  obterPropriedadeLayout() : LayoutProps {
    let rotaFilha = this.ActivatedRoute.firstChild;

    while(rotaFilha?.firstChild){
      rotaFilha = rotaFilha.firstChild;
    }

    return rotaFilha?.snapshot.data as LayoutProps;
  }

}
