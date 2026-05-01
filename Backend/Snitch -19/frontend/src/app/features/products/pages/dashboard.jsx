import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct.js';
import { useNavigate, Link } from 'react-router';

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

const PlusIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const SettingsIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const BarChart3Icon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
const PackageIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const UsersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const EyeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;

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

const Dashboard = () => {
  const { fetchSellerProducts } = useProduct();
  const navigate = useNavigate();
  const sellerProducts = useSelector(state => state.product.sellerProducts);
  const user = useSelector(state => state.auth?.user || null);

  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const products = sellerProducts || [];
  const filtered = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Styles />
      <Navbar search={search} setSearch={setSearch} user={user} />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-meta text-gray-400 block mb-2">Seller Studio</span>
            <h1 className="text-5xl font-serif">Workspace</h1>
          </div>
          <Link to="/seller/create-product" className="px-8 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:bg-gray-800 transition-colors no-underline">
            <PlusIcon /> Add New Item
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { label: 'Revenue', value: '$84,200', icon: BarChart3Icon },
            { label: 'Archive Items', value: products.length, icon: PackageIcon },
            { label: 'Active Clients', value: '1,204', icon: UsersIcon },
          ].map((stat, i) => ( stat &&
            <div key={i} className="p-10 bg-faint border border-gray-100 space-y-6">
              <div className="w-6 h-6 text-gray-400"><stat.icon /></div>
              <div>
                <div className="text-meta text-gray-500 mb-1">{stat.label}</div>
                <div className="text-3xl font-serif">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="text-meta text-black">Master Collection</h3>
            <span className="text-[10px] italic text-gray-400">Showing all {filtered.length} items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {filtered.map((item, index) => {
              const formattedPrice = item.price ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: item.price.currency || 'USD',
              }).format(item.price.amount || 0) : '$0.00';
              const imgSrc = item.images?.[0]?.url;

              return (
                <div key={item._id || index} className="bg-white p-8 group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-serif italic text-2xl">{(index + 1).toString().padStart(2, '0')}.</span>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="p-2 hover:text-black text-gray-400 cursor-pointer"
                        title="View Public Details"
                      ><EyeIcon /></button>
                      <button 
                        onClick={() => navigate(`/seller/product/${item._id}`)}
                        className="p-2 hover:text-black text-gray-400 cursor-pointer"
                        title="Manage Details"
                      ><SettingsIcon /></button>
                    </div>
                  </div>
                  <div className="aspect-[4/3] bg-faint mb-6 overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => navigate(`/seller/product/${item._id}`)}>
                    {imgSrc ? (
                      <img src={imgSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200 text-[10px] uppercase tracking-widest italic">Inventory Frame</div>
                    )}
                  </div>
                  <div className="flex justify-between items-end mt-auto pt-4">
                    <div>
                      <h4 className="font-serif text-xl mb-1 text-black truncate max-w-[150px]">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">In Stock: {item.stock || 12}</p>
                    </div>
                    <div className="text-xl font-light font-serif text-black">{formattedPrice}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-gray-400 text-sm italic">No items found in your archive.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
