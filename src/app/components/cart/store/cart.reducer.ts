import { createReducer, on } from '@ngrx/store';
import { IDiscount, IPizza, OFFERS, Toppings } from '@/shared/models/pizza.model';
import * as CartActions from './cart.actions';

export interface CartState {
  products: IPizza[];
  totalPrice: number,
  discount: []
}

export const initialCounterState: CartState = {
  products: [],
  totalPrice: 0,
  discount: []
};

export function calculateTotalPrice(products: IPizza[]) {
  // get all toppings that have been selected

  const selectedToppings = products.filter((selected=>selected.toppings.filter(toppings=>toppings.selected === true)));
  let allSelectedToppings:Toppings[] =[];
  products.map(findToppings=>{
    findToppings.toppings.map(toppings=>{
      if(toppings.selected)
        allSelectedToppings.push(toppings);
    })
  })
  console.log(allSelectedToppings,"All toppings");

  let tempDiscount: IDiscount[] = [];

    products.map(product => {
    let findDiscounts = addDiscount(product);
    
    tempDiscount.push(findDiscounts)

  })

  console.log(tempDiscount,'Discount items');


  const toppingsTotal = allSelectedToppings.reduce((total,toppings)=>
    total + Number(toppings.price),0
  )
  console.log(toppingsTotal,'total toppings');

  
  const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity) , 0);

//   //apply discounts 
// if(tempDiscount.length >= 1){

//   // how to get the total 
//   let getTotal:number[] = [];
//   products.map(getPrice=>{
//   const total =  getPrice.quantity;
//   getTotal.push(total);
//   getPrice.toppings.map(toppings=>{
//       if(toppings.selected)
//         allSelectedToppings.push(toppings);
//     })
//   })
  
//   const totalToppingsPrice = allSelectedToppings.reduce((total,quantity)=>total + Number(quantity.price),0);

//   const totalQty = getTotal.reduce((total,quantity)=>total + quantity,0);

//   const calculateTotalPrice = totalToppingsPrice * totalQty;

//   return calculateTotalPrice;

// }


  return toppingsTotal + totalPrice;

}

export function addDiscount(order: IPizza): IDiscount {

  let discountConfig: IDiscount = { type: OFFERS.NOOFFER, discount: 0, price:0 }

  if (order.quantity === 1 && order.size === 'Medium' && order.toppings.length >= 2) {
    discountConfig = {
      type: OFFERS.OFFERONE,
      discount: 5,
      price: order.price

    }
    return discountConfig;
  }
  if (order.quantity === 2 && order.size === 'Medium' && order.toppings.length >= 4) {
    discountConfig = {
      type: OFFERS.OFFERTWO,
      discount: 9,
      price: order.price
    }
  }
  const offer3Quote = order.quantity === 1 && order.size === 'Large' && order.toppings.filter(extraToppings => {
    extraToppings.name === 'Pepperoni' && extraToppings.selected === true
  });
  const offer4Quote = order.quantity === 1 && order.size === 'Large' && order.toppings.filter(extraToppings => {
    extraToppings.name === 'Barbecue Chicken' && extraToppings.selected === true
  });

  if (offer3Quote && offer4Quote) {
    discountConfig = {
      type: OFFERS.OFFERTHREE,
      discount: 100,
      price: order.price
    }
  }
  return discountConfig;
}


export const cartReducer = createReducer(
  initialCounterState,
  on(CartActions.addToCart, (state, { product }) => {
    const updatedProducts = [...state.products, product];
    return {
      ...state,
      products: updatedProducts,
      totalPrice: calculateTotalPrice(updatedProducts)

    };
  }),

  on(CartActions.removeItem, (state, { productId }) => {
    const updatedProducts = state.products.filter(
      (product) => product.id !== productId
    );
    return {
      ...state,
      products: updatedProducts,
      totalPrice: calculateTotalPrice(updatedProducts),
    };
  }),

  on(CartActions.incrementProduct, (state, { productId }) => {
    const updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    return {
      ...state,
      products: updatedProducts,
      totalPrice: calculateTotalPrice(updatedProducts),
    };
  }),
  on(CartActions.decrementProduct, (state, { productId }) => {
    const updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    return {
      ...state,
      products: updatedProducts,
      totalPrice: calculateTotalPrice(updatedProducts),
    };
  })
);
