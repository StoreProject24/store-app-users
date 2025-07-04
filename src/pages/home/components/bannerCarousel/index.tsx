
import { useStoreStore } from "@/store/store";

export default function BannerCarousel() {
	const { store } = useStoreStore();
	return (
		<article className="bg-red-500 rounded-2xl">
			<img src={store.bannerUrl} alt="Banner" className="w-full h-96 object-cover rounded-2xl" />
		</article>
	);
}