import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Card } from './interfaces/card';
import { Observable, finalize } from 'rxjs';
import { BoosterService } from './services/booster.service';
import { AsyncPipe } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [AsyncPipe, CardListComponent, LoadingComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  cards$: Observable<Card[]>;
  loading = false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly boosterService: BoosterService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  private getCards(): void {
    this.loading = true;
    const id = this.getUrlParam();
    this.cards$ = this.boosterService
      .getCards(id)
      .pipe(finalize(() => (this.loading = false)));
  }

  private getUrlParam(): string {
    return this.route.snapshot.paramMap.get('id') || '';
  }
}
