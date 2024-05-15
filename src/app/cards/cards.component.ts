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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CardListComponent,
    LoadingComponent,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  loading = false;
  cardsValidos: Card[] = [];

  constructor(
    readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly boosterService: BoosterService,
    private readonly matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buscarCards();
  }

  removerCards(cardsRemovidos: Card[]): void {
    this.cardsValidos = this.cardsValidos.filter((card) => {
      return !cardsRemovidos.some((cardRemovido) => cardRemovido.id === card.id);
    });
    this.buscarCards();
  }

  private buscarCards(): void {
    this.loading = true;

    this.buscarCardsValidos()
      .pipe(
        repeat(),
        takeWhile(() => this.cardsValidos.length < 30),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: this.gerenciarCards,
        error: (err) => {
          this.matSnackBar.open(err.message, 'Ok', {
            duration: 5000,
            horizontalPosition: 'left',
          });
        },
      });
  }

  private buscarCardsValidos(): Observable<Card[]> {
    const id = this.buscarId();

    return this.boosterService
      .buscarCards(id)
      .pipe(
        map((cards) =>
          cards.filter(
            (card) =>
              card.types.includes('Creature') && !!card.colorIdentity?.length
          )
        )
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
