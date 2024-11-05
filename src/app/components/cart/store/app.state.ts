import { CartState } from "@/components/cart/store/cart.reducer";
import { PizzaState } from "@/components/pizzalist/store/pizza.reducer";

export interface AppState {
  cart: CartState,
  product: PizzaState
}
