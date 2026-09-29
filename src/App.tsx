import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./cart/CartDrawer";
import CartProvider from "./cart/CartProvider";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Local from "./pages/Local";
import { pageVariants } from "./variants";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, [pathname]);

	return null;
}

function App() {
	const location = useLocation();

	return (
		<MotionConfig reducedMotion="user">
			<CartProvider>
				<div className="relative flex min-h-[100dvh] flex-col bg-paper">
					<Header />
					<ScrollToTop />

					<main className="flex-1">
						<AnimatePresence mode="wait">
							<motion.div
								key={location.pathname}
								variants={pageVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								<Routes location={location}>
									<Route path="/" element={<Home />} />
									<Route path="/produtos" element={<Products />} />
									<Route path="/encomendas" element={<Orders />} />
									<Route path="/localizacao" element={<Local />} />
								</Routes>
							</motion.div>
						</AnimatePresence>
					</main>

					<Footer />
					<CartDrawer />
				</div>
			</CartProvider>
		</MotionConfig>
	);
}

export default App;
