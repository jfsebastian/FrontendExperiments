import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'alert-list',
  templateUrl: './alert-list.template.html'
})

export class AlertListComponent {
  @Input() public alerts: any;
  @Output() public closeAlert = new EventEmitter();

  constructor() { }
}
