import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Set } from '../../shared';
import { Observable, map, of, delay } from 'rxjs';
import { sets } from './sets';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  private url = 'https://api.magicthegathering.io/v1';

  constructor(private readonly http: HttpClient) {}

  getSets(filters: { name?: string; block: string }): Observable<Set[]> {
    const { name, block } = filters;
    const params: { name?: string; block: string } = { block };

    if (!!name) {
      params.name = name;
    }

    return of(sets).pipe(delay(2000));

    // return this.http.get<{sets:Set[]}>(`${this.url}/sets`, {
    //   params,
    // }).pipe(map( res => res.sets));
  }
}
