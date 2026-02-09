import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Trash } from 'lucide-react';
import useCart from '@/hooks/useCart';
import { Button } from '../ui/button';
import formatPrice from '@/lib/formatPrice';
import useGetNameCategory from '@/hooks/useGetNameCategory';
import useCreateSale from '@/hooks/useCreateSale';
import LoadingIndicator from '../loadingIndicator';
const Cart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { createSale } = useCreateSale()
  const { getNameCategory } = useGetNameCategory();
  const { cart, removeCart, totalPriceCartProducts, clearCart } = useCart();

  const formatOrder = (idSale: string) => {
    const itemsList = cart
      .map(
        item =>
          `• ${item.name} ${item.combinationId && `- ${item.variantName}`} x${item.quantity} - ${formatPrice(item.pricePublic * item.quantity)}`
      )
      .join('\n');
    return (
      `🧾 *'🔢Id de venta: ${idSale}*\n\n` +
      `🧾 *Factura de compra*\n\n` +
      `👤 Cliente: *Lina Surmay*\n` +
      `📅 Fecha: ${new Date().toLocaleDateString()}\n\n` +
      `🛒 Productos:\n${itemsList}\n\n` +
      `💰 Total: *${formatPrice(totalPriceCartProducts)}*`
    );
  };

  const handleSendOrder = async () => {
    try {
      setIsLoading(true)
      const response = await createSale();
      const sale = response.data.sale
      const order = formatOrder(sale?._id);
      const phone = '573227537385';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(order)}`;
      window.open(url, '_blank');
      queryClient.invalidateQueries({ queryKey: ['product'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      clearCart();
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  };


  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-4 font-poppins">Carrito</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
          <p className="text-xl font-medium font-poppins dark:text-white">Tu carrito está vacío.</p>
          <Box className="w-10 h-10" />
        </div>
      ) : (
        <>
          <div className="overflow-y-auto h-[calc(100vh-17rem)] sm:h-[calc(100vh-12rem)]">
            {cart.map(item => (
              <div key={item.key} className="flex flex-row justify-between w-full gap-2 p-2">
                <img
                  src={item.image ?? 'https://placehold.co/600x400'}
                  alt={item.name}
                  className="w-0 h-0 sm:w-12 sm:h-12 rounded-full"
                />
                <div className="flex flex-row justify-between items-center w-full gap-2">
                  <div className="flex-col justify-start items-center gap-2 w-36">
                    <p className="text-sm font-medium font-poppins dark:text-white text-ellipsis  overflow-hidden">
                      {item.name} {item.combinationId && `~ ${item.variantName}`}
                    </p>
                    <p className="text-xs font-poppins text-gray-500 text-ellipsis text-nowrap overflow-hidden">
                      {getNameCategory(item.categoryId)}
                    </p>
                  </div>
                  <div className="flex justify-center items-center w-full">
                    <p className="text-xs text-center font-poppins text-gray-500">
                      X{item.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col justify-end items-end w-full gap-2">
                    <p className="text-sm font-bold font-poppins dark:text-white">
                      {formatPrice(item.pricePublic)}
                    </p>
                  </div>
                </div>
                <Button
                  className="flex  justify-center cursor-pointer items-center"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCart(item.key)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <hr className="my-2" />
          <div className="flex flex-col gap-4 justify-between w-full px-2">
            <div className="flex flex-row justify-between items-center w-full gap-2">
              <p className="text-lg font-bold font-poppins dark:text-white">Total</p>
              <p className="text-lg font-bold font-poppins dark:text-white">
                {formatPrice(totalPriceCartProducts)}
              </p>
            </div>
            <Button
              variant="default"
              disabled={isLoading}
              className="text-xs cursor-pointer p-4 rounded-4xl font-poppins dark:bg-black dark:text-white"
              onClick={handleSendOrder}
            >
              {
                isLoading ? <LoadingIndicator /> : "Enviar pedido"
              }
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
