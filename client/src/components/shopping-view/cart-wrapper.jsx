import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { useDispatch, useSelector } from "react-redux";
import {
  deletCartItems,
  getCartItem,
  UpdatedCartItem,
} from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";

export default function UserCartWrapper({ cart }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.cartItems);
  // const loading = useSelector(selectCartLoading);
  console.log(isLoading);

  const handleCartItem = (item, type) => {
    const quantity =
      type === "increase" ? item.quantity + 1 : item.quantity - 1;
    dispatch(
      UpdatedCartItem({
        userId: user?.id,
        productId: item?.productId,
        quantity,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast({
          description: "Cart Updated Successfully",
        });
        dispatch(getCartItem(user?.id));
      }
    });
  };

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
    <SheetContent className="max-w-sm overflow-auto">
      <SheetHeader>
        <SheetTitle>Cart</SheetTitle>
      </SheetHeader>
      <SheetDescription />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            {cart &&
              cart.length > 0 &&
              cart?.map((item) => (
                <UserCartItemsContent
                  key={item.productId}
                  item={item}
                  handleCartItem={handleCartItem}
                  deleteCart={deleteCart}
                />
              ))}
          </div>
          {/* <Separator className="space-y-4 my-5" /> */}
          <div className="mt-8 space-y-4 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">$1000</span>
          </div>
          <Button className="w-full mt-5">Checkout</Button>
        </>
      )}
    </SheetContent>
  );
}
