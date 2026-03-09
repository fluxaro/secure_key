import { motion } from 'framer-motion';
import clsx from 'clsx';

const OptionsPanel = ({ options, onChange }) => {
  const optionsList = [
    { key: 'uppercase', label: 'Uppercase Letters (A-Z)' },
    { key: 'lowercase', label: 'Lowercase Letters (a-z)' },
    { key: 'numbers', label: 'Numbers (0-9)' },
    { key: 'symbols', label: 'Symbols (!@#$%^&*)' },
    { key: 'excludeSimilar', label: 'Exclude Similar Characters (i, l, 1, L, o, 0, O)' },
  ];

  const handleToggle = (key) => {
    onChange({ ...options, [key]: !options[key] });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-zinc-900 rounded-xl p-6 border border-zinc-700 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Character Options</h3>
      
      {optionsList.map(({ key, label }) => (
        <label
          key={key}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => handleToggle(key)}
              className="sr-only"
            />
            <div className={clsx(
              "w-6 h-6 rounded border-2 transition-all flex items-center justify-center",
              options[key]
                ? "bg-yellow-400 border-yellow-400"
                : "bg-zinc-800 border-zinc-600 group-hover:border-zinc-500"
            )}>
              {options[key] && (
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-zinc-300 group-hover:text-white transition-colors">
            {label}
          </span>
        </label>
      ))}
    </motion.div>
  );
};

export default OptionsPanel;
