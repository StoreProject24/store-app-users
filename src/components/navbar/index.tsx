import { useState } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cart from '../cart';
import useCart from '@/hooks/useCart';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathName = useLocation().pathname;
  const isProductPage = pathName.includes('/products');
  const isContactPage = pathName.includes('/contact');
  const isHomePage = pathName === '/';
  const { totalCartProducts } = useCart();

  const routes = [
    {
      label: 'Inicio',
      path: '/',
      isActive: isHomePage,
    },
    {
      label: 'Productos',
      path: '/products',
      isActive: isProductPage,
    },
    {
      label: 'Contacto',
      path: '/contact',
      isActive: isContactPage,
    },
  ];

  return (
    <header className="w-full px-8 py-3 bg-white flex justify-between items-center dark:bg-black">
      <Link to="/">
        <h1 className="text-xl font-bold font-poppins">Mi Tienda</h1>
      </Link>
      <nav className="hidden md:flex gap-6 items-center">
        {routes.map(route => (
          <Link
            to={route.path}
            key={route.label}
            className={`text-lg font-medium hover:underline font-poppins ${route.isActive ? 'text-blue-500' : 'text-gray-600 '}`}
          >
            {route.label}
          </Link>
        ))}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {totalCartProducts > 0 && (
                <span className="absolute top-0 left-6 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartProducts}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-96 p-4">
            <Cart />
          </SheetContent>
        </Sheet>
      </nav>
      <div className="md:hidden flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {totalCartProducts > 0 && (
                <span className="absolute top-0 left-6 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartProducts}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-2">
            <Cart />
          </SheetContent>
        </Sheet>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-8 h-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="mt-4 flex flex-col gap-4 p-4">
              {routes.map(route => (
                <Link
                  to={route.path}
                  key={route.label}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium hover:underline font-poppins ${route.isActive ? 'text-blue-500' : 'text-gray-600 '}`}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
