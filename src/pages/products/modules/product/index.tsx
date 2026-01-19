import { useState } from 'react';
import { useParams } from 'react-router';
import useGetProduct from '@/queries/products/product';
import { BreadcrumbWithCustomSeparator } from './components/breadcrum';
import ProductsRelated from './components/productsRelated';
import ProductDetails from './components/productDetails';
import useCart from '@/hooks/useCart';

const Product = () => {
  const { id } = useParams();
  const { product, isLoading } = useGetProduct(Number(id));
  const [activeImage, setActiveImage] = useState<number>(0);
  const cart = useCart();

  const handleAddToCart = () => {};

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="px-4">
      <BreadcrumbWithCustomSeparator />
      <div className="flex flex-col gap-5 w-full md:flex-row">
        <div className="w-full h-80 md:w-1/2 sm:h-160 rounded-xl">
          <img
            src={product?.images?.[activeImage]?.urlImage ?? 'https://placehold.co/600x400'}
            alt={product?.name}
            className="w-full h-2/3 object-cover rounded-xl border-2"
          />
          <div className="w-full overflow-auto pb-3">
            <div className="flex flex-row gap-1 sm:gap-5 sm:w-32 sm:h-36 mt-2">
              {product?.images.map((image, index) => {
                const isActive = index === activeImage;
                return (
                  <button
                    key={image.urlImage}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 sm:w-32 sm:h-32 border-2 rounded-lg cursor-pointer aspect-square ${isActive ? 'border-gray-500' : ''}`}
                  >
                    <img
                      src={image.urlImage}
                      alt={product?.name}
                      className="w-full h-full object-cover rounded-lg bg-white"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-bold">{product?.name}</h4>
          <small className="text-sm text-gray-500">Descripcion</small>
          <div className="h-20 sm:h-64 overflow-y-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description ?? '',
              }}
              className="text-gray-600"
            />
          </div>
          <ProductDetails
            product={product ?? null}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-center gap-4 my-8">
          <div className="border-t-2 border-gray-500 w-full rounded-full" />
          <h2 className="text-2xl font-bold text-center mb-4 w-1/2">Productos relacionados</h2>
          <div className="border-t-2 border-gray-500 w-full rounded-full" />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-row gap-8 mt-4 overflow-x-auto pb-4 w-full">
            {typeof product?.id === 'number' && typeof product?.categoryId === 'number' ? (
              <ProductsRelated productId={product.id} categoryId={product.categoryId} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
