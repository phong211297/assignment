import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appNavigationBarLeft]'
})
export class NavigationBarLeftDirective {

  public constructor(public templateRef: TemplateRef<any>) { }

}
