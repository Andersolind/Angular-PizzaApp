import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { IPizza } from '../../shared/models/pizza.model';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel, } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
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
    MatCardSubtitle,
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
  readonly pizzas = input<IPizza[]>([]);
  readonly showSpinner = input(false);
  toppingsTotal: number = 0
  pizzaTotal: number = 0;
  finalPrice: number = 0;
  pizzaQty: number = 0;
  isDiscountApplied: boolean = false;
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

  addToCart(product: IPizza) {
    this.handleAdd.emit(product);
  }




  //   applyDiscount(pizza:IPizza){

  //     const 
  //     if()
  //     · Offer1 - 1 Medium Pizza with 2 topping = $5

  // · Offer2 - 2 Medium Pizza with 4 topping each = $9

  // · Offer3 – 1 Large with 4 toppings ( Peperoni and Barbecue chicken are counted as 2 toppings)- 50% discoun
  //   }
}
