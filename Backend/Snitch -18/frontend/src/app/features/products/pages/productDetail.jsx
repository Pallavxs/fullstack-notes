import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct.js';

/* ─────────────────────────────────────────────
   Utilities
───────────────────────────────────────────── */
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const RELATED = [
  { id: 1, name: 'Structured Tunic', price: '$850', tag: 'New' },
  { id: 2, name: 'Linen Void Pant', price: '$620', tag: 'Bestseller' },
  { id: 3, name: 'Deconstruct Oxford', price: '$480', tag: 'Limited' },
  { id: 4, name: 'Fracture Ring', price: '$310', tag: 'Sale' },
];

const ACCORDION_ITEMS = [
  {
    id: 'description',
    label: 'Description',
    content:
      'This piece represents the culmination of our seasonal exploration into form and craftsmanship. The fabric is sourced from heritage mills and treated in‑house to achieve its distinctive, lived-in patina. The asymmetric cut forces a re‑evaluation of classic silhouettes, making it a true wardrobe investment.',
  },
  {
    id: 'details',
    label: 'Product Details & Materials',
    content:
      '100% Heavyweight Cotton Canvas · Garment dyed and enzyme washed · Antiqued silver‑tone hardware · Asymmetric cut · Made in Portugal · Ref. SN‑2026‑NCC',
  },
  {
    id: 'shipping',
    label: 'Shipping & Returns',
    content:
      'Complimentary worldwide shipping on this item. Returns are accepted within 30 days of delivery. Items must be unworn, in original condition, and with all tags attached.',
  },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Navbar */
function Navbar({ onBack }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E8E4DE]/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200 text-sm tracking-wide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>

        {/* Brand */}
        <span className="text-[#1C1C1C] text-sm font-medium tracking-[0.3em] uppercase">Snitch</span>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button className="text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

/** Image Gallery */
function ImageGallery({ images }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Build display list: real images + placeholders to always show 4 thumbs
  const displayImages = images && images.length > 0
    ? images
    : [null, null, null, null];

  const mainSrc = displayImages[activeIdx];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#F4F1EC] aspect-[3/4] group">
        {mainSrc ? (
          <img
            src={mainSrc}
            alt="Product"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-[#8A8A8A]/40 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18" />
              </svg>
              <p className="text-[#8A8A8A]/60 text-xs tracking-widest uppercase">Product Image</p>
            </div>
          </div>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-[#FAFAF8]/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-[#8A8A8A] tracking-wide">
          {activeIdx + 1} / {displayImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {displayImages.slice(0, 4).map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`relative overflow-hidden rounded-xl aspect-square bg-[#F4F1EC] transition-all duration-200 ${
              activeIdx === i
                ? 'ring-1 ring-[#1C1C1C] ring-offset-2 ring-offset-[#FAFAF8]'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            {src ? (
              <img src={src} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#8A8A8A]/30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Size Selector */
function SizeSelector({ selected, onSelect }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#8A8A8A] tracking-[0.15em] uppercase">Select Size</span>
        <button className="text-xs text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200 underline underline-offset-2">
          Size Guide
        </button>
      </div>
      <div className="flex gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`flex-1 py-2.5 rounded-lg text-xs font-medium tracking-wider transition-all duration-200 ${
              selected === size
                ? 'bg-[#1C1C1C] text-[#FAFAF8]'
                : 'bg-[#F4F1EC] text-[#8A8A8A] hover:bg-[#E8E4DE] hover:text-[#1C1C1C]'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Accordion */
function Accordion() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="divide-y divide-[#E8E4DE]">
      {ACCORDION_ITEMS.map((item) => (
        <div key={item.id} className="py-5">
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-[#1C1C1C] font-medium">{item.label}</span>
            <svg
              className={`w-4 h-4 text-[#8A8A8A] transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              openId === item.id ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-sm text-[#8A8A8A] leading-relaxed font-light">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Related product card */
function RelatedCard({ item }) {
  return (
    <div className="flex-shrink-0 w-56 group cursor-pointer">
      <div className="rounded-2xl overflow-hidden bg-[#F4F1EC] aspect-[3/4] mb-3 relative transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:shadow-black/5">
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-10 h-10 text-[#8A8A8A]/20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
          </svg>
        </div>
        <div className="absolute top-3 left-3 bg-[#FAFAF8]/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] tracking-widest uppercase text-[#8A8A8A]">
          {item.tag}
        </div>
      </div>
      <p className="text-[#1C1C1C] text-sm font-light tracking-wide group-hover:text-[#8A8A8A] transition-colors duration-200">
        {item.name}
      </p>
      <p className="text-[#8A8A8A] text-xs mt-1">{item.price} USD</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToBag, setAddedToBag] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const { handleGetProductById } = useProduct();

  useEffect(() => {
    async function fetchProductDetails() {
      setLoading(true);
      try {
        const data = await handleGetProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [productId]);

  function handleAddToBag() {
    if (!selectedSize) return;
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  }

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-[#E8E4DE] border-t-[#8A8A8A] rounded-full animate-spin" />
          <p className="text-xs tracking-[0.2em] uppercase text-[#8A8A8A]">Loading</p>
        </div>
      </div>
    );
  }

  /* ── Format price ── */
  const priceDisplay = product?.price
    ? `$${(product.price.amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    : '$0.00';
  const currency = product?.price?.currency || 'USD';

  /* ── Images array ── */
  const images = product?.images?.length > 0 ? product.images : [];

  /* ── Created date ── */
  const createdDate = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '26 April 2026';

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans">
      <Navbar onBack={() => navigate(-1)} />

      {/* ── HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-12 xl:gap-20">

          {/* LEFT — Gallery */}
          <ImageGallery images={images} />

          {/* RIGHT — Product Info */}
          <div className="flex flex-col justify-start lg:pt-4">

            {/* Brand tag */}
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A8A8A] mb-4">Snitch Atelier</p>

            {/* Product title */}
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1C1C] leading-tight mb-5">
              {product?.title || 'New cool Cofe'}
            </h1>

            {/* Thin divider */}
            <div className="w-full h-px bg-[#E8E4DE] mb-5" />

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-light text-[#1C1C1C]">{priceDisplay}</span>
              <span className="text-xs tracking-widest text-[#8A8A8A] uppercase">{currency}</span>
            </div>
            <p className="text-xs text-[#8A8A8A] mb-7 font-light">Free worldwide shipping · Returns within 30 days</p>

            {/* Description */}
            <p className="text-sm text-[#8A8A8A] leading-relaxed font-light mb-8">
              {product?.description || 'New variant with cool look.'} Masterfully crafted with attention to asymmetric detail and distressed textures for the modern avant-garde wardrobe.
            </p>

            {/* Size selector */}
            <div className="mb-7">
              <SizeSelector selected={selectedSize} onSelect={setSelectedSize} />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToBag}
                disabled={!selectedSize}
                className={`w-full py-4 rounded-xl text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 
                  ${addedToBag
                    ? 'bg-[#4A7C59] text-[#FAFAF8]'
                    : selectedSize
                      ? 'bg-[#1C1C1C] text-[#FAFAF8] hover:bg-[#2C2C2C] active:scale-[0.99]'
                      : 'bg-[#E8E4DE] text-[#8A8A8A] cursor-not-allowed'
                  }`}
              >
                {addedToBag ? '✓ Added to Bag' : selectedSize ? 'Add to Bag' : 'Select a Size'}
              </button>

              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-full py-4 rounded-xl text-sm tracking-[0.15em] uppercase font-medium border transition-all duration-300 active:scale-[0.99]
                  ${wishlisted
                    ? 'border-[#1C1C1C] text-[#1C1C1C] bg-[#F4F1EC]'
                    : 'border-[#E8E4DE] text-[#8A8A8A] hover:border-[#8A8A8A] hover:text-[#1C1C1C]'
                  }`}
              >
                {wishlisted ? '♥ Saved' : '♡ Save to Wishlist'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#E8E4DE]">
              {[
                { icon: '↩', label: 'Free Returns' },
                { icon: '⚿', label: 'Secure Checkout' },
                { icon: '✦', label: 'Premium Quality' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="text-[#8A8A8A] text-lg">{b.icon}</span>
                  <span className="text-[9px] tracking-[0.15em] uppercase text-[#8A8A8A]">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Listed date */}
            <p className="text-[10px] text-[#8A8A8A]/60 tracking-wide mt-5 font-light">
              Listed {createdDate}
            </p>
          </div>
        </div>
      </section>

      {/* ── ACCORDION DETAILS ── */}
      <section className="bg-[#FAFAF8] border-y border-[#E8E4DE]">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Accordion />
        </div>
      </section>

      {/* ── BRAND SECTION ── */}
      <section className="bg-[#F4F1EC] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#8A8A8A] mb-4">The Maker</p>
          <h2 className="text-5xl font-light tracking-[0.3em] uppercase text-[#1C1C1C] mb-4">Snitch</h2>
          <p className="text-sm text-[#8A8A8A] font-light tracking-wide mb-6">
            "Crafted to last. Designed to matter."
          </p>
          <div className="inline-flex items-center gap-2 bg-[#FAFAF8] rounded-full px-4 py-2 border border-[#E8E4DE]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A8A8A]">Premium Verified Seller</span>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-10">
            <h3 className="text-sm tracking-[0.2em] uppercase text-[#1C1C1C] font-medium">You May Also Like</h3>
            <button className="text-xs text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200 tracking-wide">
              View All →
            </button>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {RELATED.map((item) => (
              <RelatedCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#E8E4DE] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A8A8A]">Snitch Atelier</span>
          <div className="flex gap-8">
            {['Journal', 'Ethics', 'Shipping', 'Returns', 'Contact'].map((link) => (
              <button key={link} className="text-[10px] tracking-[0.15em] uppercase text-[#8A8A8A] hover:text-[#1C1C1C] transition-colors duration-200">
                {link}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#8A8A8A]/50 tracking-wide">© 2026 SNITCH. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
