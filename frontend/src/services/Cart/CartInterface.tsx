import { ItemDTO } from "../Product/ItemDTO";

export interface Cart {
    items: ItemDTO[];
    totalPrice: string;
    totalPrice_in_ether: string;
  }