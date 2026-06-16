'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Upload } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_path: string;
  order: number;
}

export default function AdminDocumentsTab() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Document>>({
    title: '',
    description: '',
    file_url: '',
    order: 0
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/cms/documents');
      const data = await res.json();
      setDocuments(data.documents.sort((a: Document, b: Document) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      setMessage('Failed to load documents');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.title) {
        setMessage('Title is required');
        return;
      }

      setUploading(true);
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description || '');
      form.append('order', String(formData.order || 0));

      if (editingId) {
        form.append('id', editingId);
        if (selectedFile) {
          form.append('document', selectedFile);
        }
        const res = await fetch('/api/cms/documents', {
          method: 'PUT',
          body: form
        });
        if (res.ok) {
          setMessage('Document updated successfully!');
          setEditingId(null);
          setSelectedFile(null);
          fetchDocuments();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error updating document');
        }
      } else if (isAdding) {
        if (!selectedFile) {
          setMessage('Please select a PDF file');
          setUploading(false);
          return;
        }
        form.append('document', selectedFile);
        const res = await fetch('/api/cms/documents', {
          method: 'POST',
          body: form
        });
        if (res.ok) {
          setMessage('Document added successfully!');
          setIsAdding(false);
          setSelectedFile(null);
          fetchDocuments();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error adding document');
        }
      }
      resetForm();
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving document');
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        const res = await fetch(`/api/cms/documents?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setMessage('Document deleted successfully!');
          fetchDocuments();
        } else {
          setMessage('Error deleting document');
        }
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting document');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setMessage('Please select a PDF file');
        return;
      }
      setSelectedFile(file);
      setMessage('');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file_url: '',
      order: 0
    });
    setSelectedFile(null);
  };

  const startEdit = (document: Document) => {
    setEditingId(document.id);
    setFormData(document);
    setSelectedFile(null);
  };

  if (loading) {
    return <div className="text-center py-12 dark:text-[#b0b3b8]">Loading documents...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-black dark:text-white uppercase tracking-tight mb-1">Protected Documents</h2>
          <p className="text-sm text-gray-600 dark:text-[#b0b3b8]">Manage certifications, licenses, and credentials</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => {
              setIsAdding(true);
              resetForm();
            }}
            className="flex items-center gap-2 bg-[#785919] dark:bg-[#eac076] dark:text-black text-white px-4 py-3 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black dark:hover:bg-white transition-colors"
          >
            <Plus size={16} />
            ADD DOCUMENT
          </button>
        )}
      </div>

      {/* Message Alert */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-sm border flex items-center gap-2 mb-6 ${
              message.includes('successfully')
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
            }`}
          >
            {message.includes('successfully') ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      {(isAdding || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] rounded-lg p-6 mb-8 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase dark:text-white">
            {editingId ? 'EDIT DOCUMENT' : 'ADD NEW DOCUMENT'}
          </h3>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Title *</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
              placeholder="e.g., ISO 9001:2015 Certification"
            />
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] font-sans text-sm bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
              rows={2}
              placeholder="Document description or details"
            />
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">
              PDF Document {isAdding ? '*' : '(Optional to update)'}
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#785919] dark:file:bg-[#eac076] dark:file:text-black file:text-white hover:file:bg-black dark:hover:file:bg-white bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
              />
            </div>
            {selectedFile && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <CheckCircle size={14} />
                {selectedFile.name}
              </p>
            )}
            {editingId && formData.file_url && !selectedFile && (
              <p className="text-xs text-gray-500 dark:text-[#b0b3b8] mt-2">Current file: {formData.file_url.split('/').pop()}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Order</label>
            <input
              type="number"
              value={formData.order || 0}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
              placeholder="0"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex items-center gap-2 bg-[#785919] dark:bg-[#eac076] dark:text-black text-white px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Upload size={16} className="animate-spin" />
                  UPLOADING...
                </>
              ) : (
                <>
                  <Save size={16} />
                  SAVE
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                resetForm();
              }}
              disabled={uploading}
              className="flex items-center gap-2 bg-gray-200 dark:bg-[#3a3d45] text-black dark:text-[#e8e6e3] px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-gray-300 dark:hover:bg-[#2a2c35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={16} />
              CANCEL
            </button>
          </div>
        </motion.div>
      )}

      {/* Documents List */}
      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-[#b0b3b8]">
            <p>No documents added yet. Click "Add Document" to get started.</p>
          </div>
        ) : (
          documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-base text-black dark:text-white mb-2">{document.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-[#b0b3b8] mb-3">{document.description}</p>
                  <p className="text-xs text-gray-500 dark:text-[#8b8e93]">PDF stored securely in Supabase Storage</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(document)}
                    className="p-2 text-[#785919] dark:text-[#eac076] hover:bg-yellow-50 dark:hover:bg-[#23252d] rounded-sm transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(document.id)}
                    className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#3a3d45] flex justify-between items-center">
                <span className="text-xs text-gray-400 dark:text-[#8b8e93]">Order: {document.order}</span>
                {document.file_url && (
                  <a
                    href={document.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#785919] dark:text-[#eac076] hover:text-black dark:hover:text-white font-display font-bold uppercase"
                  >
                    Download PDF →
                  </a>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
