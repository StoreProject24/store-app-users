import { useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import useGetProducts from "@/queries/products";
import Spinner from "@/components/ui/spinner";
import Loading from "@/components/loading";
import ProductCardSkeleton from "./components/skeletonProducts";
import ListProducts from "./components/listProducts";
import Filters from "./components/filters";
import EmptyProducts from "./components/emptyProducts";

const Products = () => {
    const navigate = useNavigate();

    const { isLoadingProducts, products, handleChangePage, hasMore, isFetching, setSearch, setCategories } = useGetProducts();
    const observer = useRef<IntersectionObserver | null>(null);

    const handleSearch = useCallback((search: string) => {
        setSearch(search)
    }, [setSearch]);

    const handleCategories = useCallback((categories: string[]) => {
        setCategories(categories)
    }, [setCategories]);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoadingProducts) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    handleChangePage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoadingProducts, handleChangePage, hasMore]
    );

    const handleProduct = useCallback((id: number) => {
        navigate(`/products/${id}`);
    }, [navigate]);

    return (
        <section className="px-8 pb-4 flex flex-col justify-center">
            <Filters handleSearch={handleSearch} handleCategories={handleCategories} />
            <div className="flex flex-col justify-center items-center">
                <Loading isLoading={isLoadingProducts} component={<ProductCardSkeleton />}>
                    {
                        products.length === 0 && !isLoadingProducts && <EmptyProducts />
                    }
                    <ListProducts products={products} lastElementRef={lastElementRef as unknown as React.RefObject<HTMLDivElement>} handleProduct={handleProduct} />
                </Loading>
            </div>
            {isFetching && <Spinner />}
        </section>
    );
};

export default Products;
