import { inject } from '@angular/core';
import { exhaustMap, pipe, tap } from 'rxjs';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { tapResponse } from '@ngrx/operators';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@/shared/state/request-status.feature';
import { withStorageSync } from '@/shared/state/storage-sync.feature';
import { IPizza } from '@/shared/models/pizza.model';
import { PizzaService } from '@/services/pizza.service';

export const PizzaStore = signalStore(
  { providedIn: 'root' },
  withEntities<IPizza>(),
  withRequestStatus(),
  withMethods((store, pizzaService = inject(PizzaService)) => ({
    setAlbum(pizza: IPizza): void {
      patchState(store, setEntity(pizza));
    },
    loadAllPizzas: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        exhaustMap(() => {
          return pizzaService.getAll().pipe(
            tapResponse({
              next: (pizzas) => {
                patchState(store, setAllEntities(pizzas), setFulfilled());
              },
              error: (error: { message: string }) => {
                patchState(store, setError(error.message));
              },
            }),
          );
        }),
      ),
    ),
  })),
  withStorageSync('pizzaState'),
);
