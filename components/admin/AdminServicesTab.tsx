'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  status: string;
  certification: string;
  image_url?: string;
  order: number;
}

export default function AdminServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'Factory',
    features: [''],
    status: '',
    certification: '',
    image_url: '',
    order: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/cms/services');
      const data = await res.json();
      setServices(data.services.sort((a: Service, b: Service) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      setMessage('Failed to load services');
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
      form.append('icon', formData.icon || 'Factory');
      form.append('features', JSON.stringify(formData.features || []));
      form.append('status', formData.status || '');
      form.append('certification', formData.certification || '');
      form.append('order', String(formData.order || 0));

      if (editingId) {
        form.append('id', editingId);
        if (selectedImage) {
          form.append('image', selectedImage);
        }
        const res = await fetch('/api/cms/services', {
          method: 'PUT',
          body: form
        });
        if (res.ok) {
          setMessage('Service updated successfully!');
          setEditingId(null);
          setSelectedImage(null);
          fetchServices();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error updating service');
        }
      } else if (isAdding) {
        if (!selectedImage) {
          setMessage('Please select a service image');
          setUploading(false);
          return;
        }
        form.append('image', selectedImage);
        const res = await fetch('/api/cms/services', {
          method: 'POST',
          body: form
        });
        if (res.ok) {
          setMessage('Service added successfully!');
          setIsAdding(false);
          setSelectedImage(null);
          fetchServices();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error adding service');
        }
      }
      resetForm();
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving service');
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage('Please select an image file');
        return;
      }
      setSelectedImage(file);
      setMessage('');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const res = await fetch(`/api/cms/services?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setMessage('Service deleted successfully!');
          fetchServices();
        } else {
          setMessage('Error deleting service');
        }
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting service');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Factory',
      features: [''],
      status: '',
      certification: '',
      image_url: '',
      order: 0
    });
    setSelectedImage(null);
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="text-center py-12 dark:text-[#b0b3b8]">Loading services...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-black dark:text-white uppercase tracking-tight mb-1">Services</h2>
          <p className="text-sm text-gray-600 dark:text-[#b0b3b8]">Manage your core service offerings</p>
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
            ADD SERVICE
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

      {/* Form for adding/editing */}
      {(isAdding || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] rounded-lg p-6 mb-8 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase dark:text-white">
            {editingId ? 'EDIT SERVICE' : 'ADD NEW SERVICE'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
                placeholder="Service title"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Icon</label>
              <select
                value={formData.icon || 'Factory'}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
              >
                <option>Factory</option>
                <option>Building2</option>
                <option>Zap</option>
                <option>Cpu</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] font-sans text-sm bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
              rows={3}
              placeholder="Service description"
            />
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">
              Service Image {isAdding ? '*' : '(Optional to update)'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#785919] dark:file:bg-[#eac076] dark:file:text-black file:text-white hover:file:bg-black dark:hover:file:bg-white bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
            />
            {selectedImage && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <CheckCircle size={14} />
                {selectedImage.name}
              </p>
            )}
            {editingId && formData.image_url && !selectedImage && (
              <p className="text-xs text-gray-500 dark:text-[#b0b3b8] mt-2">Current image: stored in Supabase Storage</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Features (one per line)</label>
            <textarea
              value={(formData.features || []).join('\n')}
              onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
              className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] font-sans text-sm bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
              rows={3}
              placeholder="Enter each feature on a new line"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Status</label>
              <input
                type="text"
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
                placeholder="e.g., OFF-GRID & HYBRID"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 dark:text-[#b0b3b8] uppercase mb-2">Certification</label>
              <input
                type="text"
                value={formData.certification || ''}
                onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm focus:outline-none focus:border-[#785919] dark:focus:border-[#eac076] bg-white dark:bg-[#12141a] dark:text-[#e8e6e3]"
                placeholder="e.g., 100% REGULATED"
              />
            </div>
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
              {uploading ? 'UPLOADING...' : (
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

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-[#b0b3b8]">
            <p>No services added yet. Click "Add Service" to get started.</p>
          </div>
        ) : (
          services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#1a1c22] border border-[#e9e8e7] dark:border-[#3a3d45] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {service.image_url && (
                <div className="h-40 w-full overflow-hidden bg-gray-200 dark:bg-[#23252d]">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-black dark:text-white mb-1">{service.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-[#8b8e93]">Order: {service.order}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 text-[#785919] dark:text-[#eac076] hover:bg-yellow-50 dark:hover:bg-[#23252d] rounded-sm transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-[#b0b3b8] mb-4">{service.description}</p>

              <div className="bg-stone-50 dark:bg-[#12141a] p-3 rounded-sm mb-4">
                <p className="text-xs font-display font-bold text-stone-600 dark:text-[#b0b3b8] mb-2 uppercase">Features:</p>
                <ul className="space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-xs text-stone-700 dark:text-[#e8e6e3] flex items-start gap-2">
                      <span className="text-[#785919] dark:text-[#eac076] font-bold">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-[#8b8e93]">{service.status}</span>
                <span className="text-[#785919] dark:text-[#eac076] font-bold">{service.certification}</span>
              </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
