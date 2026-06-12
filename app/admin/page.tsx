'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Settings,
  FileText,
  Image,
  Briefcase,
  Zap,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  Save,
  AlertCircle
} from 'lucide-react';
import AdminServicesTab from '@/components/admin/AdminServicesTab';
import AdminProjectsTab from '@/components/admin/AdminProjectsTab';
import AdminGalleryTab from '@/components/admin/AdminGalleryTab';
import AdminDocumentsTab from '@/components/admin/AdminDocumentsTab';
import AdminSettingsTab from '@/components/admin/AdminSettingsTab';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<string>('services');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use environment variable if available, otherwise fallback to hardcoded value
    const validPassword = process.env.ADMIN_PASSWORD || 'admin@aseen2026';
    
    if (adminPassword === validPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setAdminPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Invalid admin password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#e9e8e7] rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-display font-extrabold text-2xl text-black uppercase tracking-tight mb-2">
              Aseen Power
            </h1>
            <p className="font-display text-xs text-[#785919] tracking-widest uppercase font-semibold">
              Admin Control Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col">
              <label className="font-display text-[10px] tracking-widest font-extrabold text-stone-600 uppercase mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm bg-white font-sans text-sm"
              />
              {passwordError && (
                <p className="text-red-500 font-sans text-xs mt-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#785919] hover:bg-black text-white font-display text-xs tracking-widest font-bold uppercase py-4 rounded-sm transition-colors duration-300"
            >
              ACCESS ADMIN PANEL
            </button>
          </form>

          <p className="text-center font-sans text-[11px] text-gray-400 mt-6">
            This area is for authorized administrators only.
          </p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f8] flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-black text-white p-6 fixed left-0 top-0 bottom-0 z-40 overflow-y-auto hidden lg:flex flex-col"
      >
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-xl tracking-tight text-white">ASEEN</h1>
          <p className="font-display text-xs text-[#eac076] tracking-widest font-semibold">ADMIN PANEL</p>
        </div>

        <nav className="space-y-2 flex-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-sm transition-all flex items-center gap-3 font-display text-sm font-semibold tracking-wide ${
                  activeTab === tab.id
                    ? 'bg-[#785919] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-white/10 hover:bg-red-500/20 text-red-400 rounded-sm transition-colors flex items-center gap-2 font-display text-sm font-semibold justify-center "
        >
          <LogOut size={18} />
          LOGOUT
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-black text-white p-4 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h1 className="font-display font-bold text-lg">ASEEN</h1>
            <p className="font-display text-xs text-[#eac076]">ADMIN</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black text-white border-b border-white/10"
            >
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-sm transition-all flex items-center gap-3 font-display text-sm font-semibold ${
                        activeTab === tab.id
                          ? 'bg-[#785919] text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'services' && <AdminServicesTab />}
              {activeTab === 'projects' && <AdminProjectsTab />}
              {activeTab === 'gallery' && <AdminGalleryTab />}
              {activeTab === 'documents' && <AdminDocumentsTab />}
              {activeTab === 'settings' && <AdminSettingsTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
