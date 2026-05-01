import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useProduct } from '../hooks/useProduct.js';
import { useSelector } from 'react-redux';

// SVG Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const Share2Icon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
);
const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    body {
      background-color: white;
      color: #0a0a0a;
      -webkit-font-smoothing: antialiased;
      font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
      margin: 0;
      padding: 0;
    }
    ::selection {
      background: black;
      color: white;
    }
    .font-serif {
      font-family: "Cormorant Garamond", serif;
    }
    .text-meta {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      font-weight: 700;
      color: #6b7280; /* text-gray-500 */
    }
    .border-grid {
      border-color: #f3f4f6; /* gray-100 */
    }
    .bg-faint {
      background-color: #fbfbfb;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const Navbar = ({ search, setSearch, user }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = 0; // Placeholder

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-grid">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-black transition-colors">Archive</Link>
            <Link to="/" className="hover:text-black transition-colors">Shop</Link>
            <Link to="/" className="hover:text-black transition-colors">Studio</Link>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="block">
            <div className="font-serif italic font-bold tracking-tighter text-3xl">SNITCH</div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {searchOpen && (
              <input autoFocus
                  value={search} onChange={e => setSearch(e.target.value)}
                  onBlur={() => !search && setSearchOpen(false)}
                  placeholder="Search..."
                  className="border-b-2 border-black bg-transparent text-sm text-black outline-none w-32 pb-1 transition-all"
              />
          )}
          <button onClick={() => setSearchOpen(s => !s)} className="p-2 text-gray-400 hover:text-black transition-colors">
            <SearchIcon />
          </button>
          
          {user ? (
            <>
              {user.role === 'seller' && (
                <Link to="/seller/dashboard" className="p-2 text-gray-400 hover:text-black transition-colors" title="Dashboard">
                  <DashboardIcon />
                </Link>
              )}
              <Link to="/profile" className="p-2 text-gray-400 hover:text-black transition-colors">
                <UserIcon />
              </Link>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-4 border-l border-grid pl-4 ml-2">
              <Link to="/login" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors">Log In</Link>
              <Link to="/register" className="text-[10px] uppercase tracking-widest font-bold bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors">Sign Up</Link>
            </div>
          )}

          <button className="p-2 text-gray-400 hover:text-black transition-colors relative flex items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold mr-2">Bag</span>
            <span className="text-xs font-serif italic text-black font-bold">({totalItems})</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToBag, setAddedToBag] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#1a1a1a');

  const [search, setSearch] = useState('');
  const user = useSelector(state => state.auth?.user || null);

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
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <Styles />
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-gray-100 border-t-black rounded-full animate-spin" />
          <p className="text-meta text-gray-500">Loading Archive</p>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product?.price?.currency || 'USD',
  }).format(product?.price?.amount || 0);

  const imageSrc = product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2610&auto=format&fit=crop';
  
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Styles />
      <Navbar search={search} setSearch={setSearch} user={user} />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 lg:h-[100vh] flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/2 h-full bg-faint border border-gray-100 relative group overflow-hidden aspect-[3/4] md:aspect-auto">
           <img 
             src={imageSrc} 
             alt={product?.title || 'Product'} 
             className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[3s]"
           />
           <button 
             onClick={() => navigate(-1)}
             className="absolute top-8 left-8 p-3 bg-white border border-gray-100 rounded-full hover:scale-110 transition-transform group shadow-sm z-10 cursor-pointer"
           >
             <ArrowLeftIcon />
           </button>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center py-12 space-y-12 h-full overflow-y-auto scrollbar-hide">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <span className="text-meta">Collection / 2026</span>
              <div className="flex gap-4">
                <button className="text-gray-400 hover:text-black transition-colors cursor-pointer"><Share2Icon /></button>
                <button className="text-gray-400 hover:text-black transition-colors cursor-pointer"><HeartIcon /></button>
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif tracking-tight leading-none">{product?.title || 'Essence of Simplicity'}</h1>
            <p className="text-gray-500 italic text-lg leading-relaxed max-w-md">
              {product?.description || 'A timeless silhouette crafted from ethically sourced mulberry silk. Featuring hand-finished edges and architectural hardware.'}
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-meta text-gray-500 block">Select Palette</span>
              <div className="flex gap-4">
                 {['#1a1a1a', '#f5f5f5', '#e5e5e5'].map(c => (
                   <div 
                     key={c} 
                     onClick={() => setSelectedColor(c)}
                     style={{backgroundColor: c}} 
                     className={`w-6 h-6 border cursor-pointer hover:scale-110 transition-transform ${selectedColor === c ? 'border-black' : 'border-gray-100'}`} 
                   />
                 ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 pt-8">
              <span className="text-4xl font-light font-serif">{formattedPrice}</span>
              <button 
                onClick={handleAddToBag}
                className="w-full sm:flex-1 bg-black text-white py-5 flex items-center justify-center gap-4 group hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {addedToBag ? (
                  <span className="text-[10px] uppercase tracking-widest font-bold">✓ Added to Bag</span>
                ) : (
                  <>
                    <ShoppingBagIcon />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Incorporate to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 mt-12 grid grid-cols-2 gap-8">
             <div>
               <h4 className="text-meta text-black mb-2">Provenance</h4>
               <p className="text-[10px] text-gray-400 italic">Italian Studio Archive / 2026 Edition.</p>
             </div>
             <div>
               <h4 className="text-meta text-black mb-2">Technique</h4>
               <p className="text-[10px] text-gray-400 italic">Architectural hand-finish.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
