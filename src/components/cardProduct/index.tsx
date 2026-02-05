import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/products';
import formatPrice from '@/lib/formatPrice';
import { CartItem } from '@/types/cart';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface Props {
  product: Product;
  isLast?: boolean;
  lastElementRef?: React.RefObject<HTMLDivElement>;
  isProductInCart: boolean;
  cartItem?: CartItem;
  className?: ClassNameValue;
  handleProduct: (id: number) => void;
  handleAddCart: (product: Product) => void;
  handleDecreaseQuantityProduct: (key: string, product: Product) => void;
  handleIncreaseQuantityProduct: (key: string) => void;
}

const CardProduct = ({
  product,
  isLast,
  lastElementRef,
  isProductInCart,
  cartItem,
  className = '',
  handleProduct,
  handleAddCart,
  handleDecreaseQuantityProduct,
  handleIncreaseQuantityProduct,
}: Props) => {
  const hasVariants = product?.variantTypes?.length > 0

  const handleCheckEveryCombinatinationHasSameValue = () => {
    if (product.variantTypes.length !== 1) return
    const value = product.variantCombinations[0].pricePublic
    const isEqualPrice = product?.variantCombinations.every((combination) => combination.pricePublic === value)
    if (isEqualPrice) return value
    return false
  }

  const isEqualPrice = handleCheckEveryCombinatinationHasSameValue()
  
  return (
    <Card className={twMerge('p-4', className)} ref={isLast ? lastElementRef : null} onClick={(e) => {
      e.stopPropagation()
      handleProduct(product.id)
    }}>
      <CardHeader className="m-0 p-0 relative">
        <img
          src={product.images?.[0]?.urlImage ?? 'https://placehold.co/600x400'}
          alt={product.name}
          className="object-cover h-52 w-full rounded-2xl"
        />
        <Button
          variant="default"
          className="text-xs cursor-pointer p-4 h-7 rounded-4xl font-poppins absolute top-40 right-3 mt-2 dark:bg-black dark:text-white"
          onClick={(e) => {
            e.stopPropagation()
            handleProduct(product.id)
          }}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="m-0 p-1">
        <div className="flex-col justify-between gap-2 pb-2 h-16">
          <p className="font-medium text-black w-full font-poppins dark:text-white 
              xs:text-xs sm:text-base 
              line-clamp-2">
            {product.name}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          {
            !hasVariants || typeof isEqualPrice === 'number'  ? (
              <p className="text-xl font-bold text-black max-w-52 text-ellipsis overflow-hidden font-poppins dark:text-white xs:text-xs">
              {formatPrice(hasVariants ? isEqualPrice as number : product.pricePublic)}
            </p>
            ): null
          }
          {isProductInCart && cartItem ? (
            <div className="flex flex-row justify-between items-center gap-2">
              <Button
                variant="default"
                className="z-10 text-xs cursor-pointer p-4 rounded-4xl font-poppins dark:bg-black dark:text-white @max-xs:p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecreaseQuantityProduct(cartItem?.key, product)
                }}
              >
                -
              </Button>
              <p className="text-xs font-poppins dark:text-white">{cartItem.quantity}</p>
              <Button
                variant="default"
                disabled={cartItem.quantity >= product.quantity}
                className="z-10 text-xs cursor-pointer p-4 rounded-4xl font-poppins dark:bg-black dark:text-white @max-xs:p-2"
                onClick={(e) => {
                  e.stopPropagation()
                  handleIncreaseQuantityProduct(cartItem.key)
                }}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              className="z-10 text-xs cursor-pointer p-4 rounded-4xl font-poppins dark:bg-black dark:text-white @max-xs:disabled"
              onClick={(e) => {
                e.stopPropagation()
                if (hasVariants) {
                  handleProduct(product.id)
                } else {
                  handleAddCart(product)
                }
              }}
            >
              {hasVariants ? "Variantes" : <ShoppingCartIcon color="text-white" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProduct;
