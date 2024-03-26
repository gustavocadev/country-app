import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Input() placeholder = 'Search...';

  @Input() type = 'text';

  @Output()
  onValue = new EventEmitter<string>();

  emitValue(value: string) {
    this.onValue.emit(value);
  }
}
