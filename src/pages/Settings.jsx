import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import ToastNotification from '../components/ToastNotification';
import { getSettings, saveSettings } from '../utils/storage';
import clsx from 'clsx';

const Settings = () => {
  const [settings, setSettings] = useState(getSettings());
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleSave = () => {
    saveSettings(settings);
    setToast({ visible: true, message: 'Settings saved!' });
  };

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const settingsList = [
    { key: 'autoCopy', label: 'Auto-copy password', description: 'Automatically copy password to clipboard after generation' },
    { key: 'showPassword', label: 'Show password by default', description: 'Display passwords without hiding them' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-6 py-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Settings</h1>
            <p className="text-zinc-400 text-lg mt-2">Customize your experience</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700 space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Default Password Length
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-yellow-400">{settings.defaultLength}</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={settings.defaultLength}
                onChange={(e) => setSettings({ ...settings, defaultLength: Number(e.target.value) })}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #facc15 0%, #facc15 ${((settings.defaultLength - 4) / 60) * 100}%, #27272a ${((settings.defaultLength - 4) / 60) * 100}%, #27272a 100%)`
                }}
              />
            </div>

            <div className="border-t border-zinc-700 pt-6 space-y-4">
              {settingsList.map(({ key, label, description }) => (
                <label
                  key={key}
                  className="flex items-start gap-4 cursor-pointer group"
                >
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      checked={settings[key]}
                      onChange={() => handleToggle(key)}
                      className="sr-only"
                    />
                    <div className={clsx(
                      "w-6 h-6 rounded border-2 transition-all flex items-center justify-center",
                      settings[key]
                        ? "bg-yellow-400 border-yellow-400"
                        : "bg-zinc-800 border-zinc-600 group-hover:border-zinc-500"
                    )}>
                      {settings[key] && (
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{label}</p>
                    <p className="text-sm text-zinc-400 mt-1">{description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
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

export default Settings;
