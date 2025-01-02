import { Button } from "@/components/ui/button";
import banner from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import {
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
export default function ShoppingHome() {
  const slides = [banner, banner2, banner3];
  const [currentSlider, setCurrentSlider] = useState(0);
  const category = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlider((prev) => (prev + 1 + slides.length) % slides.length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="banner"
            className={`${
              index == currentSlider ? "opacity-100" : "opacity-0"
            } absolute w-full h-full top-0 left-0 object-cover transition-opacity duration-500`}
          />
        ))}
        <Button
          className="absolute top-1/2 left-4 h-8 w-8 bg-white/80 rounded-lg  transform -translate-y-1/2"
          variant="outline"
          size="icon"
          onClick={() => {
            setCurrentSlider(
              (prev) => (prev - 1 + slides.length) % slides.length
            );
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          className="absolute top-1/2 right-4 h-8 w-8 bg-white/80 rounded-lg  transform -translate-y-1/2"
          variant="outline"
          size="icon"
          onClick={() => {
            setCurrentSlider(
              (prev) => (prev + 1 + slides.length) % slides.length
            );
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container max-w-[1240px] mx-auto px-4">
          <h2 className="font-bold text-3xl text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-6">
            {category.map((Item) => {
              return (
                <Card
                  key={Item.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Item.icon className="h-12 w-12 text-primary" />
                    <h3 className="text-sm mt-2 font-bold">{Item.label}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
