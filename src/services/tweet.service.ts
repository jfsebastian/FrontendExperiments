import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as io from 'socket.io-client';

@Injectable()

export class TweetService {
  private url = 'http://192.168.1.13:4200';
  // private url = 'http://localhost:4200';
  private socket;

  public constructor (private _http: Http) { }

  public connectToStream(): Observable<any> {
    console.log('connectToStream');
    let observable = new Observable( (observer) => {
      this.socket = io(this.url);
      this.socket.on('tweet', (tweet) => {
        console.log(tweet);
        observer.next(tweet);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  public setSearchTerm(searchTerm: string): Observable<any> {
    console.log('setSearchTerm');
    return this._http.get(`${this.url}/stream/${searchTerm}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
