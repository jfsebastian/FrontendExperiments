import { Component, ElementRef, OnInit } from '@angular/core';

import * as D3 from 'd3/index';

@Component({
  selector: 'drwho-villains',
  providers: [

  ],
  styleUrls: [ './drwho-villains.style.scss' ],
  templateUrl: './drwho-villains.template.html'
})
export class DVWD3DrWhoVillainsComponent implements OnInit {

  private elementD3: any;
  private element: any;

  private data;
  private tbody;

  public constructor (
    private _element: ElementRef,
  ) {

  }

  public ngOnInit() {
    let self = this;

    this.element = this._element.nativeElement.querySelector('#graph');
    console.log(this.element);
    this.elementD3 = D3.select(this.element);

    //Create table
    let table = this.elementD3.append('table').attr('class', 'table');
    //Append a thead to table
    let thead = table.append('thead');
    this.tbody = table.append('tbody');

    this.reload();

  }

  // Load and autoformat CSV data
  private reload() {
    let self = this;
    D3.csv('/datasets/villains.csv', function (data) {
      self.data = data;
      console.log(self.data);
      self.redraw();
    });
  }

  private redraw() {
    // select the <tr>s if any and bind the data.
    let tr = this.tbody.selectAll('tr')
      .data(this.data)
      // Create a row for each data entry
      .enter()
      .append('tr');
    // prepared to delete data when it's needed
    tr.exit()
      .remove();
    // select all <td>s if any and use the data to fill them
    tr.selectAll('td')
      .data( function (d) { return D3.values(d); })
      .enter()
      .append('td')
      .text( function (d) { return d; });

    // ordering by first appearance
    this.tbody.selectAll('tr')
      .sort( function (a, b) { return D3.ascending(a['Year first'], b['Year first']); });
  }

  // working filters to execute in console:
  /*
   tbody.selectAll('tr').sort(function (a, b) {
   return D3.descending(Number(a['Doc. no.']), Number(b['Doc. no.']));
   });
   this.data = this.data.filter(function (d) { return d['Doctor actor'] === 'Matt Smith'; })
   redraw()
   */
  /*
   this.tbody.selectAll('tr')
   .filter(function (d) { return d['Doctor actor'] !== 'Matt Smith'; })
   .remove()
   */

}
