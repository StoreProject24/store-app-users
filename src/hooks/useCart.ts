import { useCallback, useMemo } from "react";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types/products";

const useCart = () => {
    const { cart, addCart, removeCart, clearCart, increaseQuantityProduct, decreaseQuantityProduct } = useCartStore();

    const handleAddCart = useCallback((product: Product) => {
        const isProductInCart = cart.find((item) => item.id === product.id);
        if (!isProductInCart) {
            addCart({ ...product, quantity: 1 });
        }
    }, [cart, addCart]);

    const handleIncreaseQuantityProduct = useCallback((product: Product) => {
        const isProductInCart = cart.find((item) => item.id === product.id);
        if (isProductInCart) {
            if (isProductInCart.quantity < product.quantity){
                increaseQuantityProduct(product.id);
            }
        }
    }, [cart, increaseQuantityProduct]);

    const handleDecreaseQuantityProduct = useCallback((id: number, product: Product) => {
        const isProductInCart = cart.find((item) => item.id === product.id);
        if (isProductInCart) {
            if (isProductInCart.quantity !== 0) {
                if ((isProductInCart.quantity - 1)=== 0){
                    removeCart(id);
                }else {
                    decreaseQuantityProduct(product.id);
                }
            }
        }
    }, [cart, removeCart, decreaseQuantityProduct]);

    const handleRemoveCart = useCallback((id: number) => removeCart(id), [removeCart]);

    const handleProductInCart = useCallback((id: number) => {
        return cart.find((item) => item.id === id);
    }, [cart]);

    const totalCartProducts = useMemo(() => {
        return cart.length
    }, [cart]);

    const totalPriceCartProducts = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.pricePublic * item.quantity, 0);
    }, [cart]);

    const handleClearCart = useCallback(() => {
        clearCart();
    }, [clearCart]);

    return { cart, handleAddCart, handleRemoveCart, handleClearCart, handleProductInCart, totalCartProducts,totalPriceCartProducts, handleIncreaseQuantityProduct, handleDecreaseQuantityProduct};
}

export default useCart;