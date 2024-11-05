import { createAction, props } from '@ngrx/store';
import { IPizza } from '@/shared/models/pizza.model';

export const addToCart = createAction('[Cart Component] AddToCart', props<{product: IPizza}>());
export const incrementProduct = createAction(
  '[Cart Component] IncrementProduct',
  props<{ productId: number }>()
);
export const decrementProduct = createAction(
  '[Cart Component] DecrementProduct',
  props<{ productId: number }>()
);

export const removeItem = createAction(
  '[Cart Component] RemoveItem',
  props<{ productId: number }>()
);

