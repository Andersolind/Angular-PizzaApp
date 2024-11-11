import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { IPizza, Toppings } from '../../shared/models/pizza.model';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel, } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { MatPseudoCheckbox } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-pizzalist',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    DatePipe,
    CurrencyPipe,
    RouterLink,
    MatProgressSpinner,
    MatFormField,
    MatCheckboxModule,
    MatCardSubtitle,
    MatPseudoCheckbox,
    MatCardTitle,
    MatCard,
    MatAnchor,
    MatInput,
    MatLabel,
    MatIcon,
  ],
  templateUrl: './pizzalist.component.html',
  styleUrl: './pizzalist.component.scss'
})
export class PizzalistComponent {
  private _snackBar = inject(MatSnackBar);
  readonly pizzas = input<IPizza[]>([]);
  readonly showSpinner = input(false);
  toppingsTotal: number = 0
  pizzaTotal: number = 0;
  finalPrice: number = 0;
  pizzaQty: number = 0;
  isDiscountApplied: boolean = false;
  isSelected: Toppings[] = [];
  durationInSeconds = 5;
  addedPizza: IPizza[] = [];
  @Output() handleAdd = new EventEmitter();

  constructor() { }

  totalToppings(pizza: IPizza) {

    let total: number = 0;

    pizza.toppings.map(pizza => {
      total = total + Number(pizza.price);
    })

    this.toppingsTotal = total;

    this.finalPrice = pizza.price + total;
  }

  toggle(pizza: IPizza, item: Toppings, event: MatCheckboxChange): void {

    if (event.checked) {
      //first find the item in array \  
      if (this.addedPizza.length >= 0) {
        // check if we have a duplicate
        const isPizza = this.addedPizza.find(topping => topping.id === pizza.id);
        if (isPizza) {
          // find the toppings to update
          isPizza?.toppings.map(updateToppings => {
            if (updateToppings.name === item.name) {
              updateToppings.selected = true
            }
          })
        } else {
          this.addedPizza.push(pizza);
          const isPizza = this.addedPizza.find(topping =>
            topping.id === pizza.id);
          isPizza?.toppings.map(updateToppings => {
            if (updateToppings.name === item.name) {
              updateToppings.selected = true
            }
          })
        }
        // add the item to the array
      }
      //update the item  and add is selected is tru

    } else {
      //remove the item and check if all the items are removed.
      let index = this.addedPizza.indexOf(pizza);
      if (index >= 0) {
        const isPizza = this.addedPizza.find(topping => topping.id === pizza.id);
        if (isPizza) {
          // find the toppings to update
          isPizza?.toppings.map(updateToppings => {
            if (updateToppings.name === item.name) {
              updateToppings.selected = false
            }
          })
     

          //remove the whole order
          let removeOrder = this.addedPizza.indexOf(pizza)
          if (removeOrder >= -1) {
            let isEmpty = this.addedPizza[removeOrder].toppings.filter(isFalse => isFalse.selected === true);
            if (isEmpty.length <= 0) {
              this.addedPizza.splice(removeOrder, 1);
            }
          }
        }
      }
    }
  }



  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  addToCart(product: IPizza) {
    // add selected toppings
    const idXPizza = this.addedPizza.indexOf(product);
    if (idXPizza <= -1) {
  
      this.openSnackBar();
    } else {
      this.handleAdd.emit(this.addedPizza[idXPizza]);
    }
  }
}
