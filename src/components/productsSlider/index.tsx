import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel"

export function CarouselSize() {
    const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )
  const carouselRef = useRef<HTMLDivElement>(null);
  const { api } = useCarousel();

  useEffect(() => {
    if (carouselRef.current) {
      api.scrollTo(0);
    }
  }, [api]);

  api.on("select", () => {
    console.log("select");
  });

  api.on("scroll", () => {
    console.log("scroll");
  });
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
        
      }}
      plugins={[
        autoplay.current
      ]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      className="sm:w-full mx-8"
    >
      <CarouselContent className="ml-0 justify-center" ref={carouselRef}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/9 sm:basis-1/8 md:basis-1/5 lg:basis-1/6 2xl:basis-1/6">
            <div className="p-2">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>

                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-8" />
      <CarouselNext className="mr-8" />
    </Carousel>
  )
}
