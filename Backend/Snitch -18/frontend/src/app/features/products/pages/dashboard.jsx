import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct.js';
import { useNavigate } from 'react-router';

// ─── Tiny product grid card ────────────────────────────────────────────────────
const ProductCard = ({ product, selected, onSelect }) => {
    const img = product.images?.[0]?.url;
    const price = product.price ? `${product.price.currency} ${Number(product.price.amount).toLocaleString('en-IN')}` : '—';

    return (
        <div
            onClick={() => onSelect(product)}
            className={`group cursor-pointer flex flex-col overflow-hidden transition-all duration-300
                ${selected ? 'ring-1 ring-[#FFD700]/60' : 'ring-0 hover:ring-1 ring-[#ffffff]/5'}`}
            style={{ background: selected ? '#181818' : '#111' }}
        >
            {/* Image */}
            <div className="aspect-[3/4] relative overflow-hidden bg-[#0a0a0a] flex-shrink-0">
                {img ? (
                    <img
                        src={img}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center select-none">
                        <span className="text-[22px] font-black text-[#181818] tracking-widest italic" style={{ fontFamily: 'Epilogue, sans-serif' }}>SNITCH</span>
                    </div>
                )}
                <div className="absolute top-2 left-2">
                    <span className="text-[7px] font-black tracking-[0.2em] uppercase text-green-500">● LIVE</span>
                </div>
                {selected && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]" />
                )}
            </div>

            {/* Info */}
            <div className="px-3 py-2.5 flex flex-col gap-1">
                <p className="text-[12px] font-bold text-[#d4d1ce] truncate leading-tight" style={{ fontFamily: 'Epilogue, sans-serif' }}>{product.title}</p>
                <p className="text-[11px] font-black text-[#FFD700]">{price}</p>
            </div>
        </div>
    );
};

// ─── Featured panel (right side) ──────────────────────────────────────────────
const FeaturedPanel = ({ product, onNavigate }) => {
    if (!product) return (
        <div className="w-full h-full flex items-center justify-center">
            <p className="text-[#222] text-sm italic">Select a product</p>
        </div>
    );

    const img = product.images?.[0]?.url;
    const price = product.price ? `${product.price.currency} ${Number(product.price.amount).toLocaleString('en-IN')}` : '—';
    const date = new Date(product.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Ghost brand watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
                <span className="text-[10vw] font-black italic text-transparent select-none" style={{ WebkitTextStroke: '1px rgba(255,215,0,0.04)', fontFamily: 'Epilogue, sans-serif', letterSpacing: '-0.05em' }}>SNITCH</span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full px-8 py-6 gap-5">

                {/* Label */}
                <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#FFD700]/50">Featured Artifact</p>

                {/* Image */}
                <div className="flex-[2] min-h-0 overflow-hidden bg-[#0e0e0e] relative">
                    {img ? (
                        <img src={img} alt={product.title} className="w-full h-full object-cover object-top opacity-85" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[32px] font-black text-[#181818] italic tracking-widest" style={{ fontFamily: 'Epilogue, sans-serif' }}>SNITCH</span>
                        </div>
                    )}
                    {/* Image overlay gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                </div>

                {/* Title + meta */}
                <div className="flex-shrink-0 flex flex-col gap-2">
                    <h2 className="text-3xl font-black italic text-[#e5e2e1] leading-tight tracking-tight" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        {product.title}
                    </h2>
                    <p className="text-xl font-black text-[#FFD700]">{price}</p>
                    {product.description && (
                        <p className="text-[12px] text-[#555] leading-relaxed line-clamp-2">{product.description}</p>
                    )}
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#333]">Listed {date}</p>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex gap-3">
                    <button
                        onClick={() => onNavigate('/seller/create-product')}
                        className="flex-1 border border-[#222] hover:border-[#FFD700]/40 text-[#555] hover:text-[#999] text-[10px] font-bold tracking-[0.25em] uppercase py-3 transition-all duration-200"
                    >
                        Edit Product
                    </button>
                    <button
                        className="flex-1 bg-[#FFD700] hover:bg-white text-black text-[10px] font-black tracking-[0.25em] uppercase py-3 transition-all duration-200"
                    >
                        View Details
                    </button>
                </div>

            </div>
        </div>
    );
};

// ─── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
    const { fetchSellerProducts } = useProduct();
    const navigate = useNavigate();
    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchSellerProducts();
    }, []);

    // Auto-select first product once loaded
    useEffect(() => {
        if (sellerProducts?.length > 0 && !selected) {
            setSelected(sellerProducts[0]);
        }
    }, [sellerProducts]);

    const products = sellerProducts || [];
    const filtered = products.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-screen w-screen bg-[#080808] text-[#e5e2e1] overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>

            {/* ─── TOP BAR ─── */}
            <header className="flex-shrink-0 flex items-center justify-between px-8 py-3 bg-[#0d0d0d] border-b border-[#111]">
                {/* Logo */}
                <span className="text-[#FFD700] font-black text-lg tracking-[0.2em] uppercase flex-shrink-0" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                    SNITCH
                </span>

                {/* Title */}
                <div className="flex items-center gap-3">
                    <h1 className="text-sm font-black italic tracking-widest uppercase text-[#e5e2e1]" style={{ fontFamily: 'Epilogue, sans-serif' }}>My Archive</h1>
                    <span className="bg-[#FFD700] text-black text-[9px] font-black px-2 py-0.5 leading-none tabular-nums">
                        {String(products.length).padStart(2, '0')} ARTIFACTS
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="bg-transparent border-b border-[#1f1f1f] focus:border-[#FFD700] text-[12px] text-[#777] placeholder:text-[#333] outline-none py-1.5 px-2 w-40 transition-colors duration-200"
                    />
                    <button
                        onClick={() => navigate('/seller/create-product')}
                        className="flex items-center gap-2 bg-[#FFD700] hover:bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-200 flex-shrink-0"
                    >
                        ＋ ADD NEW
                    </button>
                </div>
            </header>

            {/* ─── MAIN ─── */}
            <div className="flex-1 flex overflow-hidden min-h-0">

                {/* LEFT — scrollable product grid (65%) */}
                <div className="w-[65%] flex-shrink-0 flex flex-col overflow-hidden border-r border-[#111]">

                    {/* Sub-header */}
                    <div className="flex-shrink-0 px-6 py-3 flex items-center gap-3 border-b border-[#0f0f0f]">
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#444]">All Products</span>
                        <div className="flex-1 h-px bg-[#111]" />
                        <span className="text-[9px] font-bold tracking-[0.3em] text-[#333] uppercase">{filtered.length} shown</span>
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1f1f1f transparent' }}>
                        {filtered.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center gap-4">
                                <p className="text-5xl font-black italic text-[#111]" style={{ fontFamily: 'Epilogue, sans-serif' }}>EMPTY</p>
                                <p className="text-[#444] text-xs tracking-widest uppercase">No artifacts found.</p>
                                <button
                                    onClick={() => navigate('/seller/create-product')}
                                    className="mt-2 bg-[#FFD700] text-black text-[10px] font-black tracking-[0.2em] uppercase px-6 py-3 hover:bg-white transition-colors"
                                >
                                    ＋ Create First Product
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3 pb-2">
                                {filtered.map(p => (
                                    <ProductCard
                                        key={p._id}
                                        product={p}
                                        selected={selected?._id === p._id}
                                        onSelect={setSelected}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT — Featured panel (35%) */}
                <div className="flex-1 overflow-hidden bg-[#0d0d0d] min-w-0">
                    <FeaturedPanel product={selected} onNavigate={navigate} />
                </div>

            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                ::-webkit-scrollbar { width: 3px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #1f1f1f; }
            `}} />
        </div>
    );
};

export default Dashboard;
