import {isPlatformBrowser} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Inject, NgModule, Optional, PLATFORM_ID} from '@angular/core';
import {BrowserTransferStateModule, TransferState} from '@angular/platform-browser';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Request} from 'express';
// import {TranslateCacheModule, TranslateCacheService, TranslateCacheSettings} from 'ngx-translate-cache';
import {translateLoaderFactory} from './translate-loaders';
import {LanguageService} from "rushapp-angular-core";

@NgModule({
  imports: [
    BrowserTransferStateModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient, TransferState, PLATFORM_ID]
      }
    }),
    // TranslateCacheModule.forRoot({
    //   cacheService: {
    //     provide: TranslateCacheService,
    //     useFactory: translateCacheFactory,
    //     deps: [TranslateService, TranslateCacheSettings]
    //   },
    //   cacheMechanism: 'Cookie'
    // })
  ],
  exports: [TranslateModule]
})
export class I18nModule {
  public constructor(
    // private translateCacheService: TranslateCacheService,
    private languageService: LanguageService,
    @Optional() @Inject(REQUEST) private req: Request,
    @Inject(PLATFORM_ID) private platform: any,
  ) {
    // if (isPlatformBrowser(this.platform)) {
    //   translateCacheService.init();
    // }
    this.languageService.setAvailableLanguages();
    this.languageService.setInitialLanguage(this.getLangFromServerSideCookie());
  }

  private getLangFromServerSideCookie(): string {
    return this.req?.cookies?.lang;
  }
}

// export function translateCacheFactory(
//   translateService: TranslateService,
//   translateCacheSettings: TranslateCacheSettings
// ): TranslateCacheService {
//   return new TranslateCacheService(translateService, translateCacheSettings);
// }
