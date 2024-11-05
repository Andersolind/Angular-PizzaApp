import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header.component';
import { FooterComponent } from './core/layout/footer.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './components/cart/store/app.state';
import { selectCartProducts } from './components/cart/store/cart.selector';
import { CartStore } from './components/cart/store/cart.store';
import { IPizza } from './shared/models/pizza.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pizza-app';
  cartStore = inject(CartStore);
  products$: Observable<IPizza[]>;
  constructor(private store: Store<AppState>) {
   
    this.products$ = this.store.select(selectCartProducts);
  }
}
