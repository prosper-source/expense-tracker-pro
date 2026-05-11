import React, { useState } from 'react';
import { X, Music, MapPin, Users, ChevronRight, Wand2, Scissors, Type, LayoutTemplate, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreatePostProps {
  onCancel: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCancel }) => {
  const [step, setStep] = useState<'upload' | 'edit' | 'post'>('upload');
  const [timelinePos, setTimelinePos] = useState(33);

  const renderUpload = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center justify-between">
        <button onClick={onCancel} className="p-2 glass rounded-full">
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold">New Post</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center">
        <div className="aspect-[9/16] w-full rounded-[40px] border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center gap-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary mb-2">
            <LayoutTemplate size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">Upload Video</p>
            <p className="text-sm text-white/40">Drag and drop or click to select</p>
          </div>
          <button 
            onClick={() => setStep('edit')}
            className="mt-6 px-8 py-3 rounded-full bg-white text-black font-bold text-sm active:scale-95 transition-transform"
          >
            Select from Gallery
          </button>
        </div>
      </div>

      <div className="p-8 grid grid-cols-4 gap-4">
        {[
          { icon: <Wand2 />, label: 'Effects' },
          { icon: <Type />, label: 'Text' },
          { icon: <Music />, label: 'Sounds' },
          { icon: <LayoutTemplate />, label: 'Templates' },
        ].map((tool, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/60">
              {tool.icon}
            </div>
            <span className="text-[10px] font-medium text-white/40">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEdit = () => (
    <div className="flex flex-col h-full bg-black">
      <div className="relative flex-1 bg-surface-light flex items-center justify-center">
         <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
            <button onClick={() => setStep('upload')} className="p-2 glass rounded-full text-white">
              <X size={20} />
            </button>
            <div className="flex gap-2">
              <span className="px-3 py-1 glass rounded-full text-xs font-bold">1080P</span>
              <button 
                onClick={() => setStep('post')}
                className="px-4 py-1 bg-primary rounded-full text-xs font-bold"
              >
                Export
              </button>
            </div>
         </div>

         {/* Mock Video Preview */}
         <div className="h-[70%] aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl relative flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" 
              alt="preview" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
         </div>

         {/* Editor Timeline UI */}
         <div className="absolute bottom-0 left-0 right-0 h-48 bg-background/80 backdrop-blur-xl border-t border-white/10 px-6 py-4">
            <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-bold text-white/40">00:12 / 00:30</span>
               <div className="flex gap-4">
                 <button className="text-white/60"><Scissors size={18} /></button>
                 <button className="text-white/60"><Sliders size={18} /></button>
               </div>
            </div>
            <div 
              className="relative h-16 bg-white/5 rounded-xl border border-white/5 overflow-hidden flex items-center cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setTimelinePos((x / rect.width) * 100);
              }}
            >
               <div className="flex gap-1 h-12 px-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-8 h-full bg-primary/20 rounded-md border border-primary/30" />
                  ))}
               </div>
               <motion.div 
                 animate={{ left: `${timelinePos}%` }}
                 className="absolute top-0 bottom-0 w-1 bg-secondary shadow-[0_0_10px_#00D1FF] z-10" 
               />
               <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />
            </div>
            <div className="flex justify-between mt-4">
              <button className="flex flex-col items-center gap-1 opacity-60">
                <Scissors size={20} />
                <span className="text-[8px]">Trim</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <Wand2 size={20} className="text-primary" />
                <span className="text-[8px]">Effects</span>
              </button>
              <button className="flex flex-col items-center gap-1 opacity-60">
                <Type size={20} />
                <span className="text-[8px]">Text</span>
              </button>
              <button className="flex flex-col items-center gap-1 opacity-60">
                <Music size={20} />
                <span className="text-[8px]">Audio</span>
              </button>
            </div>
         </div>
      </div>
    </div>
  );

  const renderPost = () => (
    <div className="flex flex-col h-full bg-background pt-12">
      <div className="px-6 flex items-center justify-between mb-8">
        <button onClick={() => setStep('edit')} className="p-2 glass rounded-full">
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold">Post Details</h2>
        <div className="w-10" />
      </div>

      <div className="px-6 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex gap-4 mb-8">
          <div className="w-24 h-32 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden shrink-0">
             <img 
               src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" 
               alt="thumbnail" 
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-1 right-1 text-[8px] glass px-1 rounded">0:30</div>
          </div>
          <textarea 
            placeholder="Add a caption..."
            className="flex-1 bg-transparent border-none outline-none resize-none text-sm pt-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 glass rounded-2xl">
            <div className="flex items-center gap-3">
              <Music className="text-secondary" size={20} />
              <span className="text-sm font-semibold">Add Sound</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <span className="text-xs">Select sound</span>
              <ChevronRight size={16} />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 glass rounded-2xl">
            <div className="flex items-center gap-3">
              <MapPin className="text-secondary" size={20} />
              <span className="text-sm font-semibold">Location</span>
            </div>
            <ChevronRight className="text-white/40" size={16} />
          </div>

          <div className="flex items-center justify-between p-4 glass rounded-2xl">
            <div className="flex items-center gap-3">
              <Users className="text-secondary" size={20} />
              <span className="text-sm font-semibold">Tag People</span>
            </div>
            <ChevronRight className="text-white/40" size={16} />
          </div>

          <div className="mt-8 flex gap-2">
            <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">#cyberpunk</div>
            <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">#nexa</div>
            <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">#future</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <button 
          onClick={onCancel}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent font-black text-lg shadow-[0_0_20px_rgba(189,0,255,0.4)] active:scale-[0.98] transition-all"
        >
          Post Video
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="h-full w-full"
        >
          {step === 'upload' && renderUpload()}
          {step === 'edit' && renderEdit()}
          {step === 'post' && renderPost()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CreatePost;
