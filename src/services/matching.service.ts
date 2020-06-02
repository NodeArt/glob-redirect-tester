import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const FUNCTION_URL = '/match';

export interface IMyResult {
  result: {
    edited: string;
    result: string[];
  }
}
@Injectable({providedIn: 'root'})
export class MatchingService {
  constructor(private http: HttpClient ) {
  }

  checkWildcardPatterns(wildCard: string, url: string, redirect: string): Observable<IMyResult> {
    const getParams = `from=${wildCard}&to=${redirect}&url=${url}`;
    return this.http.get<IMyResult>(`${FUNCTION_URL}?${getParams}`);
  }
}
