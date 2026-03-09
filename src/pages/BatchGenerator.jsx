import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CopyCheck } from 'lucide-react';
import LengthSlider from '../components/LengthSlider';
import OptionsPanel from '../components/OptionsPanel';
import CustomPrefixInput from '../components/CustomPrefixInput';
import ToastNotification from '../components/ToastNotification';
import { generateBatchPasswords } from '../utils/passwordGenerator';
import { copyToClipboard } from '../utils/clipboard';

const BatchGenerator = () => {
  const [count, setCount] = useState(5);
  const [length, setLength] = useState(16);
  const [customPrefix, setCustomPrefix] = useState('');
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeSimilar: false
  });
  const [passwords, setPasswords] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleGenerate = () => {
    const batch = generateBatchPasswords(count, { length, ...options, customPrefix });
    setPasswords(batch);
    setCopiedIndex(null);
  };

  const handleCopy = async (password, index) => {
    const success = await copyToClipboard(password);
    if (success) {
      setCopiedIndex(index);
      setToast({ visible: true, message: 'Password copied!' });
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const allPasswords = passwords.join('\n');
    const success = await copyToClipboard(allPasswords);
    if (success) {
      setToast({ visible: true, message: `${passwords.length} passwords copied!` });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Batch Generator
            </h1>
            <p className="text-zinc-400 text-lg">
              Generate multiple passwords at once
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-zinc-300">Number of Passwords</label>
                    <span className="text-2xl font-bold text-yellow-400">{count}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #facc15 0%, #facc15 ${((count - 1) / 19) * 100}%, #27272a ${((count - 1) / 19) * 100}%, #27272a 100%)`
                    }}
                  />
                </div>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700">
                <LengthSlider length={length} onChange={setLength} />
              </div>

              <CustomPrefixInput 
                value={customPrefix} 
                onChange={setCustomPrefix}
                maxLength={length}
              />
            </div>

            <OptionsPanel options={options} onChange={setOptions} />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-6 rounded-xl transition-all"
          >
            Generate {count} Passwords
          </button>

          {passwords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Generated Passwords</h2>
                <button
                  onClick={handleCopyAll}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 rounded-lg transition-all flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy All
                </button>
              </div>

              <div className="space-y-2">
                {passwords.map((password, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-zinc-900 rounded-lg p-4 border border-zinc-700 flex items-center justify-between gap-4"
                  >
                    <span className="font-mono text-yellow-400 flex-1 break-all">{password}</span>
                    <button
                      onClick={() => handleCopy(password, index)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all"
                    >
                      {copiedIndex === index ? (
                        <CopyCheck className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-zinc-400" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <ToastNotification
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </div>
  );
};

export default BatchGenerator;
