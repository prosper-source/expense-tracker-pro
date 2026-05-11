import React from 'react';
import { Search, TrendingUp, Music, Gamepad2, Tv, Sparkles } from 'lucide-react';

const Explore: React.FC = () => {
  const categories = [
    { name: 'For You', icon: <Sparkles size={18} /> },
    { name: 'Trending', icon: <TrendingUp size={18} /> },
    { name: 'Music', icon: <Music size={18} /> },
    { name: 'Gaming', icon: <Gamepad2 size={18} /> },
    { name: 'Comedy', icon: <Tv size={18} /> },
  ];

  const gridItems = [
    { id: 1, views: '2.5M', img: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=400' },
    { id: 2, views: '1.2M', img: 'https://images.unsplash.com/photo-1545670723-196ed0954986?auto=format&fit=crop&q=80&w=400' },
    { id: 3, views: '987K', img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400' },
    { id: 4, views: '2.3M', img: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=400' },
    { id: 5, views: '3.1M', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400' },
    { id: 6, views: '1.1M', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="h-full w-full bg-background flex flex-col pt-12">
      <div className="px-6 mb-6">
        <h2 className="text-3xl font-black mb-4">Explore</h2>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center glass rounded-xl px-4 py-3">
            <Search className="text-white/40 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search users, videos, sounds..." 
              className="bg-transparent border-none outline-none text-white w-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Categories */}
      <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 mb-6">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${idx === 0 ? 'bg-primary text-white shadow-[0_0_15px_rgba(189,0,255,0.4)]' : 'glass text-white/60 hover:text-white'}`}
          >
            {cat.icon}
            <span className="text-sm font-semibold">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Trending Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold uppercase tracking-wider text-white/60">Trending Now</span>
          <button className="text-xs font-bold text-secondary uppercase">See All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {gridItems.map((item) => (
            <div key={item.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <img src={item.img} alt="trending" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold text-white">{item.views} views</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations Section */}
        <div className="mt-8 mb-4 flex flex-col gap-4">
          <div className="glass p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16 rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-secondary">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Nexa AI Selection</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized for you</h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">Our AI has analyzed your interests to find content you'll love.</p>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
