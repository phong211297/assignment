import {
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { ItemControlPartDirective } from './item-control-part.directive';

@Component({
  // tslint:disable-next-line: component-selector
  selector: ' item-control, medication-item, item-control',
  templateUrl: './item-control.component.html',
  styleUrls: ['./item-control.component.scss'],
})
export class ItemControlComponent implements OnInit {
  //#region  Properties

  // Class to be applied to host item.
  @HostBinding('class')
  private _hostClass = 'default';

  // open state of the panel
  @Input()
  public expanded = false;

  // Sections in medication item.
  @ContentChildren(ItemControlPartDirective)
  public sections: QueryList<ItemControlPartDirective>;

  // Whether description is available or not.
  @Input()
  public hasDescription: boolean;

  // whether instruction is available
  @Input()
  public hasInstruction = false;

  // Usage content.
  @Input()
  public hasRipple = false;

  @Input('item-status')
  public itemStatus: string;

  //#endregion

  //#region Accessors

  public get hostClass(): string {
    return this._hostClass;
  }

  // Class to be applied to host item.
  @Input('class')
  public set hostClass(value: string) {
    this._hostClass = value;
  }

  //#endregion

  // #region Constructor
  public constructor() {}

  //#endregion

  //#region Methods

  public ngOnInit(): void {}

  // Load item template reference by using name.
  public loadItemPartTemplateRef(name: string): TemplateRef<any> {
    if (!this.sections || !this.sections.length) {
      return null;
    }

    const section = this.sections.find((item) => item.name === name);

    if (!section) {
      return null;
    }

    return section.templateRef;
  }

  // Whether template is available for a specific item.
  public hasItemPartTemplateRef(name: string): boolean {
    return this.loadItemPartTemplateRef(name) !== null;
  }
  //#endregion
}
