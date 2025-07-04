import { memo } from "react";
import { Product } from "@/types/products";
import CardProduct from "@/components/cardProduct";
import useCart from "@/hooks/useCart";

interface Props {
    products: Product[];
    lastElementRef: React.RefObject<HTMLDivElement>;
    handleProduct: (id: number) => void;
}

const ListProducts = ({ products, lastElementRef, handleProduct }: Props) => {
    const { handleAddCart, handleDecreaseQuantityProduct, handleIncreaseQuantityProduct, handleProductInCart } = useCart()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {
                products.map((product, index) => {
                    const isLast = index === products.length - 1;
                    return (
                        <CardProduct
                            key={product.id}
                            product={product}
                            isLast={isLast}
                            lastElementRef={lastElementRef}
                            handleProduct={handleProduct}
                            handleAddCart={handleAddCart}
                            handleDecreaseQuantityProduct={handleDecreaseQuantityProduct}
                            handleIncreaseQuantityProduct={handleIncreaseQuantityProduct}
                            isProductInCart={handleProductInCart(product.id)}
                        />
                    );
                })
            }
        </div>

    )
}

export default memo(ListProducts);