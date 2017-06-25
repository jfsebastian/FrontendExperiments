import { Component, Input } from '@angular/core';

@Component({
  selector: 'left-sidebar',
  templateUrl: './left-sidebar.template.html',
  styleUrls: ['./sidebar.styles.css']
})

export class LeftSidebarComponent {

  @Input() public sidebarState: boolean;

  constructor() { }

}
