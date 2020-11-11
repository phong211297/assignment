import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
})
export class PrimaryLayoutComponent implements OnInit {
  //#region Properties

  // List languages
  public languages = ['en', 'vn'];

  // Selected language
  public selectedLanguage = 'en';

  //#endregion

  //#region Constructor
  public constructor(protected translateService: TranslateService) {}
  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  // Change language
  public changeLanguage(selectedLanguage: string): void {
    this.translateService.setDefaultLang(selectedLanguage);
    this.translateService.use(selectedLanguage);
  }
  //#endregion
}
