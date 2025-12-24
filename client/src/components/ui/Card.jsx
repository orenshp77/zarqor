import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = true,
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-2xl overflow-hidden';
  const paddingStyles = padding ? 'p-6' : '';
  const hoverStyles = hover
    ? 'shadow-sm hover:shadow-xl transition-shadow duration-300'
    : 'shadow-sm';

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`${baseStyles} ${paddingStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
