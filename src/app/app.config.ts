import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ProductReducer } from './components/pizzalist/store/pizza.reducer';
import { cartReducer } from './components/cart/store/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEffects(),
    provideStore(), 
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'product', reducer: ProductReducer }),
    provideAnimationsAsync(),
    provideHttpClient(),]
};
