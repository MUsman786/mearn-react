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

export default function UserCartWrapper({ cart }) {
  return (
    <SheetContent className="max-w-sm overflow-auto">
      <SheetHeader>
        <SheetTitle>Cart</SheetTitle>
      </SheetHeader>
      <SheetDescription />
      <div className="mt-8 space-y-4">
        {cart?.map((item) => (
          <UserCartItemsContent key={item.productId} item={item} />
        ))}
      </div>
      {/* <Separator className="space-y-4 my-5" /> */}
      <div className="mt-8 space-y-4 flex justify-between">
        <span className="font-bold">Total</span>
        <span className="font-bold">$1000</span>
      </div>
      <Button className="w-full mt-5">Checkout</Button>
    </SheetContent>
  );
}
