import { Component } from '@angular/core';
import { Cafe } from '../models/cafe';
import { CafeService } from '../services/cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  templateUrl: './cafe-list.component.html',
  styleUrl: './cafe-list.component.css'
})
export class CafeListComponent {
  cafes: Cafe[] = [];

  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => this.cafes = cafes);
  }

  getCafesPorTipo(tipo: string): number {
    return this.cafes.filter(cafe => cafe.tipo == tipo).length;
  }

  get cafesTipoOrigen(): number {
    return this.getCafesPorTipo('Café de Origen');  
  }

  get cafesTipoBlend(): number {
    return this.getCafesPorTipo('Blend');
  }
} 

