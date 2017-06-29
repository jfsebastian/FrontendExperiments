import { Component, Input, OnChanges } from '@angular/core';

import { TweetModel } from '../../../models/tweet.model';
import { TwitterState } from '../../../redux/twitter/twitter.state';

@Component({
  selector: 'tweet-component',
  templateUrl: './tweet.template.html',
  styleUrls: [ './tweet.style.scss' ]
})
export class TweetComponent implements OnChanges {
  @Input()
  public twitterState: TwitterState;
  public latestTweets: TweetModel[];

  public ngOnChanges() {
    if (this.twitterState.tweets) {
      this.twitterState.tweets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.latestTweets = this.twitterState.tweets.slice(0, 10);
    }
  }

}
