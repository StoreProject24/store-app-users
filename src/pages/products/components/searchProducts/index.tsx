import { memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";

interface Props {
    handleSearch: (search: string) => void;
    ref: React.RefObject<{ reset: () => void }>;
}

const SearchProducts = ({ handleSearch, ref }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialSearch = searchParams.get("search") ?? "";
    const [search, setSearch] = useState(initialSearch);
    const debouncedSearch = useDebounce(search, 700);

    useEffect(() => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            if (debouncedSearch) {
                newParams.set("search", debouncedSearch);
            } else {
                newParams.delete("search");
            }
            return newParams;
        });
    }, [debouncedSearch, setSearchParams]);

    const handleResetSearch = useCallback(() => {
        setSearch("")
        handleSearch("")
    }, [setSearch, handleSearch])


    useEffect(() => {
        handleSearch(debouncedSearch);
    }, [debouncedSearch, handleSearch]);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSearch("")
        },
        getSearch: () => {
            return search
        }
    }))

    return (
        <div className="flex flex-col w-full gap-2 sm:w-80 relative">
            <Label htmlFor="search" className="text-sm font-poppins text-gray-500">Buscar producto</Label>
            <button className="absolute left-2 top-10" onClick={handleResetSearch}>
                <Search className="w-4 h-4 text-gray-500" />
            </button>
            <Input
                id="search"
                type="text"
                placeholder="Buscar producto"
                className="w-full pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {
                search && (
                    <button className="absolute right-2 top-10" onClick={handleResetSearch}>
                        <XCircle className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                    </button>
                )
            }
        </div>
    );
};

export default memo(SearchProducts);
