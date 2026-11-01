'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, AlertCircle, Sparkles, Tag, Layers } from 'lucide-react';
import { Product, ProductColor } from '@/data/products';
import ImageUploader from './ImageUploader';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => Promise<void>;
  product?: Product | null;
  categories: string[];
}

const DEFAULT_CATEGORIES = ['Shoes', 'Apparel', 'Bags', 'Socks', 'Caps', 'Bottles'];
const FOOTWEAR_SIZES = ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'];
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export default function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
}: ProductFormModalProps) {
  const isEditing = Boolean(product);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [gender, setGender] = useState<'Men' | 'Women' | 'Kids' | 'Unisex'>('Unisex');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [tag, setTag] = useState<string>('NEW');

  // Specifications / Features list
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  // Sizes
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState('');

  // Colors
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#00E5FF');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize or reset form state
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || 'Apparel');
      setGender(product.gender || 'Unisex');
      setPrice(product.price || '');
      setOriginalPrice(product.originalPrice || '');
      setImage(product.image || '');
      setDescription(product.description || '');
      setInStock(product.inStock !== undefined ? product.inStock : true);
      setIsFeatured(Boolean(product.isFeatured));
      setTag(product.tag || '');
      setFeatures(product.features || []);
      setSizes(product.sizes || []);
      setColors(product.colors || []);
    } else {
      setName('');
      setCategory('Apparel');
      setGender('Unisex');
      setPrice('');
      setOriginalPrice('');
      setImage('');
      setDescription('');
      setInStock(true);
      setIsFeatured(false);
      setTag('NEW');
      setFeatures([
        'Breathable performance engineering',
        'Reinforced high-durability construction',
        'Ergonomic fit designed for all-day athletic comfort',
      ]);
      setSizes(['S', 'M', 'L', 'XL']);
      setColors([
        { name: 'Core Black', hex: '#11191C' },
        { name: 'Electric Cyan', hex: '#00E5FF' },
      ]);
    }
    setError(null);
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures((prev) => [...prev, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes((prev) => [...prev, newSize.trim()]);
      setNewSize('');
    }
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    setSizes((prev) => prev.filter((s) => s !== sizeToRemove));
  };

  const handleApplyPresetSizes = (preset: 'footwear' | 'apparel') => {
    if (preset === 'footwear') {
      setSizes(FOOTWEAR_SIZES);
    } else {
      setSizes(APPAREL_SIZES);
    }
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setColors((prev) => [
        ...prev,
        { name: newColorName.trim(), hex: newColorHex },
      ]);
      setNewColorName('');
      setNewColorHex('#8EF03A');
    }
  };

  const handleRemoveColor = (idx: number) => {
    setColors((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter a product name.');
      return;
    }

    if (!price || Number(price) <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    if (!image.trim()) {
      setError('Please upload a product image.');
      return;
    }

    const finalCategory = isCustomCategory && customCategory.trim()
      ? customCategory.trim()
      : category;

    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        category: finalCategory as Product['category'],
        gender,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        image: image.trim(),
        gallery: [image.trim()],
        description: description.trim() || 'Engineered for high performance and daily athletic wear.',
        inStock,
        isFeatured,
        tag: tag ? (tag as Product['tag']) : undefined,
        features: features.length > 0 ? features : ['High-performance construction'],
        sizes: sizes.length > 0 ? sizes : ['Standard'],
        colors: colors.length > 0 ? colors : [{ name: 'Default', hex: '#00E5FF' }],
      });
      onClose();
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  // Combine unique categories for dropdown
  const allAvailableCategories = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...categories])
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#11191C] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0D1417]/90 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              {isEditing ? 'Edit Product' : 'Add New Product'}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] font-bold">
                {isEditing ? 'UPDATE' : 'NEW'}
              </span>
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Fill in product information and upload high-resolution photos
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section: Image Upload */}
          <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-2xl">
            <ImageUploader
              value={image}
              onChange={setImage}
              label="Product Picture (Upload from Computer or Phone)"
            />
          </div>

          {/* Section: Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                Product Name <span className="text-[#00E5FF]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. STRIDE Kinetic Air Zoom Pegasus"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                Category <span className="text-[#00E5FF]">*</span>
              </label>
              {!isCustomCategory ? (
                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomCategory(true);
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF]"
                  >
                    {allAvailableCategories.map((c) => (
                      <option key={c} value={c} className="bg-[#11191C] text-white">
                        {c}
                      </option>
                    ))}
                    <option value="__custom__" className="bg-[#11191C] text-[#00E5FF]">
                      + Add New Category...
                    </option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter category name"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00E5FF]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(false)}
                    className="px-3 py-2 text-xs bg-white/10 hover:bg-white/20 rounded-xl text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                Gender / Target
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Product['gender'])}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="Men" className="bg-[#11191C]">Men</option>
                <option value="Women" className="bg-[#11191C]">Women</option>
                <option value="Kids" className="bg-[#11191C]">Kids</option>
                <option value="Unisex" className="bg-[#11191C]">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                Price (GH₵) <span className="text-[#00E5FF]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-white/40">GH₵</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1200"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                Original Price (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-white/40">GH₵</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1500"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>
          </div>

          {/* Section: Stock Status & Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div>
                <span className="block text-xs font-bold text-white">Stock Status</span>
                <span className="text-[11px] text-white/50">
                  {inStock ? 'Available for purchase' : 'Marked as Out of Stock'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInStock(!inStock)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  inStock ? 'bg-[#8EF03A]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                    inStock ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div>
                <span className="block text-xs font-bold text-white">Featured Product</span>
                <span className="text-[11px] text-white/50">Showcase in top spotlight</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  isFeatured ? 'bg-[#00E5FF]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                    isFeatured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                Badge / Tag
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="" className="bg-[#11191C]">None</option>
                <option value="NEW" className="bg-[#11191C]">NEW</option>
                <option value="BEST SELLER" className="bg-[#11191C]">BEST SELLER</option>
                <option value="HOT" className="bg-[#11191C]">HOT</option>
                <option value="SALE" className="bg-[#11191C]">SALE</option>
                <option value="-20%" className="bg-[#11191C]">-20%</option>
                <option value="-15%" className="bg-[#11191C]">-15%</option>
              </select>
            </div>
          </div>

          {/* Section: Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the product, materials, design, and performance characteristics..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          {/* Section: Specifications / Features */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70">
              Product Specifications & Key Features
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="e.g. Dual-density ZoomX foam with carbon propulsion plate"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {features.length > 0 && (
              <ul className="space-y-1.5 mt-2">
                {features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-xs bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    <span className="text-white/80">• {feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-white/40 hover:text-red-400 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section: Sizes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70">
                Available Sizes
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyPresetSizes('footwear')}
                  className="text-[11px] text-[#00E5FF] hover:underline"
                >
                  Footwear Presets
                </button>
                <span className="text-white/20">|</span>
                <button
                  type="button"
                  onClick={() => handleApplyPresetSizes('apparel')}
                  className="text-[11px] text-[#00E5FF] hover:underline"
                >
                  Apparel Presets
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSize();
                  }
                }}
                placeholder="e.g. US 10.5 or M"
                className="w-40 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Add Size
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {sizes.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(s)}
                    className="hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section: Colorways */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70">
              Color Options
            </label>

            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-9 h-9 rounded-xl border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Color name (e.g. Electric Volt / Black)"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Add Color
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((c, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(idx)}
                    className="hover:text-red-400 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0D1417] flex items-center justify-end gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black text-xs font-black tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center gap-2"
          >
            {saving ? (
              <span>Saving Product...</span>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{isEditing ? 'Save Changes' : 'Publish Product'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
