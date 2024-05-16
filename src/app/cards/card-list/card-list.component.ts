import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../interfaces/card';
import { MatCardModule } from '@angular/material/card';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input()
  cards: Card[];

  @Output()
  buscarNovosCards = new EventEmitter<Card[]>();

  @Input()
  quantidadeDeCardsRemovidos: number;

  cardsSelecionados: Card[] = [];

  colorIdentityImages: { [key: string]: string } = {
    U: '../../../assets/img/U.webp',
    B: '../../../assets/img/B.png',
    R: '../../../assets/img/R.webp',
    G: '../../../assets/img/G.png',
    W: '../../../assets/img/W.webp',
  };

  alterarSelecao(change: MatCheckboxChange, card: Card) {
    change.checked ? this.selecionarCard(card) : this.desselecionarCard(card);
  }

  isSelecionado(card: Card): boolean {
    return this.cardsSelecionados.includes(card);
  }

  cancelarRemocao() {
    this.cardsSelecionados = [];
  }

  removerCards() {
    this.buscarNovosCards.emit(this.cardsSelecionados);
    this.cardsSelecionados = [];
  }

  private selecionarCard(card: Card) {
    this.cardsSelecionados.push(card);
  }

  private desselecionarCard(card: Card) {
    this.cardsSelecionados = this.cardsSelecionados.filter((c) => c !== card);
  }
}
