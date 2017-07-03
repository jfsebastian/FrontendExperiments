import { Component, ElementRef, OnInit } from '@angular/core';

import * as D3 from 'd3/index';

@Component({
  selector: 'simple-histogram',
  providers: [

  ],
  styleUrls: [ './css.style.scss' ],
  templateUrl: './css.template.html'
})
export class DVWD3CSSComponent implements OnInit {

  private elementD3: any;
  private element: any;

  private width: number = 800;
  private height: number = 600;
  private margin: number = 20;

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

    this.svg = this.elementD3.append('svg').attr({width: this.width, height: this.height});

    // And a scale
    // DEPRECATED var x = d3.scale.linear().domain([0, 100]).range([margin, width-margin]);
    let x = D3.scaleLinear().domain([0, 100]).range([this.margin, this.width - this.margin]);

    // Our axis is going to use the following to translate data points ( domain ) to coordinates ( range )
    // DEPRECATED var axis = d3.axis()
    let axis = D3.axisBottom().scale(x);

    // DEPRECATED var a = svg.append('g')
    let a = D3.select('#graph svg').append('g')
      .attr('transform', 'translate(0, 30)')
      .data(D3.range(0, 100))
      .call(axis);

    // Style
    a.selectAll('path')
      .attr({fill: 'none',
        stroke: 'black',
        'stroke-width': 0.5});
    a.selectAll('line')
      .attr({fill: 'none',
        stroke: 'black',
        'stroke-width': 0.3});

    // Add multiple axes
    let axes = [
      D3.axisBottom().scale(x),
      D3.axisBottom().scale(x).ticks(5) // ,
      // d3.axisBottom().scale(x).tickSubdivide(3).tickSize(10, 5, 10)
    ];

    axes.forEach(function (axis, i) {
      // DEPRECATED var a = svg.append('g')
      let a = D3.select('#graph svg').append('g')
        .classed('axis', true)
        .classed('red', i%2==0)
        .attr('transform', 'translate(0, ' + ((i + 2) * 50 + self.margin) + ')')
        .data(D3.range(0, 100))
        .call(axis);
      // Style
      a.selectAll('path')
        .attr({fill: 'none',
          stroke: 'black',
          'stroke-width': 0.5});
      a.selectAll('line')
        .attr({fill: 'none',
          stroke: 'black',
          'stroke-width': 0.3});
    });

  }

}
