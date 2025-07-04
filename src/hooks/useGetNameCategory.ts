import { useCategoriesStore } from "@/store/categories";

const useGetNameCategory = () => {
   const { categories } = useCategoriesStore()

   const getNameCategory = (categoryId: number | null) => {
        if (!categoryId) return '';
        return categories.find((category) => category.id === categoryId)?.name ?? '';
   }

   return { getNameCategory };
}

export default useGetNameCategory;