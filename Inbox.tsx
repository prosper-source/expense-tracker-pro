import React, { useState } from 'react';
import { Search, Plus, Phone, Video, Info, Send } from 'lucide-react';

const Inbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages');

  const chats = [
    { id: 1, name: 'Anika Sharma', lastMsg: 'shared your video', time: '2m', active: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 2, name: 'Rohit_22', lastMsg: 'commented: Amazing! 🔥', time: '5m', active: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
    { id: 3, name: 'Nexa Team', lastMsg: 'Official updates and news', time: '2h', active: true, avatar: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=100' },
    { id: 4, name: 'Ayan Roy', lastMsg: 'sent a video', time: '15m', active: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
  ];

  const notifications = [
    { id: 1, user: 'Ayan Roy', type: 'gift', content: 'sent you a gift 💎', time: '30m', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
    { id: 2, user: 'Neha Singh', type: 'follow', content: 'started following you', time: '1h', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
    { id: 3, user: 'System', type: 'wallet', content: 'You got 100 coins! 🪙', time: '1h', avatar: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=100' },
  ];

  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const renderChatList = () => (
    <div className="flex flex-col h-full bg-background pt-12">
      <div className="px-6 mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-black">Messages</h2>
        <button className="p-2 glass rounded-full text-secondary">
          <Plus size={24} />
        </button>
      </div>

      <div className="px-6 mb-6">
        <div className="flex glass rounded-xl px-4 py-2">
          <Search className="text-white/40 mr-3" size={18} />
          <input type="text" placeholder="Search messages..." className="bg-transparent border-none outline-none text-white w-full text-sm" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-6 mb-6">
        <button 
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'messages' ? 'bg-primary shadow-[0_0_15px_rgba(189,0,255,0.3)]' : 'glass opacity-60'}`}
        >
          Messages
        </button>
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'notifications' ? 'bg-primary shadow-[0_0_15px_rgba(189,0,255,0.3)]' : 'glass opacity-60'}`}
        >
          Notifications
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24">
        {activeTab === 'messages' ? (
          <div className="space-y-4">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat.id)}
                className="flex items-center gap-4 p-4 glass rounded-3xl active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-2xl object-cover" />
                  {chat.active && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{chat.name}</span>
                    <span className="text-[10px] text-white/40">{chat.time}</span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-1">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center gap-4 p-4 glass rounded-3xl border-l-2 border-primary">
                <img src={notif.avatar} alt="user" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-xs">
                    <span className="font-bold">{notif.user}</span> {notif.content}
                  </p>
                  <span className="text-[10px] text-white/40 mt-1 block">{notif.time} ago</span>
                </div>
                {notif.type === 'follow' && (
                   <button className="px-4 py-1.5 bg-secondary/20 text-secondary border border-secondary/30 rounded-lg text-xs font-bold">Follow</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderChatDetail = (chatId: number) => {
    const chat = chats.find(c => c.id === chatId);
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedChat(null)} className="mr-2">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="relative">
              <img src={chat?.avatar} className="w-10 h-10 rounded-xl object-cover" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{chat?.name}</h3>
              <p className="text-[10px] text-secondary">Active now</p>
            </div>
          </div>
          <div className="flex gap-4 text-white/60">
            <Phone size={20} />
            <Video size={20} />
            <Info size={20} />
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="self-center py-1 px-3 glass rounded-full text-[10px] text-white/40 mb-4">TODAY</div>
          
          <div className="max-w-[80%] glass-dark p-4 rounded-3xl rounded-tl-none self-start">
            <p className="text-sm">Hey! Did you see that new neon filter? It looks sick!</p>
            <span className="text-[8px] text-white/20 mt-2 block">10:42 AM</span>
          </div>

          <div className="max-w-[80%] bg-gradient-to-br from-primary to-accent p-4 rounded-3xl rounded-tr-none self-end">
            <p className="text-sm">Yeah! Nexa's AI is on another level right now. Just posted a video with it.</p>
            <span className="text-[8px] text-white/20 mt-2 block">10:45 AM</span>
          </div>
          
          <div className="max-w-[80%] glass-dark p-4 rounded-3xl rounded-tl-none self-start">
            <p className="text-sm">Just saw it. The glow effects are insane. 🔥</p>
            <span className="text-[8px] text-white/20 mt-2 block">10:46 AM</span>
          </div>
        </div>

        <div className="p-6">
          <div className="glass p-2 rounded-2xl flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40">
               <Plus size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-transparent border-none outline-none text-sm px-2"
            />
            <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(189,0,255,0.5)]">
               <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      {selectedChat ? renderChatDetail(selectedChat) : renderChatList()}
    </div>
  );
};

export default Inbox;
