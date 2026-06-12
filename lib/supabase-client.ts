/**
 * Supabase Client for CMS
 * Handles all database and storage operations
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });


// Environment variables required:
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database Types
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  status: string;
  certification: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Industrial' | 'Commercial' | 'Infrastructure';
  location: string;
  description: string;
  image_url: string;
  image_path?: string; // For Supabase Storage reference
  kVA: string;
  year: string;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  category: string;
  title: string;
  caption: string;
  image_url: string;
  image_path?: string; // For Supabase Storage reference
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_path?: string; // For Supabase Storage reference
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  site_title: string;
  site_tagline: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  contact_business_registration: string;
  security_document_access_password: string;
  social_linkedin: string;
  social_twitter: string;
  social_facebook: string;
  footer_company_description: string;
  footer_year_founded: number;
  footer_copyright_text: string;
  created_at: string;
  updated_at: string;
}

/**
 * Services Operations
 */

export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating service:', error);
    return null;
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating service:', error);
    return null;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting service:', error);
    return false;
  }
}

/**
 * Projects Operations
 */

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

/**
 * Gallery Operations
 */

export async function getGallery(): Promise<GalleryImage[]> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export async function createGalleryImage(image: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryImage | null> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([image])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return null;
  }
}

export async function updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | null> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return null;
  }
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return false;
  }
}

/**
 * Documents Operations
 */

export async function getDocuments(): Promise<Document[]> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function createDocument(doc: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document | null> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([doc])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating document:', error);
    return null;
  }
}

export async function updateDocument(id: string, updates: Partial<Document>): Promise<Document | null> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating document:', error);
    return null;
  }
}

export async function deleteDocument(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}

/**
 * Settings Operations
 */

export async function getSettings(): Promise<Settings | null> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error) {
      // If settings don't exist, return defaults
      if (error.code === 'PGRST116') {
        return getDefaultSettings();
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return getDefaultSettings();
  }
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings | null> {
  try {
    // Try to find existing settings row
    const { data: existingRows, error: selectError } = await supabase
      .from('settings')
      .select('id');

    if (selectError) throw selectError;

    if (existingRows && existingRows.length > 0) {
      // Update existing row
      const { data, error } = await supabase
        .from('settings')
        .update(updates)
        .eq('id', existingRows[0].id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new row (omit id so Supabase generates a UUID)
      const defaults = getDefaultSettings();
      const insertData = { ...defaults, ...updates };
      delete (insertData as Record<string, unknown>).id;

      const { data, error } = await supabase
        .from('settings')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    return null;
  }
}

function getDefaultSettings(): Settings {
  return {
    id: '',
    site_title: 'Aseen Power',
    site_tagline: 'Industrial Electrical Contracting & Projects',
    site_description: 'Expert HT substations, commercial infrastructure, panel manufacturing, and specialized energy solutions across India.',
    contact_email: 'contact@aseenpower.com',
    contact_phone: '+91 22 1234 5678',
    contact_address: 'Aseen Tower, BKC Phase II, Mumbai, Maharashtra 400051 India',
    contact_business_registration: 'MH-CIV-1002-HVC',
    security_document_access_password: 'aseenpower2026',
    social_linkedin: 'https://linkedin.com/company/aseen-power',
    social_twitter: 'https://twitter.com/aseenpower',
    social_facebook: 'https://facebook.com/aseenpower',
    footer_company_description: 'Since 1998, Aseen Power has been at the forefront of electrical engineering, delivering excellence in high-voltage infrastructure, commissioning transmission substations, and scalable industrial power designs across India.',
    footer_year_founded: 1998,
    footer_copyright_text: '© 2026 Aseen Power. All rights reserved. Engineering Excellence Since 1998.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Storage Operations
 */

export async function uploadImage(file: File, bucket: 'projects' | 'gallery'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${bucket}/${fileName}`;

    const { error } = await supabase.storage
      .from('cms-uploads')
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data } = supabase.storage
      .from('cms-uploads')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export async function uploadDocument(file: File): Promise<{ url: string; path: string } | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { error } = await supabase.storage
      .from('cms-uploads')
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data } = supabase.storage
      .from('cms-uploads')
      .getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    return null;
  }
}

export async function deleteFile(filePath: string, bucket: 'documents' | 'gallery' | 'projects' = 'projects'): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('cms-uploads')
      .remove([filePath]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}
