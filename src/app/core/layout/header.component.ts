import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { CartStore } from '@/components/cart/store/cart.store';
import { AppState } from '@/components/cart/store/app.state';
import { selectCartProducts } from '@/components/cart/store/cart.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPizza } from '@/shared/models/pizza.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbar, RouterLink],
  template: ` 
   <mat-toolbar class="navbar" >
    <img src="PizzeriaLogo.png" class="logo-image">
      <button mat-button routerLink="/home" routerLinkActive="active" disableRipple='false'>Home</button>
      <span  class="fill"></span>
  </mat-toolbar>
  `,
  styles: `

.mat-raised-button.mat-gold
{
    background-color: #F9AA33;
    color: white;
}

.active {
  color:  #F9AA33;
}
.logo-image{
 
  margin-bottom: -10px;
}

.fill
{
flex: 1 4 auto;
}
  `
})
export class HeaderComponent {
  cartStore = inject(CartStore);
  products$: Observable<IPizza[]>;
  constructor(private store: Store<AppState>) {

    this.products$ = this.store.select(selectCartProducts);
  }
}
