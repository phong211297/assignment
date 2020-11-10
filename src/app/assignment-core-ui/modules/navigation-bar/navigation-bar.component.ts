import { NAVIGATION_BAR_SECTIONS } from './../../constants/navigation-bar/navigation-bar.constant';
import { NavigationBarRightDirective } from './navigation-bar-right.directive';
import { NavigationBarMiddleDirective } from './navigation-bar-middle.directive';
import { NavigationBarLeftDirective } from './navigation-bar-left.directive';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
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
  public constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this._sectionToTemplateMappings = {};

    // Create subscription for page
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {}

  public clickGoBack(): void {
    this.router.navigate(['./']);
  }

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

  // Run through all latest section and update their template to component.
  protected updateSectionsTemplate(): void {
    const sections: NAVIGATION_BAR_SECTIONS[] = ['left', 'middle', 'right'];
    for (const section of sections) {
      const sectionTemplate = this.getSectionTemplate(section);
      if (!sectionTemplate) {
        continue;
      }

      this._sectionToTemplateMappings[section] = sectionTemplate;
    }

    this.changeDetectorRef.detectChanges();
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion
}
