import React from 'react';
import { X, Eye, Gift, Heart, Send, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveStreamProps {
  onClose: () => void;
}

const LiveStream: React.FC<LiveStreamProps> = ({ onClose }) => {
  const [comments, setComments] = React.useState([
    { id: 1, user: 'Ryan Ray', text: 'So beautiful! 😍', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
    { id: 2, user: 'Anika', text: 'Love your vibes ✨', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 3, user: 'Rohit_22', text: 'Awesome stream!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
  ]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newComment = {
        id: Date.now(),
        user: ['Alex', 'Jordan', 'Skyler', 'Taylor'][Math.floor(Math.random() * 4)],
        text: ['NEXA is the future!', 'Wow 🔥', 'Insane graphics', 'Love this stream', 'Cyber vibes!!'][Math.floor(Math.random() * 5)],
        avatar: `https://i.pravatar.cc/100?u=${Math.random()}`
      };
      setComments(prev => [...prev.slice(-4), newComment]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      {/* Background Live Video (Mock) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1000)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Top Header */}
      <div className="absolute top-12 left-6 right-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
           <div className="glass-dark p-1 rounded-full flex items-center gap-2 pr-4">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" className="w-8 h-8 rounded-full border border-primary" />
              <div>
                <p className="text-[10px] font-bold">Nexa Live</p>
                <p className="text-[8px] text-white/60">25.8K Live</p>
              </div>
              <button className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold">Follow</button>
           </div>
           <div className="glass-dark px-3 py-1 rounded-full flex items-center gap-1">
              <Eye size={12} className="text-secondary" />
              <span className="text-[10px] font-bold">12.2K</span>
           </div>
        </div>
        <button onClick={onClose} className="p-2 glass rounded-full">
           <X size={20} />
        </button>
      </div>

      {/* Trending Tag */}
      <div className="absolute top-28 left-6 z-10">
         <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border-l-4 border-l-accent">
            <Sparkles size={12} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Weekly Top 12</span>
         </div>
      </div>

      {/* Floating Comments */}
      <div className="absolute bottom-24 left-6 right-20 max-h-48 overflow-y-auto no-scrollbar flex flex-col gap-3 z-10">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2"
            >
              <img src={comment.avatar} className="w-6 h-6 rounded-full" />
              <div className="glass-dark px-3 py-1.5 rounded-2xl">
                 <p className="text-[10px] font-bold text-secondary mb-0.5">{comment.user}</p>
                 <p className="text-[11px] text-white/90">{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interaction Buttons */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-4 z-10">
        <div className="flex flex-col items-center gap-1">
           <button className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent shadow-[0_0_15px_rgba(255,0,229,0.3)]">
             <Heart size={24} className="fill-accent" />
           </button>
           <span className="text-[10px] font-bold">1.2K</span>
        </div>
        <button className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary">
           <Gift size={24} />
        </button>
        <button className="w-12 h-12 rounded-full glass flex items-center justify-center text-secondary">
           <Share size={24} />
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 z-10">
         <div className="flex-1 glass p-1.5 rounded-full flex items-center px-4">
            <MessageSquare size={16} className="text-white/40 mr-2" />
            <input 
              type="text" 
              placeholder="Add comment..." 
              className="bg-transparent border-none outline-none text-[11px] text-white w-full"
            />
         </div>
         <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
            <Send size={18} />
         </button>
      </div>
    </div>
  );
};

// Internal missing component for the mock
const Share = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

export default LiveStream;
