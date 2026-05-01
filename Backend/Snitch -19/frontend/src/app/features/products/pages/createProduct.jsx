import React, { useState, useRef } from 'react';
import { useProduct } from '../hooks/useProduct.js';
import { useNavigate, Link } from 'react-router';
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
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const ImageIconSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
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

const CreateProduct = () => {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  const user = useSelector(state => state.auth?.user || null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    currency: 'USD'
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleCreateProduct) return;
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('priceCurrency', formData.currency);
    data.append('priceAmount', formData.amount);
    
    if (image) {
      data.append('images', image);
    }

    try {
      await handleCreateProduct(data);
      navigate('/seller/dashboard');
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Styles />
      <Navbar user={user} />
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-meta text-gray-500 mb-12 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
        >
          <div className="w-3 h-3"><ArrowLeftIcon /></div> Back
        </button>

        <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
          <div>
            <span className="text-meta text-gray-400 block mb-2">Studio</span>
            <h1 className="text-5xl font-serif">New Archive Item</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-meta text-gray-500">Item Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-black transition-colors bg-transparent italic text-black"
                  placeholder="Vintage Silk Cardigan"
                />
              </div>

              <div className="space-y-2">
                <label className="text-meta text-gray-500">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-black transition-colors bg-transparent italic resize-none text-black"
                  placeholder="Describe the silhouette and material..."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-meta text-gray-500">Price</label>
                  <input 
                    type="number" 
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-black transition-colors bg-transparent italic text-black"
                    placeholder="1200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-meta text-gray-500">Currency</label>
                  <select 
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-black transition-colors bg-transparent appearance-none italic text-black cursor-pointer"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-5 flex items-center justify-center gap-4 group transition-all hover:bg-gray-900 cursor-pointer disabled:opacity-50">
              {isSubmitting ? (
                <span className="text-[10px] uppercase tracking-widest font-bold">Publishing...</span>
              ) : (
                <>
                  <div className="w-4 h-4"><PlusIcon /></div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Publish to Shop</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-8">
            <label className="text-meta text-gray-500 block">Item Imagery</label>
            <label 
              className="aspect-[3/4] bg-faint border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 group cursor-pointer hover:border-black transition-all relative overflow-hidden"
            >
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }} 
              />
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
              ) : (
                <>
                  <div className="mb-4 text-gray-300 group-hover:scale-110 group-hover:text-gray-500 transition-all"><ImageIconSvg /></div>
                  <span className="text-[10px] uppercase tracking-[0.2em] group-hover:text-black transition-colors">Upload Master Frame</span>
                </>
              )}
            </label>
            <p className="text-[10px] text-gray-400 italic">High-resolution photography recommended. Min width 2000px.</p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateProduct;
