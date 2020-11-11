import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search-controller.component.html',
  styleUrls: ['./search-controller.component.scss'],
})
export class SearchControllerComponent implements OnInit, OnDestroy {
  //#region Properties

  // Search keyword bindin
  public searchKeyWord: string;

  // Input subject handle
  private handleInputSubject: Subject<string> = new Subject();

  // Output keyword
  @Output() keyWordEmit = new EventEmitter<string>();

  // Create subscription watch list
  private _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor() {
    // Bind subscription
    this._subscription = new Subscription();
  }
  //#endregion

  //#region Methods

  public ngOnInit(): void {
    const handleInputBehaviorSubscription = this.handleInputSubject
      .pipe(
        distinctUntilChanged(),
        tap((keyword: string) => {
          this.keyWordEmit.emit(keyword);
        })
      )
      .subscribe();

    this._subscription.add(handleInputBehaviorSubscription);
  }

  // Seach keyword fire event
  public triggerSearchEvent(keyword: string) {
    this.handleInputSubject.next(keyword);
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
  //#endregion
}
