import { useState } from 'react';
import { useParams } from 'react-router';
import useGetProduct from '@/queries/products/product';
import { BreadcrumbWithCustomSeparator } from './components/breadcrum';
import ProductsRelated from './components/productsRelated';
import ProductDetails from './components/productDetails';

const Product = () => {
  const { id } = useParams();
  const { product, isLoading } = useGetProduct(Number(id));
  const [activeImage, setActiveImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantity = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      if (quantity < (product?.quantity ?? 0)) {
        setQuantity(quantity + 1);
      }
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="px-4">
      <BreadcrumbWithCustomSeparator />
      <div className="flex flex-col gap-5 w-full sm:flex-row">
        <div className='hidden md:block h-[40rem] overflow-auto p-2'>
          <div className="flex flex-col gap-5 w-32 h-32">
            {product?.images?.map((image, index) => {
              const isActive = index === activeImage;
              return (
                <button
                  key={image.urlImage}
                  onClick={() => setActiveImage(index)}
                  className={`w-32 h-32 border-2 rounded-lg cursor-pointer aspect-square ${isActive ? 'border-gray-500' : ''}`}
                >
                  <img
                    src={image.urlImage}
                    alt={product?.name}
                    className="w-full h-full object-cover rounded-lg bg-white"
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="w-full sm:w-1/2 h-[40rem] rounded-xl">
          <img src={product?.images?.[activeImage].urlImage} alt={product?.name} className="w-full h-full object-cover rounded-xl" />
        </div>
        <div className='md:hidden flex flex-row gap-5 w-full overflow-x-auto pb-2'>
          {product?.images?.map((image, index) => {
            const isActive = index === activeImage;
            return (
              <button
                key={image.urlImage}
                onClick={() => setActiveImage(index)}
                className={`w-32 h-32 border-2 rounded-lg cursor-pointer aspect-square ${isActive ? 'border-gray-500' : ''}`}
              >
                <img
                  src={image.urlImage}
                  alt={product?.name}
                  className="w-full h-full object-cover rounded-lg bg-white"
                />
              </button>
            )
          })}
          {/* </div> */}
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-bold font-poppins">{product?.name}</h4>
          <ProductDetails product={product ?? null} quantity={quantity} handleQuantity={handleQuantity} />
        </div>
      </div>
      <div className="">
        <div className="flex flex-row items-center justify-center gap-4 my-8">
          <div className="border-t-2 border-gray-500 w-full rounded-full" />
          <h2 className="text-2xl font-poppins font-bold text-center mb-4 w-1/2">
            Productos relacionados
          </h2>
          <div className="border-t-2 border-gray-500 w-full rounded-full" />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-row gap-8 mt-4 overflow-x-auto pb-4">
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
