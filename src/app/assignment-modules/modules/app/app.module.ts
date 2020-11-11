import { AssignmentsCoreUiModule } from './../../../assignment-core-ui/assignments-core-ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfigService } from 'src/app/assignment-api/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageModule } from '@ngx-pwa/local-storage';
import { AssignmentsApiModule } from 'src/app/assignment-api/assignments-api.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function appConfigServiceFactory(appConfigService: AppConfigService) {
  return () => appConfigService.loadConfigurationAsync().toPromise();
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AssignmentsCoreUiModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
    }),
    AssignmentsApiModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigServiceFactory,
      multi: true,
      deps: [AppConfigService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
