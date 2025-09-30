import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import formatPrice from "@/lib/formatPrice";
import { Product } from "@/types/products";

const ProductDetails = ({ product, quantity, handleQuantity }: { product: Product | null, quantity: number, handleQuantity: (type: 'increment' | 'decrement') => void }) => {
    const RenderViewVariants = useCallback(() => {
        return (
            <></>
        )
    }, [])
    const RenderView = useCallback(() => (
        <div className="flex flex-col gap-5 w-full sm:flex-col justify-between">
            <h5 className="text-xl font-bold font-poppins">{formatPrice(product?.pricePublic || 0)}</h5>
            <div className="flex flex-col gap-5 w-full px-2 h-[27rem] overflow-y-auto">
                <p className="text-sm text-gray-500 font-poppins">
                    {product?.description}
                </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <small>Cantidad:</small>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-row justify-between items-center gap-4 w-44">
                        <button
                            className="text-dark px-4 py-2 rounded-full bg-gray-100 cursor-pointer"
                            onClick={() => handleQuantity('decrement')}
                        >
                            -
                        </button>
                        <p>{quantity}</p>
                        <button
                            className="text-dark px-4 py-2 rounded-full bg-gray-100 cursor-pointer"
                            onClick={() => handleQuantity('increment')}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex gap-2 w-full">
                        <Button
                            variant="default"
                            className="w-full cursor-pointer rounded-4xl font-poppins"
                        >
                            Agregar al carrito
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ), [product, quantity, handleQuantity])
    return (
        Array.isArray(product?.variants) && product.variants.length > 0
            ? <RenderViewVariants />
            : <RenderView />
    )
}

export default ProductDetails;