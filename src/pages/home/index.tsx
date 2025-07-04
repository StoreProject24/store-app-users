import BannerCarousel from "./components/bannerCarousel";
import Categories from "./components/categories";
import FeatureProducts from "./components/featureProducts";

const Home = () => {

	return (
		<section className="px-8 flex flex-col justify-center">
			<BannerCarousel />
			<Categories />
			<FeatureProducts />
		</section>
	);
};

export default Home;
