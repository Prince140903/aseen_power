'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, Eye as EyeIcon, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Document } from '@/lib/cms';

interface DocumentsPageWrapperProps {
  documents: Document[];
}

export default function DocumentsPageWrapper({ documents = [] }: DocumentsPageWrapperProps) {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('documents');
  const [showPassword, setShowPassword] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const unlocked = localStorage.getItem('docsUnlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    try {
      // Fetch settings from CMS (no cache to get latest password)
      const res = await fetch('/api/cms/settings', { cache: 'no-store' });
      const { settings } = await res.json();

      if (!settings || !settings.security_document_access_password) {
        setPasswordError('Unable to verify password. Please contact support.');
        return;
      }

      // Check password
      if (password === settings.security_document_access_password) {
        setIsUnlocked(true);
        localStorage.setItem('docsUnlocked', 'true');
        setPassword('');
        setPasswordError('');
      } else {
        setPasswordError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setPasswordError('Error verifying password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    localStorage.removeItem('docsUnlocked');
    setPassword('');
    setPasswordError('');
  };

  const handleDocumentView = async (docId: string) => {
    setDownloadingId(docId);

    try {
      const res = await fetch('/api/cms/settings', { cache: 'no-store' });
      const { settings } = await res.json();

      const response = await fetch('/api/documents/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: docId,
          password: settings.security_document_access_password
        })
      });

      if (!response.ok) {
        setPasswordError('Access denied or document not found.');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error accessing document:', error);
      setPasswordError('Error accessing document. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf9f8]">
      <Header activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        if (tab !== 'documents') {
          router.push(`/#${tab}`);
        }
      }} onRequestQuote={() => { }} />

      <main className="flex-1">
        {!isUnlocked ? (
          <div className="py-24 px-4">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#e9e8e7] rounded-lg shadow-lg p-8 sm:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-[#785919]/10 rounded-full mb-4">
                    <Lock size={40} className="text-[#785919]" />
                  </div>
                  <h1 className="font-display font-bold text-2xl text-black uppercase tracking-tight mb-2">
                    Protected Documents
                  </h1>
                  <p className="font-display text-xs text-[#785919] tracking-widest uppercase font-semibold">
                    Secure Access Required
                  </p>
                </div>

                <p className="font-sans text-sm text-gray-600 text-center mb-8">
                  Access our certifications, credentials, and supporting documents. Enter the access password provided by our team.
                </p>

                <form onSubmit={handleUnlock} className="space-y-6">
                  <div className="flex flex-col">
                    <label className="font-display text-[10px] tracking-widest font-extrabold text-stone-600 uppercase mb-2">
                      Access Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="Enter password"
                        disabled={loading}
                        className="w-full px-4 py-3 border border-[#c4c7c7] focus:border-[#785919] focus:outline-none rounded-sm bg-white font-sans text-sm pr-12 disabled:bg-gray-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 "
                      >
                        {showPassword ? <EyeOff size={18} /> : <EyeIcon size={18} />}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-red-500 font-sans text-xs mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {passwordError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#785919] hover:bg-black disabled:bg-gray-400 text-white font-display text-xs tracking-widest font-bold uppercase py-4 rounded-sm transition-colors duration-300  flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        VERIFYING...
                      </>
                    ) : (
                      'UNLOCK DOCUMENTS'
                    )}
                  </button>
                </form>

                <p className="text-center font-sans text-[11px] text-gray-400 mt-6 leading-relaxed">
                  Documents are password-protected to ensure they reach authorized stakeholders only.
                </p>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="py-16 sm:py-24 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-block p-2 bg-emerald-100 rounded-sm">
                      <CheckCircle size={20} className="text-emerald-600" />
                    </div>
                    <span className="font-display text-xs tracking-widest font-bold text-emerald-700 uppercase">
                      UNLOCKED
                    </span>
                  </div>
                  <h1 className="font-display font-bold text-3xl text-black uppercase tracking-tight">
                    Protected Documents
                  </h1>
                  <p className="font-sans text-sm text-gray-600 mt-2">
                    Certifications, credentials, and supporting business documents
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white border border-[#e9e8e7] text-black font-display text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gray-50 transition-colors "
                >
                  LOCK
                </button>
              </div>

              {documents.length === 0 ? (
                <div className="text-center py-16 bg-white border border-[#e9e8e7] rounded-lg">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="font-display text-sm text-gray-500 uppercase tracking-wide">
                    No documents available
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {documents.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-[#e9e8e7] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-[#785919]/10 rounded-sm group-hover:bg-[#785919]/20 transition-colors">
                          <FileText size={24} className="text-[#785919]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-base text-black mb-1 group-hover:text-[#785919] transition-colors">
                            {doc.title}
                          </h3>
                          <p className="font-sans text-xs text-gray-500">
                            {doc.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDocumentView(doc.id)}
                        disabled={downloadingId === doc.id}
                        className="inline-flex items-center gap-2 mt-6 pt-6 border-t border-gray-100 text-[#785919] hover:text-black disabled:text-gray-400 font-display text-xs font-bold tracking-widest uppercase transition-colors  group/btn disabled:cursor-not-allowed"
                      >
                        {downloadingId === doc.id ? (
                          <>
                            <Loader size={16} className="animate-spin" />
                            LOADING...
                          </>
                        ) : (
                          <>
                            <EyeIcon size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
                            VIEW DOCUMENT
                          </>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <Lock size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-blue-900 mb-1 uppercase">Confidential Access</h4>
                    <p className="font-sans text-xs text-blue-800">
                      These documents are secured and intended for authorized stakeholders only. By accessing this section, you acknowledge that you have received permission to view these materials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer setActiveTab={(tab) => {
        setActiveTab(tab);
        router.push(`/#${tab}`);
      }} openPolicyModal={() => { }} />
    </div>
  );
}
