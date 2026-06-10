"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Save, AlertCircle, CheckCircle } from "lucide-react";

interface Settings {
  site: {
    title: string;
    tagline: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    businessRegistration: string;
  };
  security: {
    documentAccessPassword: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  footer: {
    companyDescription: string;
    yearFounded: number;
    copyrightText: string;
  };
}

export default function AdminSettingsTab() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/cms/settings");
      const data = await res.json();
      setSettings(data.settings);
      console.log("settings: ", settings);
      setLoading(false);
    } catch (error) {
      setMessage("Failed to load settings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const error = await res.json();
        setMessage(error.error || "Error saving settings");
      }
    } catch (error) {
      setMessage("Error saving settings");
    }
  };

  if (loading || !settings) {
    return <div className="text-center py-12">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-black uppercase tracking-tight mb-1">
          Settings
        </h2>
        <p className="text-sm text-gray-600">
          Manage website information and security settings
        </p>
      </div>

      {/* Message Alert */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-sm border flex items-center gap-2 mb-6 ${
              message.includes("successfully")
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message.includes("successfully") ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Site Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#e9e8e7] rounded-lg p-6 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase">
            Website Information
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Website Title
              </label>
              <input
                type="text"
                value={settings.site.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    site: { ...settings.site, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>

            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.site.tagline}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    site: { ...settings.site, tagline: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>

            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Meta Description
              </label>
              <textarea
                value={settings.site.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    site: { ...settings.site, description: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] font-sans text-sm"
                rows={2}
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[#e9e8e7] rounded-lg p-6 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                value={settings.contact.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, email: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>

            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={settings.contact.phone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, phone: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
              Address
            </label>
            <textarea
              value={settings.contact.address}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, address: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] font-sans text-sm"
              rows={2}
            />
          </div>

          <div className="mt-6">
            <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
              Business Registration
            </label>
            <input
              type="text"
              value={settings.contact.businessRegistration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: {
                    ...settings.contact,
                    businessRegistration: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
            />
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[#e9e8e7] rounded-lg p-6 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-4 uppercase text-red-900">
            Protected Document Access
          </h3>
          <p className="text-sm text-red-800 mb-6">
            Set the password that users will need to access protected documents.
          </p>

          <div>
            <label className="block font-display text-xs font-bold text-red-900 uppercase mb-2">
              Document Access Password
            </label>
            <input
              type="password"
              value={settings.security.documentAccessPassword}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    documentAccessPassword: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-red-300 rounded-sm focus:outline-none focus:border-red-500"
            />
            <p className="text-xs text-red-700 mt-2">
              Users will need to enter this password to view protected
              documents.
            </p>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-[#e9e8e7] rounded-lg p-6 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase">
            Social Media
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings.social.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, linkedin: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>

            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                value={settings.social.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, twitter: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>

            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.social.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, facebook: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>
          </div>
        </motion.div>

        {/* Footer Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-[#e9e8e7] rounded-lg p-6 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-6 uppercase">
            Footer Information
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Company Description
              </label>
              <textarea
                value={settings.footer.companyDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    footer: {
                      ...settings.footer,
                      companyDescription: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919] font-sans text-sm"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                  Year Founded
                </label>
                <input
                  type="number"
                  value={settings.footer.yearFounded}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      footer: {
                        ...settings.footer,
                        yearFounded: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
                />
              </div>
            </div>

            <div>
              <label className="block font-display text-xs font-bold text-stone-700 uppercase mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                value={settings.footer.copyrightText}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    footer: {
                      ...settings.footer,
                      copyrightText: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border border-[#c4c7c7] rounded-sm focus:outline-none focus:border-[#785919]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex gap-3"
      >
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#785919] text-white px-8 py-3 rounded-sm font-display text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer shadow-md"
        >
          <Save size={18} />
          SAVE ALL SETTINGS
        </button>
      </motion.div>
    </div>
  );
}
