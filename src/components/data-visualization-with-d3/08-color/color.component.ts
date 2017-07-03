import { Component, ElementRef, OnInit } from '@angular/core';

import * as D3 from 'd3/index';

@Component({
  selector: 'simple-histogram',
  providers: [

  ],
  styleUrls: [ './color.style.scss' ],
  templateUrl: './color.template.html'
})
export class DVWD3ColorComponent implements OnInit {

  private elementD3: any;
  private element: any;

  // Setting Values
  private width: number = 1024;
  private height: number = 768;
  private rings: number = 15;

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

    this.svg = this.elementD3.append('svg').style({width: this.width, height: this.height});

    // DEPRECATED: let colors = d3.scale.category20b();
    let colors = D3.scaleOrdinal(D3.schemeCategory20b);
    // DEPRECATED: let angle = d3.scale.linear().domain([0, 20]).range([0, 2*Math.PI]);
    let angle = D3.scaleLinear().domain([0, 20]).range([0, 2 * Math.PI]);

    let arc = D3.arc()
      .innerRadius(function (d) { return d * 50 / this.rings; })
      .outerRadius(function (d) { return 50 + d * 50 / this.rings; })
      .startAngle(function (d, i, j) { return angle(j); })
      .endAngle(function (d, i, j) { return angle(j + 1); });
    let shade = {
      darker: function (d, j) { return D3.rgb(colors(j)).darker(d / this.rings);
      },
      brighter: function (d, j) { return D3.rgb(colors(j)).brighter(d / this.rings); }
    };

    [[100, 100, shade.darker],
      [300, 100, shade.brighter]].forEach(function (conf) {
      console.log(conf);
      console.log(arc);
      D3.select('#graph svg').append('g')
        .attr('transform', 'translate(' + conf[0] + ', ' + conf[1] + ')')
        .selectAll('g')
        .data(colors.range())
        .enter()
        .append('g')
        .selectAll('path')
        .data(function (d) { return D3.range(0, this.rings); })
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i, j) { return conf[2](d, j); });
    });

  }

}

