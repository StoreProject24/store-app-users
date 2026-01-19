import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useGetRandomProducts from '@/queries/products/random';
import { Product } from '@/types/products';
import CardProduct from '@/components/cardProduct';
import useCart from '@/hooks/useCart';

const FeatureProducts = () => {
  const { products, isLoading, isError } = useGetRandomProducts();
  const {
    handleAddCart,
    handleDecreaseQuantityProduct,
    handleIncreaseQuantityProduct,
    handleProductInCart,
    
  } = useCart();
  const navigate = useNavigate();
  
  const handleProduct = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (isError) {
    return <div>Error al cargar los productos</div>;
  }
  
  return (
    <article className="py-4">
      <div className="flex flex-row items-center justify-center gap-4 my-8">
        <div className="border-t-2 border-gray-500 w-full rounded-full" />
        <h2 className="text-2xl font-poppins font-bold text-center mb-4 w-1/2">
          Productos destacados
        </h2>
        <div className="border-t-2 border-gray-500 w-full rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center w-full">
        {products?.map((product: Product) => {
          const cartItem = handleProductInCart(product.id);
          return <CardProduct
          key={product.id}
          product={product}
          cartItem={cartItem}
          isProductInCart={!!cartItem}
          handleProduct={handleProduct}
          handleAddCart={(v)=> handleAddCart({
            productId: v.id,
            name: v.name,
            pricePublic: v.pricePublic,
            stock: v.quantity,
            categoryId: v.categoryId,
            quantity: 1,
            image: v.images[0]?.urlImage
          })}
          handleDecreaseQuantityProduct={() => handleDecreaseQuantityProduct(product.id.toString())}
          handleIncreaseQuantityProduct={() =>  handleIncreaseQuantityProduct(product.id.toString())}
          // handleAddCart={handleAddCart}
          // handleDecreaseQuantityProduct={handleDecreaseQuantityProduct}
          // handleIncreaseQuantityProduct={handleIncreaseQuantityProduct}
        />
        })}
      </div>
    </article>
  );
};

export default FeatureProducts;
