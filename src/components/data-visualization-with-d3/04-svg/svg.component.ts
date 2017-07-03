import { Component, ElementRef, OnInit } from '@angular/core';

import * as D3 from 'd3/index';

@Component({
  selector: 'basic-svg',
  providers: [

  ],
  styleUrls: [ './svg.style.scss' ],
  templateUrl: './svg.template.html'
})
export class DVWD3SVGComponent implements OnInit {

  private elementD3: any;
  private element: any;

  // Setting Values
  private width: number = 900;
  private height: number = 300;

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

    this.svg = this.elementD3.append('svg')
      .style('width', 1024)
      .style('height', 768);

    // text
    this.svg.append('text')
      .text('A picture!')
      .attr('x',10)
      .attr('y',150)
      .attr('text-anchor', 'start');
    /* DEPRECATED to use an object to set multiple attributes:
     .attr({x: 10,
     y: 150,
     'text-anchor': 'start'});*/

    // shapes:
    // line
    this.svg.append('line')
      .attr('x1', 10)
      .attr('y1',10  )
      .attr('x2',100)
      .attr('y2',100)
      .attr('stroke-width',3)
      .attr('stroke','blue');
    // create rectangle
    this.svg.append('rect')
      .attr('x', 200)
      .attr('y', 50)
      .attr('with',300)
      .attr('height',400);
    // modify rectangle
    this.svg.select('rect')
      .attr('stroke', 'green')
      .attr('stroke-width',0.5)
      .attr('fill','white')
      .attr('rx',20)
      .attr('ry',40);
    // circle
    this.svg.append('circle')
      .attr('cx', 350)
      .attr('cy',250)
      .attr('fill','green')
      .attr('fill-opacity',0.5)
      .attr('stroke','steelblue')
      .attr('stroke-width',2);
    // ellipse
    this.svg.append('ellipse')
      .attr('cx', 350)
      .attr('cy', 250)
      .attr('rx', 150)
      .attr('ry', 70)
      .attr('fill', 'green')
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 0.7);
    this.svg.append('ellipse')
      .attr('cx', 350)
      .attr('cy', 250)
      .attr('rx', 20)
      .attr('ry', 70);
    // paths
    this.svg.append('path')
      .attr('d', 'M 100 100 L 300 100 L 200 300 z')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'red')
      .attr('fill-opacity', 0.7);

    // Transformations:
    this.svg.selectAll('ellipse, circle')
      .attr('transform', 'translate(150, 0) scale(1.2) translate(-70, 0) rotate(-45, ' + (350 / 1.2) + ', ' + (250 / 1.2) + ')');

  }

}

