export type SortOrder = 'asc' | 'desc';

export interface Toppings{
    name:string;
    price:number;
    selected:boolean
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

export function searchAlbums(albums: IPizza[], query: string): IPizza[] {
    return albums.filter(({ name }) => name.toLowerCase().includes(query));
  }
  
  export function sortAlbums(albums: IPizza[], order: SortOrder): IPizza[] {
    const direction = order === 'asc' ? 1 : -1;
    return [...albums].sort((a, b) => direction * a.name.localeCompare(b.name));
  }
  