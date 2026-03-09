import { motion } from 'framer-motion';

const LengthSlider = ({ length, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-300">Password Length</label>
        <span className="text-2xl font-bold text-yellow-400">{length}</span>
      </div>
      
      <input
        type="range"
        min="4"
        max="64"
        value={length}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #facc15 0%, #facc15 ${((length - 4) / 60) * 100}%, #27272a ${((length - 4) / 60) * 100}%, #27272a 100%)`
        }}
      />
      
      <div className="flex justify-between text-xs text-zinc-500">
        <span>4</span>
        <span>64</span>
      </div>
    </motion.div>
  );
};

export default LengthSlider;
