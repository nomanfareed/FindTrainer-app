import { Component, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent {
  @Input() label: string = '';
  @Input() placeholder = null;
  @Input() rows: number = 4;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
}
