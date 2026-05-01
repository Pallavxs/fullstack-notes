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
const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
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

const Hero = () => {
  return (
    <section className="relative pt-20 border-grid border-b overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row h-[70vh]">
        <div className="w-full md:w-1/2 border-grid md:border-r border-x p-12 flex flex-col justify-center">
          <div className="space-y-8 transition-opacity duration-1000 animate-fade-in-up">
            <div className="flex justify-between items-start">
               <span className="font-serif italic text-5xl leading-none">00.</span>
               <span className="text-meta">Introduction / Archive 26</span>
            </div>
            
            <h1 className="text-7xl lg:text-9xl font-serif leading-[0.9] tracking-tight">
              Essence of <br /> 
              <span className="italic">Simplicity</span>
            </h1>
            
            <p className="max-w-md text-gray-500 text-base italic py-4 leading-[1.6]">
              Elevated essentials for the modern wardrobe. Crafted with precision, designed for longevity in our exclusive studio archive.
            </p>
            
            <div className="flex items-center gap-8 pt-4">
               <Link to="/register" className="px-10 py-4 bg-black text-white text-meta hover:bg-gray-800 transition-colors">
                  Join Studio
               </Link>
               <a href="#shop" className="text-meta border-b border-black pb-1 hover:text-gray-400 transition-colors">
                  View Archive
               </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-12 bg-faint border-grid border-r flex items-center justify-center relative group overflow-hidden">
           <div className="absolute inset-0 overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop" 
               alt="Hero Fashion"
               className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3s] ease-out"
             />
           </div>
           <div className="z-10 text-meta text-white drop-shadow-sm opacity-60 group-hover:opacity-100 transition-opacity">
              Frame Index: SE_26
           </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, idx }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.price?.currency || 'USD',
  }).format(product.price?.amount || 0);

  return (
    <div className="group flex flex-col border-grid border p-6 hover:bg-faint transition-colors duration-500 hover:-translate-y-1 bg-white">
      <div className="flex justify-between items-start mb-6">
        <span className="font-serif italic text-3xl leading-none">~0{idx !== undefined ? idx + 1 : (product._id ? product._id.slice(-1) : 1)}.</span>
        <span className="text-meta">Studio / 26</span>
      </div>

      <div className="relative aspect-[3/4] bg-white overflow-hidden mb-8 border border-gray-100">
        <img 
          src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop'} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Link to={`/product/${product._id}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform">
            <EyeIcon />
          </Link>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform">
            <ShoppingBagIcon />
          </button>
        </div>
      </div>

      <div className="pt-2 space-y-4 flex-1 flex flex-col justify-end">
        <div>
           <h3 className="text-3xl font-serif leading-tight">{product.title}</h3>
           <p className="text-gray-500 text-sm italic font-light truncate mt-1">{product.description}</p>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-auto">
          <span className="text-2xl font-light font-serif">{formattedPrice}</span>
          <Link 
            to={`/product/${product._id}`} 
            className="text-meta border-b border-gray-200 hover:border-black transition-all"
          >
            Inquire
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-white border-grid border-x" id="shop">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-grid pb-8">
        <div>
          <span className="text-meta text-gray-400 mb-2 block">
            Studio Selection
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif leading-none tracking-tight">The Archive</h2>
        </div>
        <div className="flex gap-8 text-meta text-gray-400 overflow-x-auto pb-2 scrollbar-hide">
          <button className="text-black border-b-2 border-black pb-1 whitespace-nowrap">All</button>
          <button className="hover:text-black transition-colors whitespace-nowrap">Silk</button>
          <button className="hover:text-black transition-colors whitespace-nowrap">Linens</button>
          <button className="hover:text-black transition-colors whitespace-nowrap">Warehouse</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
        {products.map((product, idx) => (
          <ProductCard key={product._id} product={product} idx={idx} />
        ))}
      </div>

      <div className="mt-24 flex justify-between items-center border-t border-grid pt-8">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-meta">Archives synchronized</span>
        </div>
        <button className="px-12 py-4 border border-black text-meta hover:bg-black hover:text-white transition-all cursor-pointer">
          Expand Collection
        </button>
      </div>
    </section>
  );
};

const Home = () => {
    const { fetchAllProducts } = useProduct();
    const products = useSelector(state => state.product.products);
    const user = useSelector(state => state.auth?.user || null); // Attempt to get user if auth state exists
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const all = products || [];
    const filtered = search
        ? all.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))
        : all;

    return (
        <div className="min-h-screen border-grid border font-sans bg-white text-black relative">
            <Styles />
            <Navbar search={search} setSearch={setSearch} user={user} />
            <Hero />
            <ProductGrid products={filtered} />
            
            {/* Decorative Ghost Text from theme */}
            <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.03] select-none z-0">
                <h3 className="text-[150px] md:text-[180px] font-bold uppercase leading-none font-sans tracking-tighter m-0 p-0 text-black">Modern</h3>
            </div>
        </div>
    );
};

export default Home;
