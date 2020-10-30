import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  @Input() header: string = '404: Not Found';
  @Input() subtext: string = null;
  @Input() isChild: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
