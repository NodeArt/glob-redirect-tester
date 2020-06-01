import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {combineLatest} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {IMyResult, MatchingService} from '../services/matching.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'glob-redirect-test';
  FromField = new Subject();
  ToField = new Subject();
  UrlField = new Subject();
  UrlForRedirectField = new Subject();
  clickedBtn = new BehaviorSubject(false);
  resultArray = new BehaviorSubject([]);

  constructor(private match: MatchingService) {
  }

  ngOnInit() {
    this.FromField.subscribe(console.log);
    combineLatest([
      this.FromField,
      this.ToField,
      this.UrlField,
      this.clickedBtn,
    ]).pipe(
      filter(([from, to, url, isClicked]: [string, string, string, boolean]) => isClicked && !!from && !!to && !!url),
      tap(([from, to, url, isClicked]: [string, string, string, boolean]) => {
        this.match.checkWildcardPatterns(from, url, to).subscribe(
          (result: IMyResult) => {
            this.UrlForRedirectField.next(result.result.edited);
            const resultArray = result.result.result;
            resultArray.shift();
            this.resultArray.next(resultArray);
          }
        );
        this.clickedBtn.next(false);
      })
    ).subscribe();
  }

  checkWildCard() {
    this.clickedBtn.next(true);
  }

}
