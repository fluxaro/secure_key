import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import clsx from 'clsx';

const StrengthMeter = ({ strength, entropy }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-zinc-900 rounded-xl p-6 border border-zinc-700 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium text-zinc-300">Password Strength</span>
        </div>
        <span className={clsx(
          "text-lg font-bold",
          strength.level === 'Weak' && "text-red-500",
          strength.level === 'Medium' && "text-orange-500",
          strength.level === 'Strong' && "text-yellow-400",
          strength.level === 'Very Strong' && "text-green-500"
        )}>
          {strength.level}
        </span>
      </div>
      
      <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength.percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={clsx("h-full rounded-full", strength.color)}
        />
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-400">Entropy</span>
        <span className="text-yellow-400 font-mono font-semibold">{entropy} bits</span>
      </div>
    </motion.div>
  );
};

export default StrengthMeter;
