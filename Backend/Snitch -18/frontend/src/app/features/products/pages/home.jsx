import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct.js';
import { useNavigate } from 'react-router';

/* ─── Snitch Studio Design System (Stitch-generated)
   Primary: #3C2A21 (dark brown), Surface: #FBF9F7 (warm white)
   Secondary container: #F4DFCB (peach), Fonts: Inter + Manrope
───────────────────────────────────────────────────── */
const Styles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
            font-family: 'Manrope', sans-serif;
            background: #FBF9F7;
            color: #1B1C1B;
            -webkit-font-smoothing: antialiased;
        }

        .btn {
            display: inline-flex; align-items: center; justify-content: center;
            border: none; cursor: pointer; font-family: 'Inter', sans-serif;
            font-weight: 600; letter-spacing: 0.02em; transition: all 0.2s ease;
            border-radius: 100px;
        }
        .btn-primary {
            background: linear-gradient(145deg, #25160E, #3C2A21);
            color: #fff; padding: 12px 28px; font-size: 14px;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,22,14,0.2); }

        .btn-outline {
            background: transparent; color: #3C2A21;
            border: 1.5px solid #3C2A21; padding: 11px 24px; font-size: 13px;
        }
        .btn-outline:hover { background: #3C2A21; color: #fff; }

        .btn-secondary {
            background: #F4DFCB; color: #3C2A21;
            padding: 10px 20px; font-size: 13px;
        }
        .btn-secondary:hover { background: #E8CEAF; }

        .btn-sm { padding: 9px 18px; font-size: 12px; }

        /* Product card */
        .pcard { background: #fff; border-radius: 12px; overflow: hidden; transition: box-shadow 0.25s, transform 0.25s; }
        .pcard:hover { box-shadow: 0 12px 40px rgba(37,22,14,0.1); transform: translateY(-4px); }
        .pcard:hover .pcard-add { opacity: 1; transform: translateY(0); }
        .pcard-img-wrap { overflow: hidden; }
        .pcard-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .pcard:hover .pcard-img { transform: scale(1.06); }
        .pcard-add {
            width: 100%; padding: 10px; font-family: 'Inter', sans-serif;
            font-size: 12px; font-weight: 600; letter-spacing: 0.05em;
            background: #3C2A21; color: #fff; border: none; cursor: pointer;
            opacity: 0; transform: translateY(4px);
            transition: opacity 0.2s, transform 0.2s;
        }

        /* Category card */
        .cat-card { cursor: pointer; transition: transform 0.25s; border-radius: 12px; overflow: hidden; }
        .cat-card:hover { transform: translateY(-4px); }
        .cat-card:hover img { transform: scale(1.06); }
        .cat-card img { transition: transform 0.5s ease; }

        /* Nav */
        .nav-link {
            background: none; border: none; cursor: pointer;
            font-family: 'Inter', sans-serif; font-size: 14px;
            font-weight: 500; color: #4F4540; transition: color 0.2s;
            padding: 0;
        }
        .nav-link:hover { color: #3C2A21; }

        .icon-btn {
            background: none; border: none; cursor: pointer;
            color: #4F4540; transition: color 0.2s;
            display: flex; align-items: center; padding: 4px;
        }
        .icon-btn:hover { color: #3C2A21; }

        /* Marquee */
        .marquee-inner {
            display: flex; white-space: nowrap;
            animation: scroll-left 22s linear infinite;
        }
        @keyframes scroll-left {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        /* Section header */
        .section-label {
            font-family: 'Inter', sans-serif; font-size: 11px;
            font-weight: 600; letter-spacing: 0.12em;
            text-transform: uppercase; color: #81756F;
        }
        .section-title {
            font-family: 'Inter', sans-serif; font-weight: 800;
            letter-spacing: -0.02em; color: #25160E;
        }

        @media (max-width: 900px) {
            .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
            .grid-2 { grid-template-columns: 1fr !important; }
            .hero-inner { flex-direction: column !important; text-align: center; align-items: center !important; }
        }
    `}</style>
);

/* ── Navbar ──────────────────────────────────────────────────────────────────── */
const Navbar = ({ navigate, search, setSearch }) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: scrolled ? 'rgba(251,249,247,0.94)' : '#FBF9F7',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderBottom: '1px solid #EAE8E6',
            padding: '0 48px', height: '64px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'background 0.3s',
        }}>
            {/* Logo */}
            <span onClick={() => navigate('/')} style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '20px',
                letterSpacing: '-0.01em', color: '#25160E', cursor: 'pointer',
            }}>SNITCH</span>

            {/* Center links */}
            <div style={{ display: 'flex', gap: '32px' }}>
                {['Home', 'Shop', 'Collections', 'About'].map(l => (
                    <button key={l} className="nav-link"
                        onClick={() => l === 'Home' ? navigate('/') : l === 'Shop' && navigate('/seller/dashboard')}>
                        {l}
                    </button>
                ))}
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {searchOpen && (
                    <input autoFocus
                        value={search} onChange={e => setSearch(e.target.value)}
                        onBlur={() => !search && setSearchOpen(false)}
                        placeholder="Search..."
                        style={{
                            border: 'none', borderBottom: '2px solid #3C2A21',
                            background: 'transparent', fontFamily: 'Manrope, sans-serif',
                            fontSize: '13px', color: '#1B1C1B', outline: 'none',
                            padding: '4px 6px', width: '160px',
                        }}
                    />
                )}
                <button className="icon-btn" onClick={() => setSearchOpen(s => !s)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </button>
                <button className="icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>Sign In</button>
            </div>
        </nav>
    );
};

/* ── Hero Banner ─────────────────────────────────────────────────────────────── */
const Hero = ({ heroProduct, navigate }) => {
    const img = heroProduct?.images?.[0]?.url;
    const price = heroProduct?.price
        ? `${heroProduct.price.currency} ${Number(heroProduct.price.amount).toLocaleString('en-IN')}`
        : null;

    return (
        <section style={{ background: 'linear-gradient(135deg, #F4DFCB 0%, #FBF9F7 55%, #FFFFFF 100%)', padding: '0' }}>
            <div className="hero-inner" style={{ display: 'flex', alignItems: 'center', minHeight: '520px', maxWidth: '1280px', margin: '0 auto', padding: '60px 48px', gap: '64px' }}>
                {/* Text side */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ display: 'inline-block', background: '#F4DFCB', color: '#3C2A21', fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '100px', width: 'fit-content' }}>
                        New Season · 2026
                    </span>
                    <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)', color: '#25160E', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                        New Season<br />Collection
                    </h1>
                    <p style={{ fontSize: '16px', color: '#4F4540', lineHeight: 1.7, maxWidth: '400px', fontWeight: 400 }}>
                        Discover the latest styles. Premium streetwear crafted for the bold and the modern.
                        {price && <><br /><strong style={{ color: '#3C2A21' }}>Starting from {price}</strong></>}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/seller/dashboard')}>Shop Now</button>
                        <button className="btn btn-outline">View Lookbook</button>
                    </div>
                </div>

                {/* Image side */}
                <div style={{ flex: 1, maxWidth: '520px', aspectRatio: '4/5', borderRadius: '16px', overflow: 'hidden', background: '#EAE8E6', flexShrink: 0 }}>
                    {img ? (
                        <img src={img} alt={heroProduct?.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F4DFCB, #EAE8E6)' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '40px', color: '#D3C3BD', letterSpacing: '0.1em' }}>SNITCH</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

/* ── Promo Marquee ──────────────────────────────────────────────────────────── */
const PromoStrip = () => {
    const t = '  FREE SHIPPING ON ALL ORDERS  ·  10% OFF WITH CODE: FLAME  ·  NEW ARRIVALS EVERY WEEK  ·  PREMIUM STREETWEAR  ·';
    return (
        <div style={{ background: '#3C2A21', overflow: 'hidden', height: '38px', display: 'flex', alignItems: 'center' }}>
            <div className="marquee-inner">
                {Array(6).fill(t).map((s, i) => (
                    <span key={i} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.1em', flexShrink: 0 }}>{s}</span>
                ))}
            </div>
        </div>
    );
};

/* ── Category Cards ─────────────────────────────────────────────────────────── */
const Categories = ({ products }) => {
    const cats = [
        { label: 'Men',         color: '#EAE8E6', imgIdx: 0 },
        { label: 'Women',       color: '#F4DFCB', imgIdx: 2 },
        { label: 'Accessories', color: '#E4E2E0', imgIdx: 4 },
        { label: 'Sale',        color: '#FBDCCE', imgIdx: 7 },
    ];

    return (
        <section style={{ background: '#FBF9F7', padding: '72px 48px', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ marginBottom: '36px' }}>
                <p className="section-label" style={{ marginBottom: '8px' }}>Browse</p>
                <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Shop by Category</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {cats.map((c, i) => {
                    const img = products[c.imgIdx]?.images?.[0]?.url;
                    return (
                        <div key={i} className="cat-card" style={{ background: c.color, aspectRatio: '3/4', position: 'relative' }}>
                            {img && <img src={img} alt={c.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />}
                            {/* Gradient overlay */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(37,22,14,0.7) 0%, transparent 50%)', borderRadius: '12px' }} />
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff' }}>{c.label}</p>
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>Shop Now →</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

/* ── Product Card ───────────────────────────────────────────────────────────── */
const ProductCard = ({ product, navigate }) => {
    const img = product.images?.[0]?.url;
    const price = product.price ? Number(product.price.amount) : 0;
    const currency = product.price?.currency || 'INR';
    const origPrice = Math.round(price * 1.25);

    return (
        <div className="pcard" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
             onClick={() => navigate(`/product/${product._id}`)}>
            <div className="pcard-img-wrap" style={{ aspectRatio: '3/4', background: '#F5F3F1', position: 'relative' }}>
                {img
                    ? <img className="pcard-img" src={img} alt={product.title} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: '#D3C3BD', fontSize: '20px', letterSpacing: '0.1em' }}>SNITCH</span>
                    </div>
                }
                {/* Discount badge */}
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#FBDCCE', color: '#25160E', fontSize: '10px', fontFamily: 'Inter, sans-serif', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.04em' }}>
                    20% OFF
                </span>
            </div>
            <div style={{ padding: '14px 16px 4px' }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '14px', color: '#25160E', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px', color: '#3C2A21' }}>{currency} {price.toLocaleString('en-IN')}</span>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#81756F', textDecoration: 'line-through' }}>{currency} {origPrice.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <div style={{ padding: '10px 16px 16px' }}>
                <button className="pcard-add">Add to Cart</button>
            </div>
        </div>
    );
};

/* ── Featured Products ──────────────────────────────────────────────────────── */
const FeaturedProducts = ({ products, navigate }) => (
    <section style={{ background: '#F5F3F1', padding: '72px 48px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px' }}>
                <div>
                    <p className="section-label" style={{ marginBottom: '8px' }}>Latest Drops</p>
                    <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Featured Products</h2>
                </div>
                <button className="btn btn-outline btn-sm">View All</button>
            </div>

            {products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#D3C3BD' }}>No products yet</p>
                    <p style={{ color: '#81756F', marginTop: '8px', fontSize: '14px' }}>Check back soon for new arrivals</p>
                </div>
            ) : (
                <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '20px' }}>
                    {products.map(p => <ProductCard key={p._id} product={p} navigate={navigate} />)}
                </div>
            )}
        </div>
    </section>
);

/* ── Promo Banner ───────────────────────────────────────────────────────────── */
const PromoBanner = ({ navigate }) => (
    <section style={{ background: '#25160E', padding: '64px 48px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
            Limited Time Offer
        </p>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Extra 10% Off
        </h2>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            Use code <strong style={{ color: '#F4DFCB', letterSpacing: '0.05em' }}>FLAME</strong> at checkout · Valid on all orders
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" style={{ background: '#F4DFCB', color: '#25160E', borderRadius: '100px', padding: '12px 32px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => navigate('/register')}>
                Shop the Sale
            </button>
            <button className="btn btn-sm" style={{ background: 'transparent', color: 'rgba(255,255,255,0.75)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '12px 32px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                Learn More
            </button>
        </div>
    </section>
);

/* ── Trust Badges ───────────────────────────────────────────────────────────── */
const TrustBadges = () => (
    <section style={{ background: '#FBF9F7', padding: '48px 48px', borderTop: '1px solid #EAE8E6', borderBottom: '1px solid #EAE8E6' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
            {[
                { icon: '🚚', title: 'Free Shipping', sub: 'On all orders' },
                { icon: '↩️', title: 'Easy Returns', sub: '30-day policy' },
                { icon: '🔒', title: 'Secure Payment', sub: '100% protected' },
                { icon: '✨', title: 'Premium Quality', sub: 'Crafted to last' },
            ].map(b => (
                <div key={b.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '24px' }}>{b.icon}</span>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '13px', color: '#25160E' }}>{b.title}</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#81756F' }}>{b.sub}</p>
                </div>
            ))}
        </div>
    </section>
);

/* ── Footer ─────────────────────────────────────────────────────────────────── */
const Footer = () => (
    <footer style={{ background: '#FBF9F7', padding: '40px 48px', borderTop: '1px solid #EAE8E6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '18px', color: '#25160E' }}>SNITCH</span>
            <div style={{ display: 'flex', gap: '28px' }}>
                {['Home', 'Shop', 'Collections', 'About', 'Contact'].map(l => (
                    <span key={l} className="nav-link" style={{ cursor: 'pointer', fontSize: '13px' }}>{l}</span>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <button className="icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></button>
                <button className="icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></button>
            </div>
        </div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid #EAE8E6', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
                {['Privacy Policy', 'Terms of Service', 'Shipping', 'Sustainability'].map(l => (
                    <span key={l} style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#81756F', cursor: 'pointer' }}>{l}</span>
                ))}
            </div>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#81756F' }}>© 2026 Snitch. All rights reserved.</span>
        </div>
    </footer>
);

/* ── Home Page ──────────────────────────────────────────────────────────────── */
const Home = () => {
    const { fetchAllProducts } = useProduct();
    const products = useSelector(state => state.product.products);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const all = products || [];
    const filtered = search
        ? all.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))
        : all;

    return (
        <>
            <Styles />
            <div style={{ minHeight: '100vh' }}>
                <PromoStrip />
                <Navbar navigate={navigate} search={search} setSearch={setSearch} />
                <Hero heroProduct={all[0] || null} navigate={navigate} />
                <TrustBadges />
                <Categories products={all} />
                <FeaturedProducts products={filtered} navigate={navigate} />
                <PromoBanner navigate={navigate} />
                <Footer />
            </div>
        </>
    );
};

export default Home;
