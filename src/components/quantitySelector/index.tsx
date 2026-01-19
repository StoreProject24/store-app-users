import { Props } from './type';

const QuantitySelector = ({ quantity, disabled, handleQuantity }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 my-2">
      <span className="font-semibold underline">Cantidad</span>
      <div className="flex items-center border rounded">
        <button
          onClick={() => handleQuantity('decrement')}
          disabled={quantity <= 1}
          className="px-3 py-1 disabled:opacity-50 cursor-pointer"
        >
          −
        </button>

        <span className="px-4 text-sm font-semibold">{quantity}</span>

        <button
          onClick={() => handleQuantity('increment')}
          disabled={disabled}
          className="px-3 py-1 disabled:opacity-50 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
