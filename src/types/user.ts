import type { CartItem, CheckoutProduct } from "../api/cartApi";
import type { FavouriteItem } from "../api/favouritesApi";

export interface User {
  id: string;
  username: string;
  password: string;
  cart?: CartItem[];
  favourites?: FavouriteItem[];
  orders?: CheckoutProduct[];
}
