import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { SearchResponse, BestMatch } from './app.interfaces';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgIf, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'glimpse-ui';
  searchControl = new FormControl('');
  searchResults$: Observable<any[]> = of([]);
  symbol: string = 'AAPL';
  response: string = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => value ? this.searchApi(value) : of([]))
    );
  }

  searchApi(query: string): Observable<string[]> {
    const url = `${this.apiUrl}/search?keyword=${query}`;
    console.log(url);

    return this.http.get<SearchResponse>(url).pipe(
      map((response: SearchResponse) => {
        const symbols = response.bestMatches?.map(match => match["1. symbol"]) || [];
        return symbols;
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn('API error:', error);
        return of([]); // Return empty array if error
      })
    );
  }

  selectItem(symbol: string) {
    this.searchControl.setValue(symbol, { emitEvent: false });
  }

  fetchData(event: Event) {
    event.preventDefault();
    const url = `${this.apiUrl}/ticker?symbol=${this.symbol}`;

    console.log(url);

    this.http.get(url, { responseType: 'text' }).subscribe(
      (data: string) => (this.response = data),
      (error: string) => (this.response = 'Error fetching data'),
    );
  }
}
