import { motion } from 'framer-motion';
import { useStoreStore } from '@/store/store';

export default function BannerCarousel() {
  const { store } = useStoreStore();

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl overflow-hidden"
    >
      <motion.img
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        src={store.bannerUrl}
        alt="Banner"
        className="w-full h-96 object-cover rounded-2xl"
      />
    </motion.article>
  );
}