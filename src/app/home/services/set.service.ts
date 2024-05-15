import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Set } from '../interfaces/set';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  private url = 'https://api.magicthegathering.io/v1';

  constructor(private readonly http: HttpClient) {}

  buscarSets(filters: { name?: string; block: string }): Observable<Set[]> {
    const { name, block } = filters;
    const params: { name?: string; block: string } = { block };

    if (!!name) {
      params.name = name;
    }

    return this.http
      .get<{ sets: Set[] }>(`${this.url}/sets`, {
        params,
      })
      .pipe(map((res) => res.sets));
  }
}
