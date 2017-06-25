import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';

import { TweetService } from '../../services/tweet.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'tweet-dashboard',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [

  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './tweet-dashboard.style.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './tweet-dashboard.template.html'
})
export class TweetDashboardComponent implements OnInit {

  errorMessage: string;
  host;
  streamContainer;
  svg;

  public constructor (private _element: ElementRef, private _tweetService: TweetService) {
    this.host = D3.select(this._element.nativeElement);
    console.log(this._element.nativeElement);
  }

  public ngOnInit() {
    this.buildSVG();
    this.connectToTweetStream();
  }

  public buildSVG(): void {
    this.streamContainer = this.host.append('div');
  }

  public connectToTweetStream() {
    this._tweetService.connectToStream()
      .subscribe(
        tweet => {
          console.log(tweet);
          this.streamContainer.append('p').html(tweet);
        },
        error => this.errorMessage = <any>error
      );
  }

  public setSearchTerm(searchTerm) {
    this._tweetService.setSearchTerm(searchTerm)
      .subscribe(
        () => console.log('search term set: ' + searchTerm),
        error => this.errorMessage = <any>error
      );
  }

}
