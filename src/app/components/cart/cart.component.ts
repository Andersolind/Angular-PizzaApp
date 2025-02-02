import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { removeItem, incrementProduct } from './store/cart.actions';
import { selectCartProducts, selectTotal } from './store/cart.selector';
import { CartStore } from './store/cart.store';
import { IDiscount, IPizza, OFFERS } from '@/shared/models/pizza.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export default class CartComponent {

  cartItems$ = this.store.select(selectCartProducts);
  totalPrice$ = this.store.select(selectTotal);
  cartStore = inject(CartStore);
  discountQuote!: IDiscount;
  constructor(private store: Store<AppState>) {

  }

  remove(productId: number) {
    this.store.dispatch(removeItem({ productId }));
  }

  increment(productId: number) {
    this.store.dispatch(incrementProduct({ productId }));

  }

  decrement(productId: number, quantity: number) {
    if (quantity === 1) {
      this.cartStore.removeItem(productId);
    } else {
      this.cartStore.decrement(productId);
    }
  }

  addDiscount(order: IPizza): boolean {
    this.discountQuote = this.cartStore.addDiscount(order);
    this.discountQuote.type = this.discountQuote.type
    return true;
  }
}

