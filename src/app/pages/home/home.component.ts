import { Component, inject } from '@angular/core';
import { PizzalistComponent } from '../../components/pizzalist/pizzalist.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { PizzaSearchStore } from '../../components/pizzalist/store/pizza.search.store';
import { CartStore } from '../../components/cart/store/cart.store';
import { IPizza } from '@/shared/models/pizza.model';
import { HeaderComponent } from "../../core/layout/header.component";
import { AsyncPipe } from '@angular/common';
import { FooterComponent } from '@/core/layout/footer.component';
import CartComponent from "../../components/cart/cart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent,MatSidenavModule, MatSidenav,FooterComponent, PizzalistComponent, HeaderComponent, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[PizzaSearchStore,CartStore]
})
export default class HomeComponent {
  readonly store = inject(PizzaSearchStore);
  readonly cartStore = inject(CartStore);

  addItemToCart(product: IPizza) {
    this.cartStore.addToCart(product);
  }
}
