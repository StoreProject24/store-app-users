import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import CardProduct from '@/components/cardProduct';
import useCart from '@/hooks/useCart';
import useGetRelatedProducts from '@/queries/products/related';
import { Product } from '@/types/products';
import Loading from '@/components/loading';
import ProductCardSkeleton from '../../../../components/skeletonProducts';

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

  return (
    <Loading isLoading={isLoading} component={<ProductCardSkeleton limit={5} />}>
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products?.map((product: Product) => {
          const cartItem = handleProductInCart(product.id)
          return (
            <CardProduct
            key={product.id}
            product={product}
            isProductInCart={!!cartItem}
            handleProduct={handleProduct}
            cartItem={cartItem}
            handleAddCart={(v)=> handleAddCart({
              productId: v.id,
              name: v.name,
              pricePublic: v.pricePublic,
              quantity: 1,
              stock: v.quantity,
              categoryId: v.categoryId,
              image: v.images[0]?.urlImage
            })}
            handleDecreaseQuantityProduct={() => handleDecreaseQuantityProduct(product.id.toString())}
            handleIncreaseQuantityProduct={() =>  handleIncreaseQuantityProduct(product.id.toString())}
            // handleAddCart={handleAddCart}
            // handleDecreaseQuantityProduct={handleDecreaseQuantityProduct}
            // handleIncreaseQuantityProduct={handleIncreaseQuantityProduct}
          />
          )
        })}
      </div>
    </Loading>
  );
};

export default ProductsRelated;
