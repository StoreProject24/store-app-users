import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      <button
        onClick={toggleSidebar}
        className={`p-4 lg:hidden z-20 fixed top-0 ${isOpen ? 'right-75' : 'left-0'}`}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 z-10 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:flex lg:flex-col
        `}
      >
        <h2 className="text-2xl font-bold mb-8">Mi Panel</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-pink-400">
            Inicio
          </a>
          <a href="#" className="hover:text-pink-400">
            Productos
          </a>
          <a href="#" className="hover:text-pink-400">
            Pedidos
          </a>
          <a href="#" className="hover:text-pink-400">
            Clientes
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
