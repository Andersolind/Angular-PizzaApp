import {
  patchState,
  signalState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { computed } from '@angular/core';
import { calculateTotalPrice } from '@/components/cart/store/cart.reducer';
import { IDiscount, IPizza, OFFERS } from '@/shared/models/pizza.model';

export interface CartState {
  pizzas: IPizza[];
  discount: IDiscount[]
}

const initialCartState: CartState = {
  pizzas: [],
  discount: []
};


export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialCartState),
  withComputed(({ pizzas }) => ({
    totalPrice: computed(() => calculateTotalPrice(pizzas())),
  })),
  withMethods(({ pizzas, ...store }) => ({
    addToCart(product: IPizza) {
      const updatedProduct = [...pizzas(), product];
      patchState(store, { pizzas: updatedProduct },);
    },
    removeItem(id: number) {
      const updatedProduct = pizzas().filter((a) => a.id !== id);
      patchState(store, { pizzas: updatedProduct });
    },

    increment(id: number) {
      const updatedProduct = pizzas().map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      patchState(store, { pizzas: updatedProduct });
    },
    decrement(id: number) {
      const updatedProduct = pizzas().map((pizza) =>
        pizza.id === id
          ? { ...pizza, quantity: pizza.quantity - 1 }
          : pizza
      );
      patchState(store, { pizzas: updatedProduct });
    },
    addDiscount(order: IPizza): IDiscount {

      let discountConfig: IDiscount = { type: OFFERS.NOOFFER, discount: 0,price:0 }

      if (order.quantity === 1 && order.size === 'Medium' && order.toppings.length >= 2) {
        discountConfig = {
          type: OFFERS.OFFERONE,
          discount: 5,
          price:0
        }
     //   return discountConfig;
      }
      if (order.quantity === 2 && order.size === 'Medium' && order.toppings.length >= 4) {
        discountConfig = {
          type: OFFERS.OFFERTWO,
          discount: 9,
          price:0
        }
      }
      const offer3Quote = order.quantity === 1 && order.size === 'Large' && order.toppings.filter(extraToppings => {
        extraToppings.name === 'Pepperoni' && extraToppings.selected === true
      });
      const offer4Quote = order.quantity === 1 && order.size === 'Large' && order.toppings.filter(extraToppings => {
        extraToppings.name === 'Barbecue Chicken' && extraToppings.selected === true
      });

      if (offer3Quote && offer4Quote) {
        discountConfig = {
          type: OFFERS.OFFERTHREE,
          discount: 100,
          price: 0
        }
      }
      return discountConfig;
    }

  }))
);
