import { Label } from "@/components/ui/label";
import ProductFilter from "./filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/components/common/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDetail,
  fetchAllFilteredProducts,
  fetchSingleProduct,
} from "@/store/shop/product-slice";
import ShopingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDailog from "@/components/shopping-view/product-detail";
import { addCartItem, getCartItem } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productList, productDetail } = useSelector(
    (state) => state.shopProduct
  );
  const [filter, setFilter] = useState({});
  const [searchParems, setSearchParems] = useSearchParams();
  const [sort, setSort] = useState("price-lowtohigh");
  const [openDetailDilog, setOpenDetailDilog] = useState(false);

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

  const createSearcHParemsHelper = (filter) => {
    const queryParems = [];
    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value) && value.length > 0) {
        const paremValue = value.join(",");
        queryParems.push(`${key}=${encodeURIComponent(paremValue)}`);
      }
    }
    return queryParems.join("&");
  };

  useEffect(() => {
    if (Object.keys(filter).length > 0 || sort) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filter, sortParams: sort })
      );
    }
  }, [dispatch, filter, sort]);

  useEffect(() => {
    const storedFilter = sessionStorage.getItem("filter");
    if (storedFilter) {
      setFilter(JSON.parse(storedFilter));
    }
  }, []);

  useEffect(() => {
    if (productDetail && productDetail._id) {
      setOpenDetailDilog(true);
    }
  }, [productDetail]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const serchQueryString = createSearcHParemsHelper(filter);
      setSearchParems(new URLSearchParams(serchQueryString));
    }
  }, [filter]);

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilter = { ...filter };
    if (!copyFilter[getSectionId]) {
      copyFilter[getSectionId] = [];
    }
    const indexOfCurrentOption =
      copyFilter[getSectionId].indexOf(getCurrentOption);
    if (indexOfCurrentOption === -1) {
      copyFilter[getSectionId].push(getCurrentOption);
    } else {
      copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilter(copyFilter);
    sessionStorage.setItem("filter", JSON.stringify(copyFilter));
  };

  const handelProductDetail = (id) => {
    dispatch(fetchSingleProduct(id));
  };
  const handelProductDetailModal = () => {
    setOpenDetailDilog(false);
    dispatch(clearProductDetail());
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-extrabold text-lg">All Products</h2>
          <div className="flex items-center gap-4">
            <Label className="text-muted-foreground">
              {productList?.length} Product
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 m-4">
          {productList?.map((item) => (
            <ShopingProductTile
              product={item}
              key={item._id}
              handelProductDetail={handelProductDetail}
              handelCardProduct={handelCardProduct}
            />
          ))}
        </div>
      </div>
      {productDetail?._id && (
        <ProductDetailsDailog
          open={openDetailDilog}
          setOpen={handelProductDetailModal}
          productDetail={productDetail}
        />
      )}
    </div>
  );
}
