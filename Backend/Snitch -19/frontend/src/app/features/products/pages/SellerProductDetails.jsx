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
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const Edit3Icon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const Trash2Icon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);
const TrendingUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
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
    .bg-faint {
      background-color: #fbfbfb;
    }
    .border-grid {
      border-color: #f3f4f6; /* gray-100 */
    }
  `}</style>
);

const Navbar = ({ search, setSearch, user }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = 0;

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
            <div className="font-serif italic font-bold tracking-tighter text-3xl text-black">SNITCH</div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {searchOpen && (
              <input autoFocus
                  value={search || ''} onChange={e => setSearch && setSearch(e.target.value)}
                  onBlur={() => !search && setSearchOpen(false)}
                  placeholder="Search..."
                  className="border-b-2 border-black bg-transparent text-sm text-black outline-none w-32 pb-1 transition-all"
              />
          )}
          <button onClick={() => setSearchOpen(s => !s)} className="p-2 text-gray-400 hover:text-black transition-colors cursor-pointer">
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

          <button className="p-2 text-gray-400 hover:text-black transition-colors relative flex items-center cursor-pointer">
            <span className="text-[10px] uppercase tracking-widest font-bold mr-2">Bag</span>
            <span className="text-xs font-serif italic text-black font-bold">({totalItems})</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const SellerProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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
    if (productId) {
      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <Styles />
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-gray-100 border-t-black rounded-full animate-spin" />
          <p className="text-meta text-gray-500">Loading Master File</p>
        </div>
      </div>
    );
  }

  const formattedPrice = product?.price ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.price.currency || 'USD',
  }).format(product.price.amount || 0) : '$0.00';

  const imageSrc = product?.images?.[0]?.url;

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Styles />
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <button 
          onClick={() => navigate('/seller/dashboard')}
          className="flex items-center gap-2 text-meta text-gray-400 mb-12 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
        >
          <div className="w-3 h-3"><ArrowLeftIcon /></div> Dashboard
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="aspect-[3/4] bg-faint border border-gray-100 flex items-center justify-center text-gray-200 text-sm uppercase tracking-widest italic overflow-hidden">
               {imageSrc ? (
                 <img src={imageSrc} alt={product?.title} className="w-full h-full object-cover" />
               ) : (
                 <span>Master Frame Preview</span>
               )}
            </div>
            <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
               <button className="bg-white py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all cursor-pointer">
                 <Edit3Icon /> Edit
               </button>
               <button className="bg-white py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                 <Trash2Icon /> Archive
               </button>
            </div>
          </div>

          <div className="flex-1 space-y-16">
            <div className="space-y-4">
              <span className="text-meta text-gray-400">Inventory Status: Active</span>
              <h1 className="text-5xl lg:text-6xl font-serif tracking-tight">{product?.title || 'Untitled Artifact'}</h1>
              <div className="flex gap-12 pt-4">
                <div>
                   <div className="text-meta text-gray-400 mb-1">Item Valuation</div>
                   <div className="text-3xl font-serif">{formattedPrice}</div>
                </div>
                <div>
                   <div className="text-meta text-gray-400 mb-1">Stock Level</div>
                   <div className="text-3xl font-serif">{product?.stock || 12} Units</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-black text-white space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-meta text-gray-400">Monthly Yield</span>
                    <div className="text-green-400"><TrendingUpIcon /></div>
                  </div>
                  <div className="text-4xl font-serif">$4,800.00</div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">+12% from previous archive</p>
               </div>
               <div className="p-8 bg-faint border border-gray-100 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-meta text-gray-500">Impressions</span>
                    <div className="text-gray-400"><BarChartIcon /></div>
                  </div>
                  <div className="text-4xl font-serif text-black">1.2K</div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">92% conversion to bag</p>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-meta text-black border-b border-gray-100 pb-4">Activity Journal</h3>
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 space-x-8">
                   <div className="flex-1">
                      <p className="text-sm italic text-zinc-600">Archive item purchased by client @nina_vogue</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">2 hours ago</p>
                   </div>
                   <div className="text-sm font-serif font-bold">+{formattedPrice}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerProductDetails;
