import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NAVIGATION_BAR_SECTIONS } from '../../constants/navigation-bar/navigation-bar.constant';

@Component({
  selector: 'app-box-layout',
  templateUrl: './box-layout.component.html',
  styleUrls: ['./box-layout.component.scss'],
})
export class BoxLayoutComponent implements OnInit, OnDestroy {
  //#region Properties

  // Left side.
  @Input('left-side-template')
  public leftSideTemplateRef: TemplateRef<any>;

  // Middle side.
  @Input('middle-template')
  public middleTemplateRef: TemplateRef<any>;

  // Right side.
  @Input('right-side-template')
  public rightSideTemplateRef: TemplateRef<any>;

  // Mapping between section and template
  private readonly _sectionToTemplateMappings: {
    [section: string]: TemplateRef<any>;
  };

  // Subscription watch list.
  private readonly _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor() {
    this._sectionToTemplateMappings = {};

    // Create subscription for page
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {}

  // Get template.
  public getSectionTemplate(
    section: NAVIGATION_BAR_SECTIONS
  ): TemplateRef<any> {
    if (this._sectionToTemplateMappings[section]) {
      return this._sectionToTemplateMappings[section];
    }

    switch (section) {
      case 'left':
        if (!this.leftSideTemplateRef) {
          return null;
        }

        return this.leftSideTemplateRef;

      case 'middle':
        if (!this.middleTemplateRef) {
          return null;
        }

        return this.middleTemplateRef;

      case 'right':
        if (!this.rightSideTemplateRef) {
          return null;
        }

        return this.rightSideTemplateRef;
    }
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
  //#endregion
}
