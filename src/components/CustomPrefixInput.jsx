import { motion } from 'framer-motion';
import { Type } from 'lucide-react';

const CustomPrefixInput = ({ value, onChange, maxLength }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    // Limit to maxLength
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const remainingChars = maxLength - value.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-zinc-900 rounded-xl p-6 border border-zinc-700 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-yellow-400" />
          <label className="text-sm font-medium text-zinc-300">Custom Prefix (Optional)</label>
        </div>
        <span className="text-sm text-zinc-500">
          {value.length}/{maxLength}
        </span>
      </div>
      
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="e.g., great"
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
      />
      
      <div className="flex items-start gap-2 text-xs text-zinc-400">
        <div className="flex-1">
          <p>Add your custom text at the start of the password.</p>
          <p className="mt-1">
            {value ? (
              <>
                Example: <span className="text-yellow-400 font-mono">{value}</span>
                <span className="text-zinc-500">+ {remainingChars} random characters</span>
              </>
            ) : (
              'The remaining length will be filled with random characters.'
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomPrefixInput;
