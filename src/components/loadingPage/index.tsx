import { motion } from 'framer-motion';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-14 w-14 rounded-full border-4 border-gray-200 border-t-black"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
        <p className="text-sm text-gray-500 font-medium">
          Cargando tienda...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
