import React from 'react';
import { Settings, CreditCard, CheckCircle2, Grid, Bookmark, Heart, ChevronLeft } from 'lucide-react';

interface ProfileProps {
  onOpenSettings: () => void;
  onOpenWallet: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onOpenSettings, onOpenWallet }) => {
  const stats = [
    { label: 'Following', value: '248' },
    { label: 'Followers', value: '1.2M' },
    { label: 'Likes', value: '32.6M' },
  ];

  const videos = [
    { id: 1, img: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400' },
    { id: 2, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400' },
    { id: 3, img: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=400' },
    { id: 4, img: 'https://images.unsplash.com/photo-1545670723-196ed0954986?auto=format&fit=crop&q=80&w=400' },
    { id: 5, img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400' },
    { id: 6, img: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="h-full w-full bg-background flex flex-col pt-12 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-6 mb-8 flex items-center justify-between">
        <button className="p-2 glass rounded-full opacity-0 pointer-events-none">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-1">
          <h2 className="text-lg font-bold">its_nexaa</h2>
          <CheckCircle2 size={16} className="text-secondary fill-secondary/20" />
        </div>
        <div className="flex gap-2">
          <button onClick={onOpenWallet} className="p-2 glass rounded-full text-secondary">
            <CreditCard size={20} />
          </button>
          <button onClick={onOpenSettings} className="p-2 glass rounded-full">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-secondary rounded-[40px] blur-sm opacity-50" />
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
            alt="profile" 
            className="relative w-28 h-28 rounded-[36px] object-cover border-4 border-background"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black mb-1">Nexaa AI</h1>
          <p className="text-white/60 text-sm">Digital creator | Dreamer</p>
          <p className="text-white/60 text-sm">Making videos that matter ✨</p>
          <a href="#" className="text-secondary text-sm font-bold mt-2 block">yourlinkhere.com</a>
        </div>
      </div>

      {/* Stats */}
      <div className="px-10 flex justify-between mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="text-xl font-black">{stat.value}</p>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="px-6 flex gap-3 mb-8">
        <button className="flex-1 py-3 rounded-2xl bg-white text-black font-black text-sm active:scale-95 transition-transform">
          Follow
        </button>
        <button className="w-14 h-14 rounded-2xl glass flex items-center justify-center">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-white/5">
        <button className="flex-1 py-4 flex justify-center text-primary border-b-2 border-primary">
          <Grid size={20} />
        </button>
        <button className="flex-1 py-4 flex justify-center text-white/40">
          <Heart size={20} />
        </button>
        <button className="flex-1 py-4 flex justify-center text-white/40">
          <Bookmark size={20} />
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-0.5 pb-24">
        {videos.map((video) => (
          <div key={video.id} className="aspect-[3/4] relative group overflow-hidden bg-white/5">
            <img src={video.img} alt="video" className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
               <div className="flex items-center gap-1 text-xs font-bold">
                 <Heart size={14} className="fill-white" />
                 <span>12K</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
