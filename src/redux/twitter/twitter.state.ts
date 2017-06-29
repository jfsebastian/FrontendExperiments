import { TweetModel } from '../../models/tweet.model';

export interface TwitterState {
  tweets: TweetModel[];
}
