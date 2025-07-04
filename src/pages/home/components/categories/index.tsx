import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCategoriesStore } from "@/store/categories";

export default function Categories() {
  const navigate = useNavigate();
  const { categories } = useCategoriesStore();

  const handleCategory = useCallback((id: number) => {
    navigate(`/products?categoryId=${id}`);
  }, [navigate]);

  return (
    <article className="py-8">
      <div className="flex flex-row items-center justify-center gap-4 my-8">
        <div className="border-t-2 border-gray-500 w-full rounded-full" />
        <h2 className="text-2xl font-poppins font-bold text-center mb-4 ">Categorías</h2>
        <div className="border-t-2 border-gray-500 w-full rounded-full" />
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full overflow-hidden justify-between items-center"
      >
        <CarouselContent className="space-x-2">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="rounded-2xl basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/4">
              <Card className="w-full rounded-2xl flex flex-col mb-1 relative gap-0 p-1">
                <CardHeader className="p-0 m-2">
                  <img
                    // src={category.imageUrl}
                    src="https://placehold.co/600x400"
                    alt={category.name}
                    className="object-cover w-full h-full rounded-2xl"
                  />
                  <Button variant="default" className=" text-xs cursor-pointer w-14 rounded-4xl font-poppins absolute top-48 mt-2 right-5 dark:bg-black dark:text-white" onClick={() => handleCategory(category.id)}>
                    Ver
                  </Button>
                </CardHeader>
                <CardFooter className="flex flex-row justify-between items-center m- p-0 px-4">
                  <p className="text-sm font-medium text-gray-500 max-w-52 text-ellipsis overflow-hidden font-poppins">{category.name}</p>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </article>
  );
}
