'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Upload } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Industrial' | 'Commercial' | 'Infrastructure';
  location: string;
  description: string;
  image_url: string;
  kVA: string;
  year: string;
  featured: boolean;
  order: number;
}

export default function AdminProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Industrial',
    location: '',
    description: '',
    image_url: '',
    kVA: '',
    year: new Date().getFullYear().toString(),
    featured: false,
    order: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/cms/projects');
      const data = await res.json();
      setProjects(data.projects.sort((a: Project, b: Project) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      setMessage('Failed to load projects');
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
      form.append('location', formData.location || '');
      form.append('description', formData.description || '');
      form.append('kVA', formData.kVA || '');
      form.append('year', formData.year || new Date().getFullYear().toString());
      form.append('featured', String(formData.featured || false));
      form.append('order', String(formData.order || 0));

      if (editingId) {
        form.append('id', editingId);
        if (selectedImage) {
          form.append('image', selectedImage);
        }
        const res = await fetch('/api/cms/projects', {
          method: 'PUT',
          body: form
        });
        if (res.ok) {
          setMessage('Project updated successfully!');
          setEditingId(null);
          setSelectedImage(null);
          fetchProjects();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error updating project');
        }
      } else if (isAdding) {
        if (!selectedImage) {
          setMessage('Please select a project image');
          setUploading(false);
          return;
        }
        form.append('image', selectedImage);
        const res = await fetch('/api/cms/projects', {
          method: 'POST',
          body: form
        });
        if (res.ok) {
          setMessage('Project added successfully!');
          setIsAdding(false);
          setSelectedImage(null);
          fetchProjects();
        } else {
          const error = await res.json();
          setMessage(error.error || 'Error adding project');
        }
      }
      resetForm();
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving project');
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const res = await fetch(`/api/cms/projects?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setMessage('Project deleted successfully!');
          fetchProjects();
        } else {
          setMessage('Error deleting project');
        }
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting project');
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
      title: '',
      category: 'Industrial',
      location: '',
      description: '',
      image_url: '',
      kVA: '',
      year: new Date().getFullYear().toString(),
      featured: false,
      order: 0
    });
    setSelectedImage(null);
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="text-center py-12">Loading projects...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-black uppercase tracking-tight mb-1">Projects</h2>
          <p className="text-sm text-gray-600">Manage your portfolio and case studies</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => {
              setIsAdding(true);
              resetForm();
            }}
            className="flex items-center gap-2 bg-[#785919] text-white px-4 py-3 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer"
          >
            <Plus size={16} />
            ADD PROJECT
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
            {editingId ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Category *</label>
              <select
                value={formData.category || 'Industrial'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] cursor-pointer"
              >
                <option>Industrial</option>
                <option>Commercial</option>
                <option>Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Location *</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              placeholder="City, State"
            />
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] font-sans text-sm"
              rows={3}
              placeholder="Project description"
            />
          </div>

          <div className="mb-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
              Project Image {isAdding ? '*' : '(Optional to update)'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#785919] file:text-white hover:file:bg-black cursor-pointer"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">kVA Rating</label>
              <input
                type="text"
                value={formData.kVA || ''}
                onChange={(e) => setFormData({ ...formData, kVA: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="e.g., 2,500 kVA"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Year</label>
              <input
                type="text"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">Order</label>
              <input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                placeholder="0"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="font-display text-xs font-bold text-stone-700 uppercase">Mark as Featured Project</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex items-center gap-2 bg-[#785919] text-white px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="flex items-center gap-2 bg-gray-200 text-black px-6 py-2 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={16} />
              CANCEL
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No projects added yet. Click "Add Project" to get started.</p>
          </div>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#e9e8e7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 w-full overflow-hidden bg-gray-200">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-black">{project.title}</h3>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-[#785919] text-white px-2 py-1 rounded-sm">{project.category}</span>
                      {project.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-sm font-bold">FEATURED</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(project)}
                      className="p-2 text-[#785919] hover:bg-yellow-50 rounded-sm transition-colors cursor-pointer"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3">{project.location}</p>
                <p className="text-sm text-gray-600 mb-4">{project.description.substring(0, 100)}...</p>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{project.kVA} | {project.year}</span>
                  <span>Order: {project.order}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
