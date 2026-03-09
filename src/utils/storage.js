const HISTORY_KEY = 'securekey_history';
const SETTINGS_KEY = 'securekey_settings';
const MAX_HISTORY = 50;

export const saveToHistory = (password) => {
  const history = getHistory();
  const newEntry = {
    id: Date.now(),
    password,
    timestamp: new Date().toISOString()
  };
  
  const updatedHistory = [newEntry, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const deleteFromHistory = (id) => {
  const history = getHistory();
  const updated = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getSettings = () => {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : {
      defaultLength: 16,
      autoCopy: false,
      showPassword: true,
      darkMode: true
    };
  } catch {
    return {
      defaultLength: 16,
      autoCopy: false,
      showPassword: true,
      darkMode: true
    };
  }
};
