import 'zone.js/dist/zone';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActionModule } from './action/module';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ActionModule, { preserveWhitespaces: false })
  .then(module =>
    fromEvent(window, 'unload').pipe(tap(() => module.destroy())),
  );
