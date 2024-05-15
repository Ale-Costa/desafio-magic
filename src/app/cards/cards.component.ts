import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Card } from './interfaces/card';
import { Observable, finalize, map, repeat, takeWhile } from 'rxjs';
import { BoosterService } from './services/booster.service';
import { AsyncPipe } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [AsyncPipe, CardListComponent, LoadingComponent, MatIconModule, MatTooltipModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  loading = false;
  cardsValidos: Card[] = [];

  constructor(
    readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly boosterService: BoosterService
  ) {}

  ngOnInit(): void {
    this.buscarCartas();
  }

  removerCards(cardsRemovidos: Card[]): void {
    this.cardsValidos = this.cardsValidos.filter((card) => {
      return !cardsRemovidos.some((removedCard) => removedCard.id === card.id);
    });
    this.buscarCartas();
  }



  private buscarCartas(): void {
    this.loading = true;

    this.buscarCartasValidas()
      .pipe(
        repeat(),
        takeWhile(() => this.cardsValidos.length < 30),
        finalize(() => (this.loading = false))
      )
      .subscribe(this.gerenciarCards);
  }

  private buscarCartasValidas(): Observable<Card[]> {
    const id = this.buscarId();

    return this.boosterService
      .buscarCards(id)
      .pipe(
        map((cards) => cards.filter((card) => card.types.includes('Creature')))
      );
  }

  private buscarId(): string {
    return this.route.snapshot.paramMap.get('id') || '';
  }

  private gerenciarCards = (cards: Card[]): void => {
    const totalCards = this.cardsValidos.length + cards.length;
    if (totalCards <= 30) {
      this.cardsValidos = [...this.cardsValidos, ...cards];
    } else {
      const remainingCards = 30 - this.cardsValidos.length;
      this.cardsValidos = [
        ...this.cardsValidos,
        ...cards.slice(0, remainingCards),
      ];
    }
  };
}
