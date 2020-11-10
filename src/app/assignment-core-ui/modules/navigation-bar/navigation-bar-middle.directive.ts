import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appNavigationBarMiddle]'
})
export class NavigationBarMiddleDirective {

  public constructor(public templateRef: TemplateRef<any>) { }

}
