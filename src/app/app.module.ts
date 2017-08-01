import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { StoreModule } from '@ngrx/store';
// With metareducer function
import { metaReducer } from '../redux';

import { MdCardModule, MdInputModule } from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { TweetService } from '../services/tweet.service';

import { AppComponent } from './app.component';

import { LeftSidebarComponent, RightSidebarComponent } from '../components/sidebars';
import { AlertListComponent } from '../components/sidebars/alert-list';

import { HomeComponent } from '../components/home';
import { TweetDashboardComponent, TweetComponent, ScatterplotComponent } from '../components/tweet-dashboard';
import { NoContentComponent } from '../components/no-content';

import { DVWD3SimpleHistogramComponent, DVWD3DrWhoVillainsComponent, DVWD3SVGComponent, DVWD3PathComponent,
  DVWDAxesComponent, DVWD3CSSComponent, DVWD3ColorComponent } from '../components/data-visualization-with-d3';

import { TemplateModalComponent } from '../components/shared/modal';

// Directives
import { SidebarToggleDirective } from '../directives';

import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  TweetService
];

type StoreType = {
  state: any,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    AlertListComponent,
    NoContentComponent,
    HomeComponent,
    TweetDashboardComponent,
    TweetComponent,
    ScatterplotComponent,
    TemplateModalComponent,

    DVWD3SimpleHistogramComponent,
    DVWD3DrWhoVillainsComponent,
    DVWD3SVGComponent,
    DVWD3PathComponent,
    DVWDAxesComponent,
    DVWD3CSSComponent,
    DVWD3ColorComponent,

    // Directives
    SidebarToggleDirective
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    StoreModule.provideStore(metaReducer),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MdCardModule,
    MdInputModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {}



  // public hmrOnInit(store: StoreType) {
  //   if (!store || !store.state) {
  //     return;
  //   }
  //   console.log('HMR store', JSON.stringify(store, null, 2));
  //   /**
  //    * Set state
  //    */
  //   this.appState._stae = store.state;
  //   /**
  //    * Set input values
  //    */
  //   if ('restoreInputValues' in store) {
  //     let restoreInputValues = store.restoreInputValues;
  //     setTimeout(restoreInputValues);
  //   }
  //
  //   this.appRef.tick();
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }
  //
  // public hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
  //   /**
  //    * Save state
  //    */
  //   const state = this.appState._state;
  //   store.state = state;
  //   /**
  //    * Recreate root elements
  //    */
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   /**
  //    * Save input values
  //    */
  //   store.restoreInputValues  = createInputTransfer();
  //   /**
  //    * Remove styles
  //    */
  //   removeNgStyles();
  // }
  //
  // public hmrAfterDestroy(store: StoreType) {
  //   /**
  //    * Display new elements
  //    */
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }

}
