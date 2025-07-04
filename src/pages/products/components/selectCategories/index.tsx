import { memo, useEffect, useImperativeHandle, useState } from "react";
import { useSearchParams } from "react-router";
import MultiSelect from "@/components/ui/multiselect";
import { useCategoriesStore } from "@/store/categories";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";

interface Props {
    handleCategories: (categories: string[]) => void
    ref: React.RefObject<{ reset: () => void }>;
}

const SelectCategories = ({ handleCategories, ref }: Props) => {
    const { categories } = useCategoriesStore();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialSelected = searchParams.get("categoryIds")?.split(",").filter(Boolean) ?? [];
    const [selected, setSelected] = useState<string[]>(initialSelected);

    const debouncedSelected = useDebounce(selected.join(","), 700);

    useEffect(() => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            if (debouncedSelected.length > 0) {
                newParams.set("categoryIds", debouncedSelected.split(",").join(","));
            } else {
                newParams.delete("categoryIds");
            }
            return newParams;
        });
    }, [debouncedSelected, setSearchParams]);

    useEffect(() => {
        handleCategories(debouncedSelected.split(","));
    }, [debouncedSelected, handleCategories]);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelected([]);
        },
        getCategories: () => {
            return selected
        }
    }));

    return (
        <div className="flex flex-col w-full gap-2 sm:w-72">
            <Label className="text-sm font-poppins text-gray-500">Categorías</Label>
            <MultiSelect options={categories.map(category => ({
                value: category.id.toString(),
                label: category.name
            }))} selected={selected} setSelected={setSelected} />
        </div>
    )
}

export default memo(SelectCategories);