import { useState } from "react";
import { useParams } from "react-router";
import formatPrice from "@/lib/formatPrice";
import useGetProduct from "@/queries/products/product";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import { BreadcrumbWithCustomSeparator } from "./components/breadcrum";
import ProductsRelated from "./components/productsRelated";

const Product = () => {
    const { id } = useParams();
    const { product, isLoading } = useGetProduct(Number(id));
    const { theme, toggleTheme } = useTheme();
    const [activeImage, setActiveImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    const handleNextImage = () => {
        if (activeImage < product?.images?.length - 1) {
            setActiveImage(activeImage + 1);
        }
    }

    const handlePreviousImage = () => {
        if (activeImage > 0) {
            setActiveImage(activeImage - 1);
        }
    }

    const handleQuantity = (type: "increment" | "decrement") => {
        if (type === "increment") {
            if (quantity < product?.quantity) {
                setQuantity(quantity + 1);
            }
        } else if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(1);
        }
    }
    if (isLoading) {
        return <div>Cargando...</div>
    }
    return (
        <div className="px-4">
            <BreadcrumbWithCustomSeparator />
            <Button variant="default" className="w-full cursor-pointer rounded-4xl font-poppins" onClick={toggleTheme}>
                {theme === "light" ? "Modo oscuro" : "Modo claro"}
            </Button>
            <div className="">
                <div className="flex flex-col gap-5 w-full sm:flex-row">
                    <div className="relative w-full sm:w-1/2">
                        <button className="absolute right-5 top-1/2 bg-white w-7 h-7 rounded-full cursor-pointer" onClick={handleNextImage}>
                            {'>'}
                        </button>
                        <button className="absolute left-5 top-1/2 bg-white w-7 h-7 rounded-full cursor-pointer" onClick={handlePreviousImage}>
                            {'<'}
                        </button>
                        <img src={product?.images?.[activeImage]?.urlImage || "https://placehold.co/300x200/222/fff.png?text=Imagen1"} alt={product?.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-5 w-full px-2 max-h-2xl sm:w-1/2">
                        <h1 className="text-2xl font-bold">{product?.name}</h1>
                        <p className="text-xl font-bold">{formatPrice(product?.pricePublic)}</p>
                        <p className="text-sm text-gray-500 h-80 text-ellipsis overflow-y-auto scroll-auto">
                            {product?.description}
                        </p>
                        <div className="flex flex-col gap-2 w-full">
                            <small>Cantidad:</small>
                            <div className="flex flex-row gap-2 w-full">
                                <div className="flex flex-row justify-between items-center gap-4 w-44">
                                    <button className="text-dark px-4 py-2 rounded-full bg-gray-100 cursor-pointer" onClick={() => handleQuantity("decrement")}>
                                        -
                                    </button>
                                    <p>{quantity}</p>
                                    <button className="text-dark px-4 py-2 rounded-full bg-gray-100 cursor-pointer" onClick={() => handleQuantity("increment")}>
                                        +
                                    </button>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <Button variant="default" className="w-full cursor-pointer rounded-4xl font-poppins">
                                        Agregar al carrito
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-10 border-t border-gray-200"></div>
                <div className="">
                    <div className="flex flex-row items-center justify-center gap-4 my-8">
                        <div className="border-t-2 border-gray-500 w-full rounded-full" />
                        <h2 className="text-2xl font-poppins font-bold text-center mb-4 w-1/2">
                            Productos relacionados
                        </h2>
                        <div className="border-t-2 border-gray-500 w-full rounded-full" />
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-row gap-8 mt-4 overflow-x-auto pb-4">
                            <ProductsRelated productId={product?.id} categoryId={product?.categoryId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Product;
