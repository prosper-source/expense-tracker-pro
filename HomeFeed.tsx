import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Music, Radio, Users } from 'lucide-react';

interface HomeFeedProps {
  onOpenLive: () => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ onOpenLive }) => {
  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const videos = [
    {
      id: 1,
      user: '@neon_pulse',
      caption: 'Cyberpunk nights in Tokyo 🌃 #future #tokyo #neon',
      likes: '1.2M',
      comments: '12.4K',
      shares: '8.5K',
      music: 'Digital Dreams - SynthWave',
      videoUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: 2,
      user: '@its_nexaa',
      caption: 'Testing the new Nexa AI filters. Mind blowing! 🤯✨ #nexa #ai #tech',
      likes: '890K',
      comments: '5.2K',
      shares: '12K',
      music: 'Cyber Beat - Nexa Original',
      videoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    }
  ];

  const [showHeart, setShowHeart] = useState<{id: number, x: number, y: number} | null>(null);

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDoubleTap = (e: React.MouseEvent, id: number) => {
    if (e.detail === 2) {
      setLiked(prev => ({ ...prev, [id]: true }));
      setShowHeart({ id, x: e.clientX, y: e.clientY });
      setTimeout(() => setShowHeart(null), 1000);
    }
  };

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      {/* Top Tabs */}
      <div className="absolute top-10 left-0 right-0 z-20 flex justify-center items-center gap-6">
        <button 
          onClick={() => setActiveTab('following')}
          className={`text-base font-bold transition-all ${activeTab === 'following' ? 'text-white' : 'text-white/40'}`}
        >
          Following
        </button>
        <div className="w-px h-3 bg-white/20" />
        <button 
          onClick={() => setActiveTab('foryou')}
          className={`text-base font-bold transition-all ${activeTab === 'foryou' ? 'text-white neon-text-purple' : 'text-white/40'}`}
        >
          For You
        </button>
        
        <button 
          onClick={onOpenLive}
          className="absolute right-6 p-2 rounded-full glass-dark text-primary animate-pulse"
        >
          <Radio size={20} />
        </button>
      </div>

      {/* Video Content (Simplified Mock) */}
      <div className="flex-1 w-full relative overflow-y-auto no-scrollbar snap-y snap-mandatory">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="h-full w-full snap-start relative flex flex-col"
            onClick={(e) => handleDoubleTap(e, video.id)}
          >
            {/* Background Image as Placeholder for Video */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${video.videoUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>

            {/* Double Tap Heart Animation */}
            <AnimatePresence>
              {showHeart?.id === video.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute z-50 pointer-events-none"
                  style={{ top: '40%', left: '40%' }}
                >
                  <Heart size={100} className="text-accent fill-accent" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right Side Buttons */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-primary p-0.5 mb-2">
                  <img src={video.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                </div>
                <button 
                  onClick={() => toggleLike(video.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <Heart 
                    size={32} 
                    className={`transition-all ${liked[video.id] ? 'fill-accent text-accent' : 'text-white'}`} 
                  />
                  <span className="text-xs font-bold">{video.likes}</span>
                </button>
              </div>

              <div className="flex flex-col items-center gap-1">
                <MessageCircle size={32} className="text-white" />
                <span className="text-xs font-bold">{video.comments}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Share2 size={32} className="text-white" />
                <span className="text-xs font-bold">{video.shares}</span>
              </div>

              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 mt-4"
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Music size={16} className="text-white" />
                </div>
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-6 left-4 right-16 z-10">
              <h3 className="text-lg font-bold flex items-center gap-2">
                {video.user}
                <Users size={14} className="text-secondary" />
              </h3>
              <p className="text-sm text-white/90 mt-2 line-clamp-2">
                {video.caption}
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs font-medium bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                <Music size={12} className="text-secondary" />
                <span>{video.music}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
