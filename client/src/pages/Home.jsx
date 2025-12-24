import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Advantages from '../components/home/Advantages';
import Categories from '../components/home/Categories';
import BestSellers from '../components/home/BestSellers';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Advantages />
      <Categories />
      <BestSellers />
      <CTASection />
    </motion.div>
  );
};

export default Home;
