export type SortOrder = 'asc' | 'desc';

export interface Toppings{
    name:string;
    price:number;
    selected:boolean
}

export enum OFFERS {
  NOOFFER = 'No Deal',
  OFFERONE = 'Deal Of the Day !- 1 Medium Pizza with 2 topping = $5',
  OFFERTWO = 'Deal Of the Day ! - 2 Medium Pizza with 4 topping each = $9',
  OFFERTHREE = 'Deal Of the Day ! – 1 Large with 4 toppings ( Peperoni and Barbecue chicken are counted as 2 toppings)- 50% discount'
}

export type IPizza = {
    id: number;
    name: string;
    init: string;
    pizza: string;
    size:string;
    image: string;
    price: number;
    base: string;
    type: string;
    toppings: Toppings[];
    options:[];
    quantity:number;
}

export type IDiscount ={
  type:OFFERS;
  discount:number;
  price:number ;
}



export function searchAlbums(albums: IPizza[], query: string): IPizza[] {
    return albums.filter(({ name }) => name.toLowerCase().includes(query));
  }
  
  export function sortAlbums(albums: IPizza[], order: SortOrder): IPizza[] {
    const direction = order === 'asc' ? 1 : -1;
    return [...albums].sort((a, b) => direction * a.name.localeCompare(b.name));
  }
  