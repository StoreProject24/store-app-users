import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoriesService from "../../services/categories";
import { useCategoriesStore } from "@/store/categories";

const useGetCategories = () => {
	const categoryService = new CategoriesService();
	const { setCategories } = useCategoriesStore();
	const { isLoading, data } = useQuery({
		queryKey: ["categories"],
		queryFn: categoryService.getCategories,
		initialData: [],
		refetchOnWindowFocus: false,
		select: (data) => {
			return data.data.categories;
		},
	});

	 useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data, setCategories]);

	return {
		isLoadingCategories: isLoading,
		categories: data,
	};
};

export default useGetCategories;
