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
        tap((keyword: string) => {
          this.keyWordEmit.emit(keyword);
        })
      )
      .subscribe();

    this._subscription.add(handleButtonGroupBehaviorSubscription);
  }

  // Trigger sort event
  public triggerSortEvent(keyword: SORT_KEYWORD_SECTIONS): void {
    if (!keyword) {
      return;
    }

    this.buttonGroupSubject.next(keyword);
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
  //#endregion
}
