'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Upload } from 'lucide-react';

interface GalleryImage {
  id: string;
  category: string;
  title: string;
  caption: string;
  image_url: string;
  order: number;
}

export default function AdminGalleryTab() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    category: 'Industrial',
    title: '',
    caption: '',
    image_url: '',
    order: 0
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/cms/gallery');
      const data = await res.json();
      setImages(data.gallery.sort((a: GalleryImage, b: GalleryImage) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      setMessage('Failed to load gallery');
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
      form.append('category', formData.category || 'Industrial');
      form.append('caption', formData.caption || '');
      form.append('order', String(formData.order || 0));

      if (editingId) {
        form.append('id', editingId);
        if (selectedImage) {
          form.append('image', selectedImage);
        }
        const res = await fetch('/api/cms/gallery', {
          method: 'PUT',
          body: form
        });
        if (res.ok) {
          setMessage('Image updated successfully!');
          setEditingId(null);
          setSelectedImage(null);
          fetchGallery();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error updating image');
        }
      } else if (isAdding) {
        if (!selectedImage) {
          setMessage('Please select an image file');
          setUploading(false);
          return;
        }
        form.append('image', selectedImage);
        const res = await fetch('/api/cms/gallery', {
          method: 'POST',
          body: form
        });
        if (res.ok) {
          setMessage('Image added successfully!');
          setIsAdding(false);
          setSelectedImage(null);
          fetchGallery();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error adding image');
        }
      }
      resetForm();
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving image');
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const res = await fetch(`/api/cms/gallery?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setMessage('Image deleted successfully!');
          fetchGallery();
        } else {
          setMessage('Error deleting image');
        }
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting image');
      }
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

  const resetForm = () => {
    setFormData({
      category: 'Industrial',
      title: '',
      caption: '',
      image_url: '',
      order: 0
    });
    setSelectedImage(null);
  };

  const startEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setFormData(image);
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="text-center py-12">Loading gallery...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-black uppercase tracking-tight mb-1">Gallery</h2>
          <p className="text-sm text-gray-600">Manage project photos and portfolio images</p>
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
            ADD IMAGE
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

      {/* Form */}
      {(isAdding || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#e9e8e7] rounded-lg p-6 mb-8 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase">
            {editingId ? 'EDIT IMAGE' : 'ADD NEW IMAGE'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="Image title"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Category *</label>
              <select
                value={formData.category || 'Industrial'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] "
              >
                <option>Industrial</option>
                <option>Commercial</option>
                <option>Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
              Image File {isAdding ? '*' : '(Optional to update)'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#785919] file:text-white hover:file:bg-black "
            />
            {selectedImage && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <CheckCircle size={14} />
                {selectedImage.name}
              </p>
            )}
            {editingId && formData.image_url && !selectedImage && (
              <p className="text-xs text-gray-500 mt-2">Current image: stored in Supabase Storage</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Caption</label>
            <textarea
              value={formData.caption || ''}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] font-sans text-sm"
              rows={2}
              placeholder="Image caption"
            />
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
              disabled={uploading}
              className="flex items-center gap-2 bg-[#785919] text-white px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors  disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="flex items-center gap-2 bg-gray-200 text-black px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={16} />
              CANCEL
            </button>
          </div>
        </motion.div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No images added yet. Click "Add Image" to get started.</p>
          </div>
        ) : (
          images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#e9e8e7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 w-full overflow-hidden bg-gray-200">
                {image.image_url && (
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-4">
                <h3 className="font-display font-bold text-sm text-black mb-2">{image.title}</h3>
                <p className="text-xs text-gray-600 mb-3">{image.caption}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-[#785919] text-white px-2 py-1 rounded-sm">{image.category}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(image)}
                      className="p-1 text-[#785919] hover:bg-yellow-50 rounded-sm transition-colors "
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-sm transition-colors "
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
