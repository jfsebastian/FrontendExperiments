import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';

import { TweetModel } from '../../models/tweet.model';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'tweet-dashboard',  // <home></home>
  styleUrls: [ './tweet-dashboard.style.css' ],
  templateUrl: './tweet-dashboard.template.html'
})
export class TweetDashboardComponent implements OnInit {

  private rootElement: ElementRef;

  public errorMessage: string;
  public term: string;

  public tweets: TweetModel[] = [];
  public twitterState: any = {};

  public constructor (private _element: ElementRef, private _tweetService: TweetService) {
    console.log(this._element.nativeElement, this._element.nativeElement.clientWidth);
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
    let self = this;
    this._tweetService.connectToStream()
      .subscribe(
        (tweet) => {
          console.log(tweet)
          console.log(self.tweets);

          self.tweets.push(tweet as TweetModel);
          self.twitterState = {
            tweets: self.tweets
          };

        },
        (error) => self.errorMessage = <any>error
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
