import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/products";
import formatPrice from "@/lib/formatPrice";
import { CartItem } from "@/store/cart/type";


interface CardProductProps {
    product: Product;
    isLast?: boolean;
    lastElementRef?: React.RefObject<HTMLDivElement>;
    handleProduct: (id: number) => void;
    handleAddCart: (product: Product) => void;
    handleDecreaseQuantityProduct: (id: number, product: Product) => void;
    handleIncreaseQuantityProduct: (product: Product) => void;
    isProductInCart: CartItem | undefined;
}

const CardProduct = ({ product, isLast, lastElementRef, handleProduct, isProductInCart, handleAddCart, handleDecreaseQuantityProduct, handleIncreaseQuantityProduct }: CardProductProps) => {
    return (
        <Card
            className="w-full h-90 rounded-2xl p-4 flex flex-col relative gap-0"
            ref={isLast ? lastElementRef : null}
        >
            <CardHeader className="m-0 p-0 relative">
                <img
                    src={product.images?.[0]?.urlImage ?? "https://placehold.co/600x400"}
                    alt={product.name}
                    className="object-cover h-52 rounded-2xl w-full"
                />
                <Button variant="default" className="text-xs cursor-pointer p-4 h-7 rounded-4xl font-poppins absolute top-40 right-3 mt-2 dark:bg-black dark:text-white" onClick={() => handleProduct(product.id)}>
                    Ver
                </Button>
            </CardHeader>
            <CardContent className="m-0 p-1">
                <div className="flex-col justify-between gap-2 pb-2 h-16">
                    <p className="font-medium text-black w-full text-ellipsis overflow-hidden font-poppins dark:text-white">
                        {product.name}
                    </p>
                    <small className="line-clamp-2 text-xs  text-gray-500 w-full font-poppins dark:text-white">
                        {product.description}
                    </small>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-xl font-bold text-black max-w-52 text-ellipsis overflow-hidden font-poppins dark:text-white">
                        {formatPrice(product.pricePublic)}
                    </p>
                    {
                        isProductInCart ? (
                            <div className="flex flex-row justify-between items-center gap-2">
                                <Button variant="default" className="text-xs cursor-pointer p-4 rounded-4xl font-poppins dark:bg-black dark:text-white" onClick={() => handleDecreaseQuantityProduct(product.id, product)}>
                                    -
                                </Button>
                                <p className="text-xs font-poppins dark:text-white">{isProductInCart.quantity}</p>
                                {
                                    isProductInCart.quantity < product.quantity && (
                                        <Button variant="default" className="text-xs cursor-pointer p-4 rounded-4xl font-poppins dark:bg-black dark:text-white" onClick={() => handleIncreaseQuantityProduct(product)}>
                                            +
                                        </Button>
                                    )
                                }
                            </div>
                        ) : (
                            <Button variant="default" className="text-xs cursor-pointer p-4 rounded-4xl font-poppins dark:bg-black dark:text-white" onClick={() => handleAddCart(product)}>
                                Agregar
                            </Button>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default CardProduct;