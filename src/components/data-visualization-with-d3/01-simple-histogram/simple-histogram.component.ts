import { Component, ElementRef, OnInit } from '@angular/core';

import * as D3 from 'd3/index';

@Component({
  selector: 'simple-histogram',
  providers: [

  ],
  styleUrls: [ './simple-histogram.style.scss' ],
  templateUrl: './simple-histogram.template.html'
})
export class DVWD3SimpleHistogramComponent implements OnInit {

  private elementD3: any;
  private element: any;

  // Setting Values
  private width: number = 900;
  private height: number = 300;
  private pad: number = 20;
  private leftPad: number = 100;

  // D3 Scales and Axes
  private xScale;
  private yScale;
  private xAxis;
  private yAxis;

  // D3 SVG
  private svg;

  public constructor (
    private _element: ElementRef,
  ) {

  }

  public ngOnInit() {
    let self = this;

    this.element = this._element.nativeElement.querySelector('#graph');
    console.log(this.element);
    this.elementD3 = D3.select(this.element);

    // horizontal scale
    // DEPRECATED var x = D3.scale.ordinal().rangeRoundBands([leftPad, width - pad], 0.1);
    this.xScale = D3.scaleBand().range([this.leftPad, this.width - this.pad], 0.1);
    // vertical scale
    // DEPRECATED var y = D3.scale.linear().range([height-pad, pad]);
    this.yScale = D3.scaleLinear().range([this.height - this.pad, this.pad]);
    // define axis
    // DEPRECATED var xAxis = D3.svg.axis().scale(x).orient('bottom');
    this.xAxis = D3.axisBottom().scale(this.xScale);
    // DEPRECATED  yAxis = D3.svg.axis().scale(y).orient('left');
    this.yAxis = D3.axisLeft().scale(this.yScale);
    // Create the SVG object to represent the data
    this.svg = this.elementD3.append('svg').attr('width', this.width).attr('height', this.height);

    // Load the dataset
    D3.json('/datasets/histogram-hours.json', function (data) {
      // Format the data
      data = D3.keys(data).map(function (key) {
        return {bucket: Number(key),
          N: data[key]};
      });
      console.log(data);
      // Give the scales a domain
      self.xScale.domain(data.map(function (d) { return d.bucket; }));
      self.yScale.domain([0, D3.max(data, function (d) { return d.N; })]);

      // Draw the axes
      self.svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (self.height - self.pad) + ')')
        .call(self.xAxis);
      self.svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (self.leftPad - self.pad) + ', 0)')
        .call(self.yAxis);

      // Draw the data
      self.svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) { return self.xScale(d.bucket); })
        // DEPRECATED .attr('width', x.rangeBand())
        .attr('width', self.xScale.bandwidth())
        .attr('y', self.height - self.pad)
        .transition()
        .delay(function (d) { return d.bucket * 20; })
        .duration(800)
        .attr('y', function (d) { return self.yScale(d.N); })
        .attr('height', function (d) { return self.height - self.pad - self.yScale(d.N); });
    });

  }

}

