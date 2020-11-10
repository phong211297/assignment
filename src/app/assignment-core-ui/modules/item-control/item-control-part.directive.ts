import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'item-control ng-template[section]'
})
export class ItemControlPartDirective {

  //#region Properties

  // Section name.
  // tslint:disable-next-line:no-input-rename
  @Input('section')
  public name: string;

  //#endregion

  //#region Constructor

  public constructor(public templateRef: TemplateRef<any>) {
  }

  //#endregion

  //#region Methods

  //#endregion
}
