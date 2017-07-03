import { Component, ElementRef, OnInit } from '@angular/core';

import * as D3 from 'd3/index';

@Component({
  selector: 'basic-paths',
  providers: [

  ],
  styleUrls: [ './path.style.scss' ],
  templateUrl: './path.template.html'
})
export class DVWD3PathComponent implements OnInit {

  private elementD3: any;
  private element: any;

  // Setting Values
  private width: number = 1024;
  private height: number = 768;
  private margin: number = 10;

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

    this.draw();

  }

  private draw() {
    this.svg = this.elementD3.append('svg')
      .attr('width', this.width + 2 * this.margin)
      .attr('height', this.height + 2 * this.margin);

    // Apend first group element
    let g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin + ', ' + this.margin + ')');

    // Data accesor for Sine
    let sine = D3.range(0, 10).map(
      function (k) { return [0.5 * k * Math.PI,
        Math.sin(0.5 * k * Math.PI)]; });

    // Scales
    // DEPRECATED var x = d3.scale.linear()
    let x = D3.scaleLinear()
        .range([0, this.width / 2 - this.margin])
        .domain(D3.extent(sine, function (d) { return d[0]; })),
      // DEPRECATED y = d3.scale.linear().range([height/2-margin, 0]).domain([-1, 1]);
      y = D3.scaleLinear().range([this.height / 2 - this.margin, 0]).domain([-1, 1]);

    // Line function
    // DEPRECATED var line = d3.svg.line()
    let line = D3.line()
      .x(function (d) { return x(d[0]); })
      .y(function (d) { return y(d[1]); });

    // Draw 2 lines with different data interpolation
    g.append('path')
      .datum(sine)
      .attr('d', line)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    g.append('path')
      .datum(sine)
      // DEPRECATED .attr('d', line.interpolate('step-before'))
      .attr('d', line.curve(D3.curveStepBefore))
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('fill', 'none');

    // Append second group element
    let g2 = this.svg.append('g')
      .attr('transform', 'translate(' + (this.width / 2 + this.margin) + ', ' + this.margin + ')');

    // Define the area
    // DEPRECATED var area = d3.svg.area()
    let area = D3.area()
      .x(function (d) { return x(d[0]); })
      .y0(this.height / 2)
      .y1(function (d) { return y(d[1]); })
      // DEPRECATED .interpolate('basis');
      .curve(D3.curveBasis);

    // Append the area and the border
    g2.append('path')
      .datum(sine)
      .attr('d', area)
      .attr('fill', 'steelblue')
      .attr('fill-opacity', 0.4);
    g2.append('path')
      .datum(sine)
      // DEPRECATED .attr('d', line.interpolate('basis'))
      .attr('d', line.curve(D3.curveBasis))
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // Append and Arc
    // DEPRECATED var arc = d3.svg.arc();
    let arc = D3.arc();
    let g3 = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin + ',' + (this.height / 2 + this.margin) + ')');
    g3.append('path')
      .attr('d', arc({outerRadius: 100,
        innerRadius: 50,
        startAngle: -Math.PI * 0.25,
        endAngle: Math.PI * 0.25}))
      .attr('transform', 'translate(150, 150)')
      .attr('fill', 'lightslategrey');

    // Create a Symbol
    let symbols = D3.symbol()
      .type(function (d, i) {
        if (d[1] > 0) {
          // DEPRECATED SYMBOL return 'triangle-down';
          return D3.symbolTriangle
        }else{
          return D3.symbolTriangle;
        }
      })
      .size(function (d, i) {
        if (i % 2) {
          return 0;
        }else{
          return 64;
        }
      });

    // Append The symbol
    g2.selectAll('path')
      .data(sine)
      .enter()
      .append('path')
      .attr('d', symbols)
      .attr('transform', function (d) { return 'translate(' + x(d[0]) + ',' + y(d[1]) + ')'; })
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'white');

    // Test how to draw a Chord
    g3.append('g').selectAll('path')
      .data([{
        source: {radius: 50,
          startAngle: -Math.PI * 0.30,
          endAngle: -Math.PI * 0.20},
        target: {radius: 50,
          startAngle: Math.PI * 0.30,
          endAngle: Math.PI * 0.30}}])
      .enter()
      .append('path')
      // DEPRECATED .attr('d', d3.svg.chord());
      .attr('d', D3.ribbon());

    // Draw a chord graph
    let data = D3.zip(D3.range(0, 12),
      D3.shuffle(D3.range(0, 12))),
      colors = ['linen', 'lightsteelblue', 'lightcyan', 'lavender', 'honeydew', 'gainsboro'];

    // DEPRECATED var chord = d3.svg.chord()
    let chord = D3.ribbon()
      .source(function (d) { return d[0]; })
      .target(function (d) { return d[1]; })
      .radius(150)
      .startAngle(function (d) { return -2 * Math.PI * (1 / data.length) * d; })
      .endAngle(function (d) {
        return -2 * Math.PI * (1 / data.length) * ((d - 1) % data.length); });

    g3.append('g')
      .attr('transform', 'translate(300, 200)')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', chord)
      .attr('fill', function (d, i) { return colors[i % colors.length]; })
      .attr('stroke', function (d, i) { return colors[(i + 1) % colors.length]; });

    /*

     The diagonal constructor is gone for good

     //Diagonal (Bezier Curves)
     var g4 = svg.append('g')
     .attr('transform', 'translate('+(width/2)+','+(height/2)+')');
     var moustache = [
     {source: {x: 250, y: 100}, target: {x: 500, y: 90}},
     {source: {x: 500, y: 90}, target: {x: 250, y: 120}},
     {source: {x: 250, y: 120}, target: {x: 0, y: 90}},
     {source: {x: 0, y: 90}, target: {x: 250, y: 100}},
     {source: {x: 500, y: 90}, target: {x: 490, y: 80}},
     {source: {x: 0, y: 90}, target: {x: 10, y: 80}}
     ];
     g4.selectAll('path')
     .data(moustache)
     .enter()
     .append('path')
     .attr('d', d3.svg.diagonal())
     .attr({stroke: 'black',
     fill: 'none'});
     */
  }

}

