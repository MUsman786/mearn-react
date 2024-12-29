import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  addCartItem,
  deletCartItems,
  getCartItem,
  UpdatedCartItem,
} from "@/store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";

export default function UserCartItemsContent({ item, handleCartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const totalPrice =
    (item.salePrice ? item.salePrice : item.price) * item.quantity;

  const deleteCart = (item) => {
    dispatch(
      deletCartItems({ userId: user?.id, productId: item?.productId })
    ).then((data) => {
      if (data.payload.success) {
        toast({
          description: "Product Deleted Successfully",
        });
        dispatch(getCartItem(user?.id));
      }
    });
  };

  return (
    <div className="flex space-x-4 items-start">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="text-md font-semibold">{item.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={item.quantity === 1}
            onClick={() => handleCartItem(item, "decrease")}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className=" font-bold">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleCartItem(item, "increase")}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        <span>
          <Trash2 className="h=4 w-4" onClick={() => deleteCart(item)} />
        </span>
      </div>
    </div>
  );
}
