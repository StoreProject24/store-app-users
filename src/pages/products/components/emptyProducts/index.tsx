import { SearchX } from "lucide-react";

const EmptyProducts = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full gap-4">
            <p className="text-xl font-poppins text-gray-500 text-center">
                No existen productos
            </p>
            <SearchX className="w-10 h-10 text-gray-500" />
        </div>
    )
}

export default EmptyProducts;