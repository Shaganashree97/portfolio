import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${darkMode ? 'dark' : ''}`}
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <nav className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Portfolio</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </motion.div>
  );
}