import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //#region Properties
  public title = 'assignment-demo';

  //#endregion

  //#region Constructor
  public constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  //#endregion
}
