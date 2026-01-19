import { useMemo, useState } from 'react';
import QuantitySelector from '@/components/quantitySelector';
import { Button } from '@/components/ui/button';
import formatPrice from '@/lib/formatPrice';
import { cn } from '@/lib/utils';
import { Product } from '@/types/products';
import { CartItem } from '@/types/cart';

interface Props {
  product: Product;
  variantQuantities: Record<number, number>;
  handleVariantQuantity: (id: number, v: 'increment' | 'decrement' | 'reset' | 'load') => void;
  handleAddCart: (v: Omit<CartItem, 'key'>) => void;
}

const ProductWithVariants = ({ product, variantQuantities, handleVariantQuantity, handleAddCart }: Props) => {
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

  const currentQuantity = selectedCombination
    ? variantQuantities[selectedCombination.id] ?? 1
    : 1;

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
                    setSelectedOptions(prev => ({
                      ...prev,
                      [type.id]: option.id,
                    }));
                    handleVariantQuantity(0, "reset")
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
          quantity={currentQuantity}
          disabled={currentQuantity >= selectedCombination.quantity}
          handleQuantity={(type) => {
            handleVariantQuantity(selectedCombination.id, type)
          }}
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
          console.log("selectedCombination.values[0] ", selectedCombination)
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
          
        }}
      >
        Agregar al carrito
      </Button>
    </>
  );
};

export default ProductWithVariants;
