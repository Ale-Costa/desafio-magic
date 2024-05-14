import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Card } from './interfaces/card';
import { Observable } from 'rxjs';
import { BoosterService } from './services/booster.service';
import { AsyncPipe } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [AsyncPipe, CardListComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  cards$: Observable<Card[]>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly boosterService: BoosterService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  private getCards(): void {
    const id = this.getUrlParam();
    this.cards$ = this.boosterService.getCards(id);
  }

  private getUrlParam(): string {
    return this.route.snapshot.paramMap.get('id') || '';
  }
}
