"use client";

import React, { useState } from 'react';
import {
  MdArrowBack,
  MdAdd,
  MdDelete,
  MdImage,
  MdAddCircleOutline,
  MdContentCopy,
  MdArrowUpward,
  MdArrowDownward,
  MdDesktopMac,
  MdSmartphone,
} from 'react-icons/md';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BrandingImage {
  url: string;
  id: string;
}

type PreviewMode = 'desktop' | 'mobile';

export default function BrandingEditClient({ section }: { section: any }) {
  const router = useRouter();
  const supabase = createClient();

  // Safely initialize images from section
  const [images, setImages] = useState<BrandingImage[]>(() => {
    if (!section.images) return [];
    if (Array.isArray(section.images)) {
      return section.images.map((img: any, index: number) => {
        if (typeof img === 'string') {
          return { url: img, id: `img-${index}-${Date.now()}` };
        }
        return { url: img.url || img, id: img.id || `img-${index}-${Date.now()}` };
      });
    }
    return [];
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ message: '', show: false, error: false });

  // Delete confirmation state
  const [imageToDelete, setImageToDelete] = useState<BrandingImage | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Preview toggle state
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const showToast = (msg: string, isError = false) => {
    setToast({ message: msg, show: true, error: isError });
    setTimeout(() => setToast({ message: '', show: false, error: false }), 4000);
  };

  const handleCopy = () => {
    if (!newImageUrl) return;
    navigator.clipboard.writeText(newImageUrl);
    showToast("URL Copied to clipboard!");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'branding');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setNewImageUrl(data.url);
      showToast("Image uploaded successfully!");
    } catch (err: any) {
      showToast(err.message || 'Error uploading file', true);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      showToast("Please enter or upload an image URL first", true);
      return;
    }

    const newImage: BrandingImage = {
      url: newImageUrl.trim(),
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    };

    setImages(prev => [...prev, newImage]);
    setNewImageUrl('');
    showToast("Image added to section");
  };

  // Open delete confirmation
  const openDeleteModal = (img: BrandingImage) => {
    setImageToDelete(img);
    setIsDeleteModalOpen(true);
  };

  // Confirmed delete
  const handleConfirmDelete = () => {
    if (!imageToDelete) return;
    setImages(prev => prev.filter(img => img.id !== imageToDelete.id));
    setIsDeleteModalOpen(false);
    setImageToDelete(null);
    showToast("Image removed");
  };

  // Reorder helpers
  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setImages(prev => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveImageDown = (index: number) => {
    setImages(prev => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      const imagesToSave = images.map(img => ({ url: img.url, id: img.id }));

      const { error } = await supabase
        .from('branding_assets')
        .update({
          images: imagesToSave,
          updated_at: new Date().toISOString(),
        })
        .eq('id', section.id);

      if (error) throw error;

      showToast("Images saved successfully!");
      router.refresh();
    } catch (err: any) {
      console.error('Error saving branding:', err);
      showToast(err.message || "Failed to save images", true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/branding"
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#d6c3b3]/30 hover:bg-[#f8f5f1] transition-colors"
        >
          <MdArrowBack className="text-[#2C3829] text-xl" />
        </Link>
        <div>
          <h1 className="font-jost text-3xl text-[#2C3829] font-bold">Edit {section.section_name}</h1>
          <p className="font-body-md text-[#2C3829]/70 mt-1">Manage the images displayed in this section</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left panel: Current Images ── */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="!p-6 border border-[#d6c3b3]/30">
            <h3 className="font-jost font-semibold text-xl text-[#2C3829] mb-4">
              Current Images{' '}
              {images.length > 0 && (
                <span className="text-sm font-normal text-[#2C3829]/50">({images.length})</span>
              )}
            </h3>

            {images.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center bg-[#f8f5f1] rounded-lg border border-dashed border-[#d6c3b3]">
                <MdImage className="text-4xl text-[#2C3829]/30 mb-3" />
                <p className="text-[#2C3829]/60 font-body-sm">No images added yet.</p>
                <p className="text-[#2C3829]/40 font-body-sm text-xs mt-1">Upload or paste a URL to add images</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    className="relative group rounded-lg overflow-hidden border border-[#d6c3b3]/30 bg-white"
                  >
                    {/* Image — h-[240px] matches BrandingClient list */}
                    <div className="h-[240px] bg-[#f8f5f1] relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={`Branding image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[#2C3829]/30"><svg viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg></div>`;
                          }
                        }}
                      />

                      {/* Order badge */}
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#2C3829]/70 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{index + 1}</span>
                      </div>
                    </div>

                    {/* Bottom strip: URL + order controls + delete */}
                    <div className="p-3 bg-white border-t border-[#d6c3b3]/30 flex items-center gap-2">
                      <p className="flex-1 text-xs text-[#2C3829]/60 truncate" title={img.url}>
                        {img.url}
                      </p>

                      {/* Reorder buttons */}
                      <button
                        onClick={() => moveImageUp(index)}
                        disabled={index === 0}
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-[#f8f5f1] border border-[#d6c3b3]/40 text-[#2C3829] hover:bg-[#f3e6dc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                        title="Move up"
                      >
                        <MdArrowUpward className="text-sm" />
                      </button>
                      <button
                        onClick={() => moveImageDown(index)}
                        disabled={index === images.length - 1}
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-[#f8f5f1] border border-[#d6c3b3]/40 text-[#2C3829] hover:bg-[#f3e6dc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                        title="Move down"
                      >
                        <MdArrowDownward className="text-sm" />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => openDeleteModal(img)}
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-[#2C3829] text-white hover:opacity-80 transition-opacity shrink-0"
                        title="Remove Image"
                      >
                        <MdDelete className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* ── Right panel: Add New Image ── */}
        <div className="space-y-6">
          <Card className="!p-6 border border-[#d6c3b3]/30">
            <h3 className="font-jost font-semibold text-xl text-[#2C3829] mb-4">Add New Image</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-jost font-semibold text-[#2C3829] mb-3">
                  Branding Image
                </label>

                {/* File Upload Area */}
                <label
                  className={`cursor-pointer w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors ${
                    uploading
                      ? 'border-[#d6c3b3]/50 bg-transparent'
                      : 'border-[#d6c3b3] hover:bg-white bg-white/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#f3e6dc] flex items-center justify-center text-[#2C3829]">
                    <MdAddCircleOutline className="text-2xl" />
                  </div>
                  <div className="text-center">
                    <p className="font-jost font-medium text-[#2C3829]">
                      {uploading ? 'Uploading to Ziea...' : 'Upload Image File'}
                    </p>
                    <p className="text-xs text-[#2C3829]/60 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>

                {/* URL Input */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="https://ziea.b-cdn.net/branding/..."
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="shrink-0 w-12 h-12 flex items-center justify-center bg-white border border-[#d6c3b3]/50 rounded-xl hover:bg-[#f3e6dc] text-[#2C3829] transition-colors"
                      title="Copy URL"
                    >
                      <MdContentCopy className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* ── Live Preview with Desktop / Mobile toggle ── */}
                {newImageUrl && (
                  <div className="mt-4 rounded-xl border border-[#d6c3b3]/40 bg-[#f8f5f1] overflow-hidden">
                    {/* Toggle bar */}
                    <div className="flex items-center gap-1 p-2 border-b border-[#d6c3b3]/30 bg-white">
                      <span className="text-[10px] uppercase tracking-widest text-[#2C3829]/50 font-jost font-semibold mr-auto pl-1">
                        Preview
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewMode('desktop')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jost font-medium transition-colors ${
                          previewMode === 'desktop'
                            ? 'bg-[#2C3829] text-white'
                            : 'text-[#2C3829]/60 hover:bg-[#f3e6dc]'
                        }`}
                      >
                        <MdDesktopMac className="text-sm" />
                        Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode('mobile')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jost font-medium transition-colors ${
                          previewMode === 'mobile'
                            ? 'bg-[#2C3829] text-white'
                            : 'text-[#2C3829]/60 hover:bg-[#f3e6dc]'
                        }`}
                      >
                        <MdSmartphone className="text-sm" />
                        Mobile
                      </button>
                    </div>

                    {/* Preview frame */}
                    <div className="p-3 flex justify-center">
                      {previewMode === 'desktop' ? (
                        /* Desktop — wide landscape, mirrors Hero h-[600px] full-width */
                        <div className="w-full h-[180px] rounded-lg overflow-hidden border border-[#d6c3b3]/30 shadow-sm bg-[#e8e1d8]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={newImageUrl}
                            alt="Desktop preview"
                            className="w-full h-full object-cover object-center"
                            onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
                          />
                        </div>
                      ) : (
                        /* Mobile — portrait phone frame, mirrors Hero h-[400px] narrow viewport */
                        <div
                          className="relative rounded-[20px] overflow-hidden border-4 border-[#2C3829]/20 shadow-lg bg-[#e8e1d8]"
                          style={{ width: '140px', height: '260px' }}
                        >
                          {/* Phone notch */}
                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-[#2C3829]/20 z-10" />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={newImageUrl}
                            alt="Mobile preview"
                            className="w-full h-full object-cover object-center"
                            onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-center text-[10px] text-[#2C3829]/40 font-jost pb-2">
                      {previewMode === 'desktop'
                        ? 'Approximate desktop hero ratio'
                        : 'Approximate mobile hero ratio'}
                    </p>
                  </div>
                )}

                {/* Add Image Button */}
                <Button
                  onClick={handleAddImage}
                  variant="auth-primary"
                  disabled={!newImageUrl.trim() || uploading}
                  className="w-full mt-4 flex items-center justify-center gap-2"
                >
                  <MdAdd className="text-lg" />
                  Add Image
                </Button>

                <p className="text-xs text-[#2C3829]/50 mt-2">
                  Upload a file or paste a BunnyCDN image URL above.
                </p>
              </div>
            </div>

            <hr className="my-6 border-[#d6c3b3]/30" />

            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              variant="auth-primary"
              className="w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Remove Image"
        message={`Are you sure you want to remove this image from the section? This won't delete the file from storage.`}
        confirmLabel="Remove"
        icon={<MdDelete />}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setImageToDelete(null);
        }}
        isLoading={false}
      />

      <Toast show={toast.show} message={toast.message} error={toast.error} />
    </>
  );
}