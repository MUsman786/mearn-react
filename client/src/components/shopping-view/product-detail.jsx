import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { addCartItem, getCartItem } from "@/store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";

export default function ProductDetailsDailog({ open, setOpen, productDetail }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handelCardProduct = (productId) => {
    dispatch(addCartItem({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data.payload.success) {
          dispatch(getCartItem(user?.id));
          toast({
            description: "Product Add Successfully",
          });
        }
      }
    );
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[100vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-3 sm:p-8 max-w-[90vw] md:max-w-[80vw] lg:max-w-[70]">
          <div className="relative overflow-hidden rounded-lg ">
            <img
              src={productDetail?.image}
              alt={productDetail?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="  md:max-h-[80vh] overflow-auto p-3">
            <div>
              <DialogTitle className="text-4xl font-bold">
                {productDetail?.title}
              </DialogTitle>
              <DialogDescription className="text-sm my-4">
                {productDetail?.description}
              </DialogDescription>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-2xl font-semibold text-primary ${
                  productDetail.salePrice && "line-through"
                }`}
              >
                ${productDetail.price}
              </p>
              <p className="text-2xl font-semibold text-primary">
                {productDetail.salePrice && "$" + productDetail.salePrice}
              </p>
            </div>
            <div className="flex items-center mt-2 gap-2">
              <div className="flex items-center gap-0.5 ">
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
              </div>
              <span className="text-muted-foreground">(4.5)</span>
            </div>
            <div className="my-6">
              <Button
                className="w-full"
                onClick={() => {
                  handelCardProduct(productDetail?._id);
                }}
              >
                Add to Cart
              </Button>
            </div>
            <Separator />
            <div className="max-h-[300px] overflow-auto  p-3">
              <h2 className="text-2xl font-bold mt-3">Reviews</h2>
              <div className="flex gap-6 mt-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">User</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                    <StarIcon className="h-4 w-4 fill-primary" />
                  </div>
                  <p className=" font-normal text-sm">
                    this is an awesome product
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Input
                  placeholder="Add a review"
                  className="focus-visible:ring-transparent"
                />
                <Button className>Submit</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
