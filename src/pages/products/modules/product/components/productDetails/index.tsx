import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import formatPrice from '@/lib/formatPrice';
import { Product } from '@/types/products';
import QuantitySelector from '@/components/quantitySelector';
import useCart from '@/hooks/useCart';
import ProductWithVariants from '../variants';

const ProductDetails = ({
  product,
}: {
  product: Product | null;
}) => {
  const [quantity, setQuantity] = useState<number>(0)
  const { cart, handleAddCart } = useCart();

  const handleQuantity = (type: 'increment' | 'decrement' | 'reset'| 'load', value: number) => {
    if (type === 'reset') {
      setQuantity(0)
      return
    }
    if (type === 'load'){
      setQuantity(value)
      return
    }
    if (type === 'increment') {
      if (quantity < (product?.quantity ?? 0)) {
        setQuantity(quantity + 1);
      }
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const RenderView = useCallback(
    () => (
      <div className="flex flex-col gap-5 w-full sm:flex-col justify-between">
        <h5 className="text-xl font-bold font-poppins">{formatPrice(product?.pricePublic || 0)}</h5>
        <div className="flex flex-col gap-5 w-full px-2 h-108 overflow-y-auto">
          <QuantitySelector quantity={quantity} disabled={false} handleQuantity={(v) => handleQuantity(v, 0)} />
          <Button
            className="w-full"
            onClick={() => {
              if (!product?.id) return;
              handleAddCart({
                ...product,
                quantity,
              });
            }}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    ),
    [product, quantity, handleQuantity]
  );
  return product?.variantTypes.length ? (
    <ProductWithVariants product={product} quantity={quantity} handleQuantity={handleQuantity} />
  ) : (
    <RenderView />
  );
};

export default ProductDetails;
