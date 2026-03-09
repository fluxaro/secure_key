import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PasswordDisplay from '../components/PasswordDisplay';
import LengthSlider from '../components/LengthSlider';
import OptionsPanel from '../components/OptionsPanel';
import StrengthMeter from '../components/StrengthMeter';
import GenerateButton from '../components/GenerateButton';
import CustomPrefixInput from '../components/CustomPrefixInput';
import ToastNotification from '../components/ToastNotification';
import { generatePassword } from '../utils/passwordGenerator';
import { calculateEntropy, getCharsetSize } from '../utils/entropyCalculator';
import { checkPasswordStrength } from '../utils/strengthChecker';
import { copyToClipboard } from '../utils/clipboard';
import { saveToHistory, getSettings } from '../utils/storage';

const Home = () => {
  const settings = getSettings();
  
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(settings.defaultLength);
  const [customPrefix, setCustomPrefix] = useState('');
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeSimilar: false
  });
  const [toast, setToast] = useState({ visible: false, message: '' });

  const charsetSize = getCharsetSize(options);
  const entropy = calculateEntropy(password, charsetSize);
  const strength = checkPasswordStrength(password, entropy);

  // Adjust length if custom prefix exceeds it
  useEffect(() => {
    if (customPrefix.length > length) {
      setLength(customPrefix.length);
    }
  }, [customPrefix, length]);

  const handleGenerate = () => {
    const newPassword = generatePassword({ length, ...options, customPrefix });
    setPassword(newPassword);
    saveToHistory(newPassword);
    
    if (settings.autoCopy) {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    if (password) {
      const success = await copyToClipboard(password);
      if (success) {
        setToast({ visible: true, message: 'Password copied!' });
      }
    }
  };

  const handlePrefixChange = (value) => {
    setCustomPrefix(value);
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
              Password Generator
            </h1>
            <p className="text-zinc-400 text-lg">
              Create secure, random passwords in seconds
            </p>
          </div>

          <PasswordDisplay
            password={password}
            onCopy={handleCopy}
            onRegenerate={handleGenerate}
            showByDefault={settings.showPassword}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700">
                <LengthSlider length={length} onChange={setLength} />
              </div>
              
              <CustomPrefixInput 
                value={customPrefix} 
                onChange={handlePrefixChange}
                maxLength={length}
              />
              
              <StrengthMeter strength={strength} entropy={entropy} />
            </div>

            <OptionsPanel options={options} onChange={setOptions} />
          </div>

          <GenerateButton onGenerate={handleGenerate} isRegenerate={!!password} />
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

export default Home;
