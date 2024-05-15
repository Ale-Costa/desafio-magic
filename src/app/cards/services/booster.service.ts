import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoosterService {
  private url = 'https://api.magicthegathering.io/v1';

  constructor(private readonly http: HttpClient) {}

  buscarCards(id: string): Observable<Card[]> {
    return this.http
      .get<{ cards: Card[] }>(`${this.url}/sets/${id}/booster`)
      .pipe(map((res) => res.cards));
  }
}
