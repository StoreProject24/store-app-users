import { Outlet } from "react-router";
import Navbar from "../navbar";
import Footer from "../footer";
const Layout = () => {
	return (
		<div className="h-screen flex flex-col">
			{/* <Sidebar /> */}
			<Navbar />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
