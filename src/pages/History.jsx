import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Trash2, AlertCircle } from 'lucide-react';
import ToastNotification from '../components/ToastNotification';
import { getHistory, deleteFromHistory, clearHistory } from '../utils/storage';
import { copyToClipboard } from '../utils/clipboard';

const History = () => {
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '' });

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getHistory());
  };

  const handleCopy = async (password) => {
    const success = await copyToClipboard(password);
    if (success) {
      setToast({ visible: true, message: 'Password copied!' });
    }
  };

  const handleDelete = (id) => {
    deleteFromHistory(id);
    loadHistory();
    setToast({ visible: true, message: 'Password deleted' });
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      loadHistory();
      setToast({ visible: true, message: 'History cleared' });
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Password History</h1>
              <p className="text-zinc-400 text-lg mt-2">View your previously generated passwords</p>
            </div>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-400 rounded-lg transition-all"
              >
                Clear All
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="bg-zinc-900 rounded-xl p-12 border border-zinc-700 text-center">
              <AlertCircle className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">No passwords in history yet</p>
              <p className="text-zinc-500 text-sm mt-2">Generated passwords will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-900 rounded-lg p-4 border border-zinc-700 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-yellow-400 break-all">{item.password}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.password)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-yellow-400 transition-all"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900 text-zinc-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
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

export default History;
