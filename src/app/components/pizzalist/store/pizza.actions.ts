import { createAction, props } from '@ngrx/store';
import { IPizza } from '@/shared/models/pizza.model';

export const loadProduct = createAction('[Pizza Component] loadpizza');
export const loadProductSuccess = createAction(
  '[Product Component] loadProductSuccess',
  props<{pizzas: IPizza[]}>()
);
export const loadProductFailure = createAction(
  '[Product Component] loadProductFailure',
  props<{ errorMessage: string }>()
);

