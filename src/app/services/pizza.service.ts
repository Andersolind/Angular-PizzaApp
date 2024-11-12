import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPizza } from '../shared/models/pizza.model';

const API_URL = 'http://localhost:3000/pizzas';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  readonly #http = inject(HttpClient);
  
  getAll(): Observable<IPizza[]> {
    return this.#http.get<IPizza[]>(API_URL);
  }

  getByProductId(id: number): Observable<IPizza[]> {
    return this.#http.get<IPizza[]>(API_URL, { params: { id } });
  }
  
  constructor() { }
}
