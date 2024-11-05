import { createReducer, on } from '@ngrx/store';
import { IPizza } from '@/shared/models/pizza.model';
import * as PizzaActions from './pizza.actions';
export interface PizzaState {
    pizzas: IPizza[];
    error: string | null;
}

export const initalProductState: PizzaState = {
    pizzas: [],
    error: null,
};

export const ProductReducer = createReducer(
    initalProductState,
    on(PizzaActions.loadProductSuccess, (state, { pizzas }) => ({
        ...state,
        pizzas,
        error: null,
    })),
    on(PizzaActions.loadProductFailure, (state, { errorMessage }) => ({
        ...state,
        error: errorMessage,
    }))
);
