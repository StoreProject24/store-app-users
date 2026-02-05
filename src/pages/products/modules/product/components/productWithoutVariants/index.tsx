import { motion } from 'framer-motion';
import { Product } from "@/types/products";
import formatPrice from "@/lib/formatPrice";
import QuantitySelector from "@/components/quantitySelector";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart";
import useCart from '@/hooks/useCart';


interface Props {
  product: Product
  quantity: number
  handleQuantity: (type: 'increment' | 'decrement' | 'reset' | 'load', value: number) => void
  handleAddCart: (v: Omit<CartItem, 'key'>) => void;
}

const ProductWithoutVariants = ({ product, quantity, handleQuantity, handleAddCart }: Props) => {
  const {handleProductInCart} = useCart()
  const productInCart = handleProductInCart(product.id)
  const availableStock = product.quantity - (productInCart?.quantity ?? 0);

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="flex flex-col gap-5 w-full sm:flex-col justify-between"
  >
    <motion.h5
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="text-xl font-bold font-poppins"
    >
      {formatPrice(product?.pricePublic || 0)}
    </motion.h5>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="flex flex-col gap-5 w-full px-2 overflow-y-auto"
    >
      <QuantitySelector
        quantity={quantity}
        disabled={availableStock === 0 || quantity >= availableStock}
        handleQuantity={v => handleQuantity(v, 0)}
      />
      <div className="flex flex-row justify-between mb-2">
        <small className="text-sm text-gray-500 font-semibold">
          Stock: <small className="font-normal text-sm">{availableStock}</small>
        </small>
        <small className="text-sm text-gray-500 font-semibold">
          SKU: <small className="font-normal text-sm">{product.sku}</small>
        </small>
      </div>
      <Button
        className="w-full"
        variant="default"
        disabled={availableStock === 0}
        onClick={() => {
          if (!product?.id) return;
          handleAddCart({
            productId: product.id,
            name: product.name,
            pricePublic: product.pricePublic,
            quantity,
            stock: product.quantity,
            image: product.images?.[0]?.urlImage,
            categoryId: product.categoryId,
          });
          handleQuantity('reset', 1)
        }}
      >
        Agregar al carrito
      </Button>
    </motion.div>
  </motion.div>
  )
}

export default ProductWithoutVariants