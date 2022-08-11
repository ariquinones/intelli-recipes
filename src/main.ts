import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/* IntersectionObserver polyfill */
import 'intersection-observer';
/* Polyfill for icons web components */
import '@webcomponents/custom-elements';
// Load FerUI  icons
import '@ferui/icons';

declare global {
  interface Window {
    USER: string;
  }
}
window.USER = localStorage.getItem('intelli-username');
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
