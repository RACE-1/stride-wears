'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, CheckCircle2, AlertCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = 'Product Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(value);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }

    // Validate size (15MB max)
    if (file.size > 15 * 1024 * 1024) {
      setError('File size must be under 15MB.');
      return;
    }

    // Set immediate client preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      setPreview(data.url);
      onChange(data.url);
    } catch (err: unknown) {
      console.error('Image upload failed:', err);
      setError((err as Error)?.message || 'Failed to upload and optimize image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setPreview('');
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-white/70">
        {label} <span className="text-[#00E5FF]">*</span>
      </label>

      {/* Hidden file input supporting mobile camera / gallery and desktop file picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Dropzone Container */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-200 overflow-hidden flex flex-col items-center justify-center p-6 text-center ${
          dragActive
            ? 'border-[#00E5FF] bg-[#00E5FF]/10 scale-[1.01]'
            : preview
            ? 'border-white/20 bg-white/5 hover:border-[#00E5FF]/50'
            : 'border-white/15 bg-white/[0.03] hover:border-white/40 hover:bg-white/[0.05]'
        }`}
      >
        {preview ? (
          <div className="relative w-full aspect-square max-h-56 flex items-center justify-center">
            <Image
              src={preview}
              alt="Uploaded preview"
              fill
              unoptimized
              className="object-contain rounded-xl"
            />

            {/* Overlay action on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-xl backdrop-blur-sm">
              <span className="px-3.5 py-1.5 rounded-full bg-[#00E5FF] text-black text-xs font-bold shadow-lg">
                Change Picture
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploading && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 rounded-xl">
                <Loader2 className="w-8 h-8 text-[#00E5FF] animate-spin" />
                <span className="text-xs font-bold text-white">Optimizing & Uploading...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-[#00E5FF]" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-white">
                <span className="text-[#00E5FF] underline underline-offset-2">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-white/50">
                Supports JPG, JPEG, PNG, WebP (auto-optimized up to 15MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Manual URL input fallback */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
          }}
          placeholder="Or paste direct image path / URL (e.g. /images/products/shoe-1.png)"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-white/40 hover:text-white text-xs px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs mt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
