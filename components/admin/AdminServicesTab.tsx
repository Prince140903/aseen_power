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
  order: number;
}

export default function AdminServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'Factory',
    features: [''],
    status: '',
    certification: '',
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
      if (editingId) {
        const res = await fetch('/api/cms/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData })
        });
        if (res.ok) {
          setMessage('Service updated successfully!');
          setEditingId(null);
          fetchServices();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error updating service');
        }
      } else if (isAdding) {
        const res = await fetch('/api/cms/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setMessage('Service added successfully!');
          setIsAdding(false);
          fetchServices();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error adding service');
        }
      }
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving service');
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
      order: 0
    });
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  if (loading) {
    return <div className="text-center py-12">Loading services...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-black uppercase tracking-tight mb-1">Services</h2>
          <p className="text-sm text-gray-600">Manage your core service offerings</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => {
              setIsAdding(true);
              resetForm();
            }}
            className="flex items-center gap-2 bg-[#785919] text-white px-4 py-3 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors "
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
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
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
          className="bg-white border border-[#e9e8e7] rounded-lg p-6 mb-8 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase">
            {editingId ? 'EDIT SERVICE' : 'ADD NEW SERVICE'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="Service title"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Icon</label>
              <select
                value={formData.icon || 'Factory'}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] "
              >
                <option>Factory</option>
                <option>Building2</option>
                <option>Zap</option>
                <option>Cpu</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] font-sans text-sm"
              rows={3}
              placeholder="Service description"
            />
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Features (one per line)</label>
            <textarea
              value={(formData.features || []).join('\n')}
              onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] font-sans text-sm"
              rows={3}
              placeholder="Enter each feature on a new line"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Status</label>
              <input
                type="text"
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="e.g., OFF-GRID & HYBRID"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Certification</label>
              <input
                type="text"
                value={formData.certification || ''}
                onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="e.g., 100% REGULATED"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Order</label>
            <input
              type="number"
              value={formData.order || 0}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              placeholder="0"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#785919] text-white px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors "
            >
              <Save size={16} />
              SAVE
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                resetForm();
              }}
              className="flex items-center gap-2 bg-gray-200 text-black px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors "
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
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No services added yet. Click "Add Service" to get started.</p>
          </div>
        ) : (
          services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#e9e8e7] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-black mb-1">{service.title}</h3>
                  <p className="text-xs text-gray-500">Order: {service.order}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 text-[#785919] hover:bg-yellow-50 rounded-sm transition-colors "
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors "
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              <div className="bg-stone-50 p-3 rounded-sm mb-4">
                <p className="text-xs font-display font-bold text-stone-600 mb-2 uppercase">Features:</p>
                <ul className="space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                      <span className="text-[#785919] font-bold">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{service.status}</span>
                <span className="text-[#785919] font-bold">{service.certification}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
