import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

            <h1 className="text-2xl font-bold">Shaganashree P L</h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
              <Link href="/skills" className="hover:text-blue-500">
                Skills
              </Link>
              <Link href="/projects" className="hover:text-blue-500">
                Projects
              </Link>
              <Link href="/contact" className="hover:text-blue-500">
                Contact
              </Link>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >{/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <Link href="/" className="block py-2 hover:text-blue-500">
                Home
              </Link>
              <Link href="/skills" className="block py-2 hover:text-blue-500">
                Skills
              </Link>
              <Link href="/projects" className="block py-2 hover:text-blue-500">
                Projects
              </Link>
              <Link href="/contact" className="block py-2 hover:text-blue-500">
                Contact
              </Link>
            </motion.div>
          )}

        </nav>        

        <main>{children}</main>
      </div>
    </motion.div>
  );
}