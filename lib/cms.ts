/**
 * CMS Data Loading Utilities
 * Server-side utility functions to load content from Supabase
 * Used by components to consume CMS-managed content
 */

import {
  getServices as dbGetServices,
  getProjects as dbGetProjects,
  getGallery as dbGetGallery,
  getDocuments as dbGetDocuments,
  getSettings as dbGetSettings,
  Service,
  Project as DBProject,
  Settings
} from './supabase-client';

// Export project type with both snake_case and camelCase for compatibility
export interface Project extends DBProject {
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface GalleryImage {
  id: string;
  category: string;
  title: string;
  caption: string;
  image_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Load services from Supabase
 */
export async function getServices(): Promise<Service[]> {
  try {
    return await dbGetServices();
  } catch (error) {
    console.error('Error loading services:', error);
    return [];
  }
}

/**
 * Load projects from Supabase
 */
export async function getProjects(): Promise<Project[]> {
  try {
    return await dbGetProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

/**
 * Load gallery images from Supabase
 */
export async function getGallery(): Promise<GalleryImage[]> {
  try {
    return await dbGetGallery();
  } catch (error) {
    console.error('Error loading gallery:', error);
    return [];
  }
}

/**
 * Load documents from Supabase
 */
export async function getDocuments(): Promise<Document[]> {
  try {
    return await dbGetDocuments();
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
}

/**
 * Load settings from Supabase
 */
export async function getSettings(): Promise<Settings> {
  try {
    const settings = await dbGetSettings();
    return settings || getDefaultSettings();
  } catch (error) {
    console.error('Error loading settings:', error);
    return getDefaultSettings();
  }
}

/**
 * Get default settings fallback
 */
function getDefaultSettings(): Settings {
  return {
    id: '',
    site_title: 'Aseen Power',
    site_tagline: 'Industrial Electrical Contracting & Projects',
    site_description: 'Expert HT substations, commercial infrastructure, panel manufacturing, and specialized energy solutions across India.',
    contact_email: 'contact@aseenpower.com',
    contact_phone: '+91 22 1234 5678',
    contact_address: 'Aseen Tower, BKC Phase II, Mumbai, Maharashtra 400051 India',
    business_registration: 'MH-CIV-1002-HVC',
    document_access_password: 'aseenpower2026',
    social_linkedin: 'https://linkedin.com/company/aseen-power',
    social_twitter: 'https://twitter.com/aseenpower',
    social_facebook: 'https://facebook.com/aseenpower',
    footer_description: 'Since 1998, Aseen Power has been at the forefront of electrical engineering, delivering excellence in high-voltage infrastructure, commissioning transmission substations, and scalable industrial power designs across India.',
    footer_year_founded: 1998,
    footer_copyright: '© 2026 Aseen Power. All rights reserved. Engineering Excellence Since 1998.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

/**
 * Export types for use in components
 */
export type { Service, GalleryImage, Document, Settings };
