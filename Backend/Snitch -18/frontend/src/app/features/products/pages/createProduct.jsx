import React, { useState, useRef, useEffect } from 'react';
import { useProduct } from '../hooks/useProduct.js';

const ImageSlot = ({ label, img, onChange, large }) => (
    <label
        className={`relative group flex flex-col items-center justify-center cursor-pointer border border-dashed border-[#FFD700]/25 hover:border-[#FFD700]/80 transition-all duration-300 bg-[#0a0a0a] hover:bg-[#140f00] p-2 ${large ? 'w-full h-full' : 'h-full w-full'}`}
    >
        <input type="file" accept="image/*" className="hidden" onChange={onChange} />
        {img ? (
            <>
                <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-contain opacity-70 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <span className="text-[#FFD700] text-[9px] font-bold tracking-[0.3em] uppercase bg-black/60 px-2 py-1">Replace</span>
                </div>
            </>
        ) : (
            <>
                <svg className="w-5 h-5 text-[#FFD700]/20 group-hover:text-[#FFD700]/60 transition-colors mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-[8px] font-bold tracking-[0.3em] text-[#FFD700]/20 group-hover:text-[#FFD700]/60 uppercase transition-colors leading-tight text-center px-1">{label}</span>
            </>
        )}
    </label>
);

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const [images, setImages] = useState(Array(7).fill(null));
    const [formData, setFormData] = useState({ title: '', description: '', currency: 'USD', priceAmount: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const descRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Auto-resize description textarea
        if (e.target.name === 'description' && descRef.current) {
            descRef.current.style.height = 'auto';
            descRef.current.style.height = descRef.current.scrollHeight + 'px';
        }
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };

    const handleReset = () => {
        setFormData({ title: '', description: '', currency: 'USD', priceAmount: '' });
        setImages(Array(7).fill(null));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!handleCreateProduct) return;
        setIsSubmitting(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('priceCurrency', formData.currency);
        data.append('priceAmount', formData.priceAmount);
        images.forEach(img => { if (img) data.append('images', img); });
        try {
            await handleCreateProduct(data);
            handleReset();
        } catch (err) {
            console.error('Failed to create product:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-[#050505] text-[#e5e2e1] font-sans overflow-hidden flex flex-col selection:bg-[#FFD700] selection:text-black relative">

            {/* Ghost Watermark */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
                <span
                    className="text-[28vw] font-black uppercase text-transparent select-none"
                    style={{ WebkitTextStroke: '1px rgba(255,215,0,0.03)', fontFamily: 'Epilogue, sans-serif', letterSpacing: '-0.05em' }}
                >
                    SNITCH
                </span>
            </div>

            {/* Top Nav */}
            <nav className="relative z-20 flex-shrink-0 flex items-center justify-between px-12 py-4 border-b border-[#111]">
                <a href="/" className="text-[#FFD700] font-black text-2xl tracking-widest uppercase" style={{ fontFamily: 'Epilogue, sans-serif' }}>SNITCH</a>
                <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#444]">
                    Dashboard &rsaquo; <span className="text-[#FFD700]/70">Create Product</span>
                </p>
                <div className="flex items-center gap-8">
                    {['Collections', 'Archive', 'Orders', 'Analytics'].map(link => (
                        <a key={link} href="#" className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#666] hover:text-white transition-colors">{link}</a>
                    ))}
                </div>
            </nav>

            {/* Main Body — fills remaining height */}
            <div className="relative z-10 flex-1 grid grid-cols-[1fr_1.6fr] overflow-hidden">

                {/* LEFT COLUMN — Image Gallery */}
                <div className="flex flex-col overflow-hidden border-r border-[#0f0f0f] p-6 gap-4">
                    <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#FFD700] flex-shrink-0">
                        Visual Assets <span className="text-[#444] ml-2">7 Slots</span>
                    </p>

                    {/* Large Cover Image */}
                    <div className="flex-[2] min-h-0">
                        <ImageSlot label="Main Cover" img={images[0]} onChange={(e) => handleImageChange(0, e)} large={true} />
                    </div>

                    {/* 6 smaller slots */}
                    <div className="grid grid-cols-3 gap-3 flex-[1] min-h-0">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="min-h-0">
                                <ImageSlot label={`S.0${i}`} img={images[i]} onChange={(e) => handleImageChange(i, e)} large={false} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN — Form */}
                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">

                    {/* Header strip inside form */}
                    <div className="flex-shrink-0 px-12 pt-6 pb-4 border-b border-[#0f0f0f]">
                        <h1
                            className="text-6xl xl:text-7xl font-black uppercase tracking-tighter italic leading-none"
                            style={{ fontFamily: 'Epilogue, sans-serif', color: '#FFD700' }}
                        >
                            Object Genesis
                        </h1>
                    </div>

                    {/* Scrollable form fields */}
                    <div className="flex-1 overflow-y-auto px-12 py-6 flex flex-col gap-7" style={{ scrollbarWidth: 'none' }}>

                        {/* Title */}
                        <div className="group">
                            <label className="block text-[11px] font-bold tracking-[0.4em] uppercase text-[#555] mb-3 group-focus-within:text-[#FFD700] transition-colors">
                                Product Name
                            </label>
                            <input
                                type="text" name="title" value={formData.title} onChange={handleChange} required
                                placeholder="e.g. Vantablack Hoodie Vol.1"
                                className="w-full bg-transparent border-0 border-b-2 border-[#1f1f1f] focus:border-[#FFD700] text-3xl font-light text-white outline-none transition-colors py-3 placeholder:text-[#181818]"
                                style={{ fontFamily: 'Epilogue, sans-serif' }}
                            />
                        </div>

                        {/* Description — auto-grow */}
                        <div className="group">
                            <label className="block text-[11px] font-bold tracking-[0.4em] uppercase text-[#555] mb-3 group-focus-within:text-[#FFD700] transition-colors">
                                The Narrative
                            </label>
                            <textarea
                                ref={descRef}
                                name="description" value={formData.description} onChange={handleChange} required
                                rows={1}
                                placeholder="Garment origin, specifications, aesthetic coordinates..."
                                className="w-full bg-transparent border-0 border-b-2 border-[#1f1f1f] focus:border-[#FFD700] text-base font-light text-[#bbb] outline-none transition-colors py-2 resize-none placeholder:text-[#181818] leading-relaxed overflow-hidden"
                                style={{ minHeight: '2rem', maxHeight: '8rem' }}
                            />
                        </div>

                        {/* Currency + Price row */}
                        <div className="flex gap-8">
                            <div className="group w-1/4">
                                <label className="block text-[11px] font-bold tracking-[0.4em] uppercase text-[#555] mb-3 group-focus-within:text-[#FFD700] transition-colors">Fiat</label>
                                <select
                                    name="currency" value={formData.currency} onChange={handleChange}
                                    className="w-full bg-transparent border-0 border-b-2 border-[#1f1f1f] focus:border-[#FFD700] text-2xl text-[#FFD700] font-black outline-none transition-colors py-3 appearance-none cursor-pointer"
                                    style={{ fontFamily: 'Epilogue, sans-serif' }}
                                >
                                    <option value="USD" className="bg-black">INR</option>
                                    <option value="EUR" className="bg-black">EUR</option>
                                    <option value="INR" className="bg-black">USD</option>
                                </select>
                            </div>
                            <div className="group flex-1">
                                <label className="block text-[11px] font-bold tracking-[0.4em] uppercase text-[#555] mb-3 group-focus-within:text-[#FFD700] transition-colors">Price Amount</label>
                                <input
                                    type="number" name="priceAmount" value={formData.priceAmount} onChange={handleChange} required
                                    placeholder="0.00"
                                    className="w-full bg-transparent border-0 border-b-2 border-[#1f1f1f] focus:border-[#FFD700] text-3xl font-light text-white outline-none transition-colors py-3 placeholder:text-[#181818]"
                                    style={{ fontFamily: 'Epilogue, sans-serif' }}
                                />
                            </div>
                        </div>

                        {/* Guarantee notice */}
                        <div className="border-l-2 border-[#FFD700]/50 pl-4 py-1">
                            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#FFD700]/60 mb-1">Authenticity Guaranteed</p>
                            <p className="text-sm text-[#555] leading-relaxed">Artifacts are permanently catalogued in the Snitch archive upon publication.</p>
                        </div>

                    </div>

                    {/* Sticky Action Bar */}
                    <div className="flex-shrink-0 flex gap-0 border-t border-[#0f0f0f]">
                        <button
                            type="button" onClick={handleReset}
                            className="w-1/3 flex items-center justify-center gap-2 border-r border-[#111] text-[#555] hover:text-red-400 hover:bg-red-950/20 uppercase font-black tracking-[0.2em] text-[11px] py-6 transition-all duration-300"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear Form
                        </button>
                        <button
                            type="submit" disabled={isSubmitting}
                            className="w-2/3 flex items-center justify-center gap-3 bg-[#FFD700] hover:bg-white text-black uppercase font-black tracking-[0.2em] text-[12px] py-6 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Publishing...' : (
                                <>
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                    Publish Product
                                </>
                            )}
                        </button>
                    </div>
                </form>

            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
                ::-webkit-scrollbar { display: none; }
            `}} />
        </div>
    );
};

export default CreateProduct;
