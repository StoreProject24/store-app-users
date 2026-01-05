import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import CardProduct from '@/components/cardProduct';
import useCart from '@/hooks/useCart';
import useGetRelatedProducts from '@/queries/products/related';
import { Product } from '@/types/products';

interface ProductsRelatedProps {
  productId: number;
  categoryId: number;
}

const ProductsRelated = ({ productId, categoryId }: ProductsRelatedProps) => {
  const navigate = useNavigate();
  const {
    handleProductInCart,
    handleAddCart,
    handleDecreaseQuantityProduct,
    handleIncreaseQuantityProduct,
  } = useCart();
  const { products, isLoading } = useGetRelatedProducts(productId, categoryId);

  const handleProduct = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center w-full">
        {products?.map((product: Product) => (
          <CardProduct
            key={product.id}
            product={product}
            isProductInCart={handleProductInCart(product.id)}
            handleProduct={handleProduct}
            handleAddCart={handleAddCart}
            handleDecreaseQuantityProduct={handleDecreaseQuantityProduct}
            handleIncreaseQuantityProduct={handleIncreaseQuantityProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsRelated;
