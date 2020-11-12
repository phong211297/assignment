import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { SORT_KEYWORD_SECTIONS } from 'src/app/assignment-modules/constants/sort-keyword.constant';
@Component({
  selector: 'app-sort-controller',
  templateUrl: './sort-controller.component.html',
  styleUrls: ['./sort-controller.component.scss'],
})
export class SortControllerComponent implements OnInit, OnDestroy {
  //#region Properties

  // Output keyword
  @Output() keyWordEmit = new EventEmitter<string>();

  // Create subscription watch list
  private _subscription: Subscription;

  // Button group subject handle
  private buttonGroupSubject: Subject<string> = new Subject();

  // Category field
  public category: string[];

  // Type field
  public type = ['new'];

  //#endregion

  //#region Constructor
  public constructor() {
    // Bind subscription
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods
  public ngOnInit(): void {
    const handleButtonGroupBehaviorSubscription = this.buttonGroupSubject
      .pipe(
        distinctUntilChanged(),
        tap((keywords: string) => {
          this.keyWordEmit.emit(keywords);
        })
      )
      .subscribe();

    this._subscription.add(handleButtonGroupBehaviorSubscription);
  }

  // Trigger sort event
  public handleTypeChange(event: any): void {
    if (!event || !event.source) {
      this.buttonGroupSubject.next(null);
      return;
    }
    const toggleRef = event.source;

    if (this.type.length > 0 && this.type === toggleRef.value) {
      return;
    }

    if (event.value.some((item) => item === toggleRef.value)) {
      this.category = [toggleRef.value];
      this.type = [toggleRef.value];
    }

    const requestValue = `${this.category}`;
    this.buttonGroupSubject.next(requestValue);
    return;
  }

  // Category handle changing
  public handleCategoryChange(event: any): void {
    if (!event || !event.source) {
      this.buttonGroupSubject.next(null);
      return;
    }
    const toggleRef = event.source;

    if (!toggleRef.value || toggleRef.value === '') {
      return;
    }

    if (event.value.some((item) => item === toggleRef.value)) {
      this.category = [toggleRef.value];
    }

    const requestValue = `${this.type}${this.category}`;
    this.buttonGroupSubject.next(requestValue);
    return;
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
  //#endregion
}
