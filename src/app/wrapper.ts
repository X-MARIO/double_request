import { Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

type MyWrapperFn<N, S> = (document: N) => Observable<S>;

export function wrapper<N, S>(func: MyWrapperFn<N, S>, doc: N): OperatorFunction<unknown, unknown> {
  console.log('wrapper start');
  return switchMap(()=> func(doc).pipe(
    tap(value => console.log('!tap', value)),
    catchError(error => throwError(error)),
  ))
}
