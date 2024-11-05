import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, pipe, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SortOrder } from '@/shared/models/pizza.model';
import { searchAlbums, sortAlbums } from '@/shared/models/pizza.model';
import { PizzaStore } from '@/components/pizzalist/store/pizza.store';

export const PizzaSearchStore = signalStore(
  withState({
    query: '',
    order: 'asc' as SortOrder,
  }),
  withComputed(({ query, order }, pizzaStore = inject(PizzaStore)) => {
    const filteredAlbums = computed(() => {
      const searchedAlbums = searchAlbums(pizzaStore.entities(), query());
      return sortAlbums(searchedAlbums, order());
    });

    return {
      filteredAlbums,
      showProgress: pizzaStore.isPending,
      showSpinner: computed(
        () => pizzaStore.isPending() && pizzaStore.entities().length === 0,
      ),
      totalAlbums: computed(() => filteredAlbums().length),
    };
  }),
  withMethods((store, snackBar = inject(MatSnackBar)) => ({
    updateQuery(query: string): void {
      patchState(store, { query });
    },
    updateOrder(order: SortOrder): void {
      patchState(store, { order });
    },
    _notifyOnError: rxMethod<string | null>(
      pipe(
        filter(Boolean),
        tap((error) => snackBar.open(error, 'Close', { duration: 5_000 })),
      ),
    ),
  })),
  withHooks({
    onInit(store, albumsStore = inject(PizzaStore)) {
      albumsStore.loadAllPizzas();
      store._notifyOnError(albumsStore.error);
    },
  }),
);
