import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardSet } from '../../shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  private url = 'https://api.magicthegathering.io/v1';

  constructor(private readonly http: HttpClient) {}

  getSets(filters: { name?: string; block: string }): Observable<CardSet[]> {
    const { name = '', block } = filters;
    return this.http.get<CardSet[]>(`${this.url}/sets`, {
      params: { block, name },
    });
  }
}
