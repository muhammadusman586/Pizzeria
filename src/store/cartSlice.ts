import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "../data/menu-items";
import { RootState } from "./store";
import { formatPrice } from "../utils/price-utils";
// import { RootState } from "@reduxjs/toolkit/query";

export type CartItem = Pizza & {
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find((existingItem) => {
        return existingItem.id === action.payload.id;
      });
      if (!matchingPizza) {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        matchingPizza.quantity++;
      }
    },
    removeItem: ( state, action:PayloadAction<Pizza>)=>{
      const matchingPizza = state.items.find((existingItem) => {
        return existingItem.id === action.payload.id;
      });
      matchingPizza!.quantity--;
      if(matchingPizza?.quantity===0){
        state.items=state.items.filter((item)=>  item.id!==matchingPizza!.id);
      }

    },

    deleteItem: (state, action:PayloadAction<Pizza>)=>{

      state.items=state.items.filter((item)=> item.id!==action.payload.id);
    }
  },
});

export const { addItem,removeItem,deleteItem } = cartSlice.actions;

export const selectItemQuantity= (item:Pizza)=>{

  return (state : RootState)=>{
    const matchingCartItem = state.cart.items.find((existingItem) => {
      return existingItem.id === item.id;
    });
    return matchingCartItem?.quantity || 0;


  }
}

export const selectPizzaCount = (state:RootState)=>{
  return  state.cart.items.reduce((acc,nextItem)=>{
    return acc+nextItem.quantity;
  },0)

}

export const selectCartTotal = (state:RootState)=>{
  const total = state.cart.items.reduce((acc,nextItem)=>{
    return acc+(nextItem.quantity*nextItem.price);
  },0)
  return formatPrice(total);
}

const cartReducer = cartSlice.reducer;
export default cartReducer;
