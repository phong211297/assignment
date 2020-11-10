import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appNavigationBarRight]'
})
export class NavigationBarRightDirective {

  public constructor(public templateRef: TemplateRef<any>) { }

}
