import React from 'react';
import { ChevronLeft, User, Lock, Shield, Bell, Globe, Moon, HelpCircle, Info, LogOut, ChevronRight, LayoutDashboard } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onOpenAdmin, onLogout }) => {
  const sections = [
    {
      title: 'Account',
      items: [
        { icon: <User size={20} />, label: 'Profile Information' },
        { icon: <Lock size={20} />, label: 'Privacy' },
        { icon: <Shield size={20} />, label: 'Security' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: <Bell size={20} />, label: 'Notifications' },
        { icon: <Globe size={20} />, label: 'Language', extra: 'English' },
        { icon: <Moon size={20} />, label: 'Dark Mode', toggle: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpCircle size={20} />, label: 'Help & Support' },
        { icon: <Info size={20} />, label: 'About Nexa' },
      ]
    }
  ];

  return (
    <div className="h-full w-full bg-background flex flex-col pt-12 overflow-y-auto no-scrollbar">
      <div className="px-6 mb-8 flex items-center gap-4">
        <button onClick={onBack} className="p-2 glass rounded-full">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-black">Settings</h2>
      </div>

      <div className="px-6 pb-32">
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 px-2">{section.title}</h3>
              <div className="glass rounded-3xl overflow-hidden divide-y divide-white/5">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="text-white/60">{item.icon}</div>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       {item.extra && <span className="text-xs text-white/40">{item.extra}</span>}
                       {item.toggle ? (
                         <div className="w-10 h-5 bg-primary rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                         </div>
                       ) : (
                         <ChevronRight size={16} className="text-white/20" />
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Special Admin Entry */}
          <div>
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 px-2">Development</h3>
            <button 
              onClick={onOpenAdmin}
              className="w-full flex items-center justify-between p-4 glass rounded-3xl border border-primary/20 hover:bg-primary/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-primary"><LayoutDashboard size={20} /></div>
                <span className="text-sm font-bold text-primary">Admin Panel (Web)</span>
              </div>
              <ChevronRight size={16} className="text-primary/40" />
            </button>
          </div>

          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-3xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 active:scale-[0.98] transition-all"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
