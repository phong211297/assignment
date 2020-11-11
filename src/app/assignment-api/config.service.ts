import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConfig } from '../assignment-modules/models/app-config';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppConfigService {
  //#region Properties

  private _appConfiguration: any;

  //#endregion

  //#region Constructors

  constructor(public httpClient: HttpClient) {}

  //#endregion

  //#region Application configuration

  // Get app config path from environment.ts file
  protected getAppConfigPath(): string {
    if (environment.appConfigPath) {
      return environment.appConfigPath;
    }
    throw Error('Please configure appConfigPath on environment.ts');
  }

  // Load configuration from file asynchronously.
  public loadConfigurationAsync(): Observable<AppConfig> {
    // Configuration has been loaded before.
    if (this._appConfiguration) {
      return of(this._appConfiguration);
    }

    return this.httpClient.get<AppConfig>(this.getAppConfigPath()).pipe(
      tap((data) => {
        const options = data as AppConfig;
        this._appConfiguration = options;
      })
    );
  }

  //#endregion
}
