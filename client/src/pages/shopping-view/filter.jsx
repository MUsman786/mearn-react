import { filterOptions } from "@/components/common/config";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

export default function ProductFilter({ filter, handleFilter }) {
  const handleCheckboxChange = (sectionId, optionId) => {
    handleFilter(sectionId, optionId);
  };
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold"> Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((productItem) => (
          <Fragment key={productItem}>
            <div>
              <h3 className="text-base font-bold">{productItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[productItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2  font-normal"
                  >
                    <Checkbox
                      checked={filter[productItem]?.includes(option.id)}
                      onCheckedChange={() =>
                        handleCheckboxChange(productItem, option.id)
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
