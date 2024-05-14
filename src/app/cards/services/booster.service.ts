import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Observable, map, of, delay } from 'rxjs';
import { cards } from './cards';

@Injectable({
  providedIn: 'root',
})
export class BoosterService {
  private url = 'https://api.magicthegathering.io/v1';

  constructor(private readonly http: HttpClient) {}

  getCards(id: string): Observable<Card[]> {
    return of(cards).pipe(delay(10000))
    // return this.http
    //   .get<{ cards: Card[] }>(`${this.url}/sets/${id}/booster`)
    //   .pipe(map((res) => res.cards));
  }
}
