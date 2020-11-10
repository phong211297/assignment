import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search-controller.component.html',
  styleUrls: ['./search-controller.component.scss']
})
export class SearchControllerComponent implements OnInit {

  //#region Properties

  // Search keyword bindin
  public searchKeyWord: string;

  //#endregion

  //#region Constructor

  public constructor() {

  }
  //#endregion

  //#region Methods

  public ngOnInit(): void {
  }

  //#endregion
}
