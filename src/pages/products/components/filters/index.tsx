import React, { useCallback, useRef, useState } from "react";
import { Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchProducts from "../searchProducts";
import SelectCategories from "../selectCategories";

interface Props {
    handleSearch: (search: string) => void;
    handleCategories: (categories: string[]) => void;
}

const Filters = ({ handleSearch, handleCategories }: Props) => {
    const [showFilters, setShowFilters] = useState(true);
    const searchRef = useRef<{ reset: () => void, getSearch: () => string }>(null);
    const categoriesRef = useRef<{ reset: () => void, getCategories: () => string[] }>(null);

    const handleResetFilters = useCallback(() => {
        const search = searchRef.current?.getSearch();
        const categories = categoriesRef.current?.getCategories();
        if (search || categories?.length) {
            handleSearch("");
            handleCategories([]);
            searchRef.current?.reset();
            categoriesRef.current?.reset();
        }
    }, [handleSearch, handleCategories, searchRef, categoriesRef]);

    const handleToggleFilters = () => {
        setShowFilters((prev) => !prev);
    };

    return (
        <div className="flex flex-col justify-center items-end w-full gap-2 sm:justify-end">
            <div className="flex visible justify-end sm:hidden">
                <button
                    onClick={handleToggleFilters}
                    className="flex flex-row gap-2 items-center"
                    type="button"
                >
                    <Filter className="w-4 h-4" />
                    <p className="text-sm font-poppins text-gray-500">Filtros</p>
                </button>
            </div>

            {showFilters && (
                <div className="flex flex-col justify-end items-end w-full gap-2 mt-2 sm:flex-row">
                    <SearchProducts
                        ref={searchRef as React.RefObject<{ reset: () => void }>}
                        handleSearch={handleSearch}
                    />
                    <SelectCategories
                        ref={categoriesRef as React.RefObject<{ reset: () => void }>}
                        handleCategories={handleCategories}
                    />
                </div>
            )}
            <Button
                variant="ghost"
                className="w-20 mt-0 pt-0 cursor-pointer rounded-4xl bg-transparent hover:bg-transparent font-poppins dark:bg-black dark:text-white"
                onClick={handleResetFilters}
            >
                <Trash2 className="w-4 h-4" />
                Limpiar
            </Button>
        </div>
    );
};

export default React.memo(Filters);
