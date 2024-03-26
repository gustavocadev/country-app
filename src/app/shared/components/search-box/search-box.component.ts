import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  #debouncer = new Subject<string>();
  #debouncerSubscription?: Subscription;

  @Input() placeholder = 'Search...';

  @Input() type = 'text';

  @Input() initialValue = '';

  @Output()
  onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.#debouncerSubscription = this.#debouncer
      .pipe(debounceTime(400))
      .subscribe((value) => {
        console.log('debouncer value', value);
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy(): void {
    console.log('destroyed');
    this.#debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.#debouncer.next(searchTerm);
  }
}
