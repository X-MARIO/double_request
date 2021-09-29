import { Component, OnInit } from '@angular/core';
import { forkJoin, interval, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { wrapper } from './wrapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

  loadCompletionDocuments(event: Event): Observable<unknown> {
    const intervalOne$ = interval(1000);
    const intervalTwo$ = interval(1500);
    const ceContextDocuments = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return forkJoin(
      [
        intervalOne$,
        intervalTwo$,
        ceContextDocuments.length > 1 ? of(ceContextDocuments) : of([]),
        this.methodOne(ceContextDocuments)
      ]
    ).pipe(
      map(([elOne, elTwo, elThree, elFour]: [number, number, number[], any]) => {
        console.log('123')
        return of(null);
      })
    );
  }

  methodOne(ceContextDocuments: number[]): Observable<string[]> {
    console.log('methodOne start');
    return ceContextDocuments.length > 0
      ? forkJoin(ceContextDocuments
        .map((doc: number) => wrapper<number, string>(this.methodTwo.bind(this), doc))
      )
      : of([]);
  }

  methodTwo(
    doc: number
  ): Observable<string> {
    console.log('methodTwo start');
    return of(doc.toString())
    }

}
