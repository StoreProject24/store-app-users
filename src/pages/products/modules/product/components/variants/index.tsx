import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import QuantitySelector from '@/components/quantitySelector';
import { Button } from '@/components/ui/button';
import formatPrice from '@/lib/formatPrice';
import { cn } from '@/lib/utils';
import { Product } from '@/types/products';
import { CartItem } from '@/types/cart';
import useCart from '@/hooks/useCart';

interface Props {
  product: Product;
  variantQuantities: Record<number, number>;
  handleVariantQuantity: (id: number, v: 'increment' | 'decrement' | 'reset' | 'load') => void;
  handleAddCart: (v: Omit<CartItem, 'key'>) => void;
}

const ProductWithVariants = ({ product, variantQuantities, handleVariantQuantity, handleAddCart }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const { handleProductInCart } = useCart();
  const selectedCombination = useMemo(() => {
    return product?.variantCombinations.find(comb =>
      comb.values.every(v => selectedOptions[v.option.typeId] === v.optionId)
    );
  }, [selectedOptions]);

  const isOptionAvailable = (typeId: number, optionId: number) => {
    return product?.variantCombinations.some(comb =>
      comb.values.some(v => v.option.typeId === typeId && v.optionId === optionId)
    );
  };

  const variantName = useMemo(() => {
    if (!selectedCombination) return '';

    return selectedCombination.values
      .map(v => {
        const type = product.variantTypes.find(t => t.id === v.option.typeId);
        return type
          ? `${type.name}: ${v.option.name}`
          : v.option.name;
      })
      .join(' - ');
  }, [selectedCombination, product.variantTypes]);


  const variantInCart = selectedCombination
    ? handleProductInCart(product.id, selectedCombination.id)
    : undefined;

  const availableStock = selectedCombination
    ? selectedCombination.quantity - (variantInCart?.quantity ?? 0)
    : 0;

  const currentQuantity = selectedCombination
    ? Math.min(
      variantQuantities[selectedCombination.id] ?? 1,
      availableStock
    )
    : 1;

  return (
    <>
      {product?.variantTypes.map((type, typeIndex) => (
        <motion.div
          key={type.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: typeIndex * 0.1 }}
          className="py-1"
        >
          <p className="font-semibold mb-2">{type.name}</p>
          <div className="flex gap-2 flex-wrap">
            {type.options.map((option, optionIndex) => {
              const isSelected = selectedOptions[type.id] === option.id;
              const isAvailable = isOptionAvailable(type.id, option.id);
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: typeIndex * 0.1 + optionIndex * 0.05,
                  }}
                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                  onClick={() => {
                    if (!isAvailable) return;
                    setSelectedOptions(prev => ({
                      ...prev,
                      [type.id]: option.id,
                    }));
                    handleVariantQuantity(1, 'reset');
                  }}
                  className={cn(
                    'px-3 py-1 rounded border text-sm transition cursor-pointer',
                    isSelected && 'bg-black text-white border-black',
                    !isSelected && isAvailable && 'bg-white hover:border-black',
                    !isAvailable && 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                  )}
                >
                  {option.name}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      ))}

      {selectedCombination && selectedCombination.quantity > 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <QuantitySelector
            quantity={currentQuantity}
            disabled={currentQuantity >= availableStock}
            handleQuantity={(type) => {
              handleVariantQuantity(selectedCombination.id, type);
            }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="border-t pt-4 space-y-1"
      >
        {selectedCombination ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-2xl font-bold">{formatPrice(selectedCombination.pricePublic)}</p>
            <div className="flex flex-row justify-between mb-2">
              <small className="text-sm text-gray-500 font-semibold">
                Stock: <small className="font-normal text-sm">{availableStock}</small>
              </small>
              <small className="text-sm text-gray-500 font-semibold">
                SKU: <small className="font-normal text-sm">{selectedCombination.sku}</small>
              </small>
            </div>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 text-sm my-2"
          >
            Selecciona todas las opciones para ver el precio
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Button
          disabled={!selectedCombination || availableStock === 0}
          className="w-full"
          onClick={() => {
            if (!selectedCombination) return;
            handleAddCart({
              productId: product.id,
              combinationId: selectedCombination.id,
              name: product.name,
              pricePublic: selectedCombination.pricePublic,
              quantity: currentQuantity,
              variantName,
              stock: selectedCombination.quantity,
              image: product.images?.[0]?.urlImage,
              categoryId: product.categoryId,
            });
            handleVariantQuantity(selectedCombination.id, 'reset');
          }}
        >
          Agregar al carrito
        </Button>
      </motion.div>
    </>
  );
};

export default ProductWithVariants;