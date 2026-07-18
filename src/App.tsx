/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { FloatingButtons } from './components/FloatingButtons';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen w-full relative bg-[#0b0b0b] text-white font-sans antialiased">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
        
        <footer className="shrink-0 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between px-4 lg:px-12 py-6 text-[10px] uppercase font-bold tracking-widest text-gray-600 gap-4 sm:gap-0 bg-[#0b0b0b] z-10 mt-auto">
          <div className="flex items-center gap-4">
            <img src="/devillogo.jpg" alt="Devil Cleanerz Logo" className="h-8 w-auto object-contain rounded opacity-80 hover:opacity-100 transition-opacity" />
            <div className="flex flex-col gap-1">
              <span>Instagram / DevilCleanerzz</span>
              <span>Twitter / DevilCleanerzz</span>
            </div>
          </div>
          <div>© 2024 DEVIL CLEANERZ. ALL RIGHTS RESERVED.</div>
        </footer>
        
        <FloatingButtons />
      </div>
    </div>
  );
}
