import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast"
import { useEffect } from 'react';
import posthog from 'posthog-js';
import './App.css';
import Home from './pages/home';
import Products from './pages/products';
import { Layout } from './components';
import Product from './pages/products/modules/product';
import StoreContext from './context/store';
import Contact from './pages/contact';
import ScrollToTop from './components/scrollTop';
import PromoBanner from './components/promoBanner';

/** Trackea cada cambio de ruta como un pageview en PostHog */
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    posthog.capture('page_viewed', {
      pageName: location.pathname,
      pageUrl: window.location.href,
    });
  }, [location.pathname]);

  return null;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext>
        <BrowserRouter>
          <ScrollToTop />
          <PageViewTracker />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<Product />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <PromoBanner />
      </StoreContext>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
