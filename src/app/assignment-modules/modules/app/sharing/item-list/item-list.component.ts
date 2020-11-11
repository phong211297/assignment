import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Transaction } from 'src/app/assignment-api/models/response/transaction.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, OnChanges {
  //#region Properties

  // Input transactions list
  @Input('transactions')
  public transactions: Transaction[];

  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods

  // Trigger when component inits
  public ngOnInit(): void {}

  public ngOnChanges(): void {}
  //#endregion
}
