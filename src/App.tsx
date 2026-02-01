import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast"
import './App.css';
import Home from './pages/home';
import Products from './pages/products';
import { Layout } from './components';
import Product from './pages/products/modules/product';
import StoreContext from './context/store';
import Contact from './pages/contact';
import ScrollToTop from './components/scrollTop';
// import { useScrollAnimation } from './hooks/useScrollAnimation';

const queryClient = new QueryClient();
function App() {
  // useScrollAnimation()
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<Product />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreContext>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
