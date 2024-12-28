import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ShopingProductTile({
  product,
  handelProductDetail,
  handelCardProduct,
}) {
  return (
    <Card className="w-full  max-w-sm mx-auto cursor-pointer">
      <div
        className="relative"
        onClick={() => {
          handelProductDetail(product?._id);
        }}
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover
        rounded-t-lg"
        />
        {product?.salePrice && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        )}
        <CardContent className="p-4">
          <h4 className="text-xl font-bold mb-2">{product?.title}</h4>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold text-primary ${
                product?.salePrice && "line-through"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice && (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          className="w-full"
          variant="default"
          onClick={() => {
            handelCardProduct(product?._id);
          }}
        >
          Add to Card
        </Button>
      </CardFooter>
    </Card>
  );
}
