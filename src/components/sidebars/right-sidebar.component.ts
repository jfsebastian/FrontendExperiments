import { Component, Input } from '@angular/core';

@Component({
  selector: 'right-sidebar',
  templateUrl: './right-sidebar.template.html',
  styleUrls: ['./sidebar.styles.css']
})

export class RightSidebarComponent {

  @Input() public sidebarState: boolean;

  constructor() {

  }



}
