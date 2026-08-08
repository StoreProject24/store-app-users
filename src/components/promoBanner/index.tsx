import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStoreStore } from '@/store/store';

export default function PromoBanner() {
  const { store } = useStoreStore();
  const [isVisible, setIsVisible] = useState(true);
  const [isDuringPromo, setIsDuringPromo] = useState(false);
  const [isBeforePromo, setIsBeforePromo] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const bannerClosed = localStorage.getItem('promoBannerClosed');
    if (bannerClosed) {
      setIsVisible(false);
      return;
    }
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    if (month === 8) {
      if (day < 14) {
        setIsBeforePromo(true);
      } else if (day >= 14 && day <= 19) {
        setIsDuringPromo(true);
      } else if (day > 19) {
        setIsVisible(false);
        return;
      }
    } else if (month > 8) {
      setIsVisible(false);
      return;
    }
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const handleClose = () => {
    setIsAnimated(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('promoBannerClosed', 'true');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <>
      {isDuringPromo && (
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isAnimated ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:max-w-md z-50
          transition-all duration-300 transform ${
          isAnimated
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-8'
        } ${
          isDuringPromo
            ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 shadow-2xl'
            : 'bg-white shadow-2xl border border-gray-100'
        } rounded-3xl overflow-hidden`}
      >
        {/* Contenido */}
        <div className="p-8 relative">
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110 ${
              isDuringPromo
                ? 'bg-white/20 hover:bg-white/30 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {store?.logoUrl && (
            <div className="mb-5">
              <img
                src={store?.logoUrl}
                alt="Logo"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          )}

          <div className="mb-3">
            <h2 className={`font-bold text-2xl ${
              isDuringPromo ? 'text-white' : 'text-gray-900'
            }`}>
              {isDuringPromo
                ? '¡Estamos de aniversario!'
                : isBeforePromo
                ? '¡Estaremos de aniversario!'
                : '¡Estamos de aniversario!'}
            </h2>
            {isBeforePromo && (
              <p className={`text-sm mt-1 ${isDuringPromo ? 'text-white/80' : 'text-gray-500'}`}>
                Desde el 14 de agosto
              </p>
            )}
          </div>

          <p className={`mb-6 text-sm leading-relaxed ${
            isDuringPromo ? 'text-white/90' : 'text-gray-600'
          }`}>
            {isDuringPromo
              ? 'Disfruta de sorpresas especiales en nuestros productos. ¡Estas promociones especiales terminan el 19 de agosto! 🚀'
              : isBeforePromo
              ? '¡Prepárate para sorpresas especiales en nuestros productos a partir del 14 de agosto! 🎉'
              : '¡Disfruta de sorpresas especiales en nuestros productos! 🚀'}
          </p>

          <div className="space-y-2 mb-6 text-sm">
            <div className={`flex items-center gap-3 ${isDuringPromo ? 'text-white/80' : 'text-green-600'}`}>
              <span className="text-lg">✓</span>
              <span>Obsequios</span>
            </div>
            <div className={`flex items-center gap-3 ${isDuringPromo ? 'text-white/80' : 'text-green-600'}`}>
              <span className="text-lg">✓</span>
              <span>Sorteos</span>
            </div>
            <div className={`flex items-center gap-3 ${isDuringPromo ? 'text-white/80' : 'text-green-600'}`}>
              <span className="text-lg">✓</span>
              <span>Pasabocas</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
