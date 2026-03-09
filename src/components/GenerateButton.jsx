import { motion } from 'framer-motion';
import { Key, RefreshCw } from 'lucide-react';

const GenerateButton = ({ onGenerate, isRegenerate = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onGenerate}
      className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-yellow-400/50"
    >
      {isRegenerate ? (
        <>
          <RefreshCw className="w-5 h-5" />
          <span>Regenerate Password</span>
        </>
      ) : (
        <>
          <Key className="w-5 h-5" />
          <span>Generate Password</span>
        </>
      )}
    </motion.button>
  );
};

export default GenerateButton;
