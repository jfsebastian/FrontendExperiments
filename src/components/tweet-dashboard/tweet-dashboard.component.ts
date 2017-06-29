import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';

import { TweetModel } from '../../models/tweet.model';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'tweet-dashboard',  // <home></home>
  providers: [  ],
  styleUrls: [ './tweet-dashboard.style.css' ],
  templateUrl: './tweet-dashboard.template.html'
})
export class TweetDashboardComponent implements OnInit {

  rootElement: ElementRef;

  errorMessage: string;
  term: string;
  tweets: TweetModel[] ;
  twitterState: any = {};

  public constructor (private _element: ElementRef, private _tweetService: TweetService) {
    this.rootElement = D3.select(this._element.nativeElement);
  }

  public ngOnInit() {
    // this.buildSVG();
    this.connectToTweetStream();
  }

  public buildSVG(): void {
    // this.streamContainer = this.host.append('div');
  }

  public connectToTweetStream() {
    this._tweetService.connectToStream()
      .subscribe(
        (tweet) => {
          this.tweets.push(tweet as TweetModel);
          this.twitterState = {
            tweets: this.tweets
          };
        },
        (error) => this.errorMessage = <any>error
      );
  }

  public setSearchTerm(searchTerm) {
    this._tweetService.setSearchTerm(searchTerm)
      .subscribe(
        () => console.log('search term set: ' + searchTerm),
        (error) => this.errorMessage = <any>error
      );
  }

}
