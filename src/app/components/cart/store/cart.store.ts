import {
    patchState,
    signalState,
    signalStore,
    withComputed,
    withMethods,
    withState,
  } from '@ngrx/signals';

  import { Injectable, computed } from '@angular/core';
  import { calculateTotalPrice } from '@/components/cart/store/cart.reducer';
import { IPizza } from '@/shared/models/pizza.model';
  
  export interface CartState {
    pizzas: IPizza[];
  }
  
  const initialCartState: CartState = {
    pizzas: [],
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
        patchState(store, { pizzas: updatedProduct });
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
    }))
  );
  