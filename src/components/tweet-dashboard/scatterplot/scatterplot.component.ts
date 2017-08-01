import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import * as D3 from 'd3/index';

import { TweetModel } from '../../../models/tweet.model';

@Component({
  selector: 'scatterplot-component',
  templateUrl: './scatterplot.template.html',
  styleUrls: ['./scatterplot.style.css']
})
export class ScatterplotComponent implements OnChanges{
  @Input() public twitterState: any;

  public height;
  public host;
  public htmlElement: HTMLElement;
  public margin;
  public svg;
  public width;
  public xAxis;
  public xScale;
  public yAxis;
  public yScale;
  public zScale;

  constructor(
    private _element: ElementRef
  ) {
    this.host = D3.select(this._element.nativeElement);

    console.log(this.host, this.host.clientWidth);
  }

  public ngOnChanges() {
    this.setup();
    this.buildSvg();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }

  private setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };

    console.log(this._element.nativeElement.clientWidth);

    this.width = this._element.nativeElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.6 - this.margin.left - this.margin.right;
    this.xScale = D3.scaleLinear().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.zScale = D3.scaleLinear().range([2, 15]);
  }

  private buildSvg() {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
  }

  private drawXAxis() {
    this.xAxis = D3.axisBottom(this.xScale)
      .ticks(5).tickPadding(15);
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + this.height + ')')
      .call(this.xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', this.width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .style('fill', 'grey')
      .text('Followers');
  }

  private drawYAxis() {
    this.yAxis = D3.axisLeft(this.yScale)
      .ticks(5).tickPadding(10);
    this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('fill', 'grey')
      .text('Following');
  }

  private getMaxX() {
    let followersCounts = [];
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach((tweet) => {
        followersCounts.push(tweet.followers_count);
      });
      return D3.max(followersCounts);
    }
  }

  private getMaxY() {
    let followingCounts = [];
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach((tweet) => {
        followingCounts.push(tweet.following_count);
      });
      return D3.max(followingCounts);
    }
  }

  private getMaxZ() {
    let statusesCounts = [];
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach((tweet) => {
        statusesCounts.push(tweet.statuses_count);
      });
      return D3.max(statusesCounts);
    }
  }

  private populate() {
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach((tweet) => {
        this.xScale.domain([0, this.getMaxX()]);
        this.yScale.domain([0, this.getMaxY()]);
        this.zScale.domain([0, this.getMaxZ()]);
      });
      this.svg.selectAll('.dot')
        .data(this.twitterState.tweets)
        .enter().append('circle')
          .attr('class', 'dot')
          .attr('r', (d) => this.zScale(d.statuses_count))
          .attr('cx', (d) => this.xScale(d.followers_count))
          .attr('cy', (d) => this.yScale(d.following_count))
          .style('fill', 'blue')
          .style('opacity', 0.4);
    }
  }

}
