import { useMemo, useState } from 'react';
import QuantitySelector from '@/components/quantitySelector';
import { Button } from '@/components/ui/button';
import formatPrice from '@/lib/formatPrice';
import { cn } from '@/lib/utils';
import { Product } from '@/types/products';

interface Props {
  product: Product;
  quantity: number;
  handleQuantity: (v: 'increment' | 'decrement' | 'reset' | 'load') => void;
}

const ProductWithVariants = ({ product, quantity, handleQuantity }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});

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

  return (
    <>
      <p className="my-2 font-semibold underline">Variantes</p>
      {product?.variantTypes.map(type => (
        <div key={type.id} className="py-1">
          <p className="font-semibold mb-2">{type.name}</p>
          <div className="flex gap-2">
            {type.options.map(option => {
              const isSelected = selectedOptions[type.id] === option.id;
              const isAvailable = isOptionAvailable(type.id, option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (!isAvailable) return;
                    console.log("option", option)
                    setSelectedOptions(prev => ({
                      ...prev,
                      [type.id]: option.id,
                    }));
                    if (quantity !== 1) {
                      handleQuantity('decrement');
                    }
                  }}
                  className={cn(
                    'px-3 py-1 rounded border text-sm transition',
                    isSelected && 'bg-black text-white border-black',
                    !isSelected && isAvailable && 'bg-white hover:border-black',
                    !isAvailable && 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                  )}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {selectedCombination && selectedCombination.quantity > 1 && (
        <QuantitySelector
          quantity={quantity}
          disabled={quantity >= selectedCombination.quantity}
          handleQuantity={handleQuantity}
        />
      )}

      <div className="border-t pt-4 space-y-1">
        {selectedCombination ? (
          <>
            <p className="text-2xl font-bold">{formatPrice(selectedCombination.pricePublic)}</p>
            <div className="flex flex-row justify-between mb-2">
              <small className="text-sm text-gray-500 font-semibold">
                Stock: <small className="font-normal text-sm">{selectedCombination.quantity}</small>
              </small>
              <small className="text-sm text-gray-500 font-semibold">
                SKU: <small className="font-normal text-sm">{selectedCombination.sku}</small>
              </small>
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-sm my-2">
            Selecciona todas las opciones para ver el precio
          </p>
        )}
      </div>
      <Button
        disabled={!selectedCombination || selectedCombination.quantity === 0}
        className="w-full"
        onClick={() => {
          if (!selectedCombination) return;

          console.log({
            productId: product?.id,
            combinationId: selectedCombination.id,
            quantity,
          });
        }}
      >
        Agregar al carrito
      </Button>
    </>
  );
};

export default ProductWithVariants;
