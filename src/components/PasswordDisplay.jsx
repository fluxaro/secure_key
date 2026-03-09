import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Copy, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

const PasswordDisplay = ({ password, onCopy, onRegenerate, showByDefault = true }) => {
  const [showPassword, setShowPassword] = useState(showByDefault);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 rounded-xl p-6 border border-zinc-700 glow-yellow"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className={clsx(
            "text-2xl font-mono break-all",
            showPassword ? "text-yellow-400" : "text-zinc-600"
          )}>
            {showPassword ? password || 'Generate a password' : '••••••••••••••••'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
            title={showPassword ? 'Hide' : 'Show'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          
          <button
            onClick={onCopy}
            disabled={!password}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy"
          >
            <Copy className="w-5 h-5" />
          </button>
          
          <button
            onClick={onRegenerate}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-yellow-400 transition-all"
            title="Regenerate"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PasswordDisplay;
