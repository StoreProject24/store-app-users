import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import StoreService from "../../services/store";
import { useStoreStore } from "@/store/store";
import { Store } from "@/types/store";

const storeService = new StoreService();

const useGetStore = () => {
    const { setStore } = useStoreStore();
    const { data, isLoading, error } = useQuery({
        queryKey: ["store"],
        queryFn: () => storeService.getStoreData(),
        refetchOnWindowFocus: false
    });

     useEffect(() => {
        if (data) {
            setStore(data.store as Store);
        }
    }, [data, setStore]);

    return {
        isLoading,
        error,
    }
}

export default useGetStore;