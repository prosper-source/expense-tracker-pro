import React from 'react';
import { ChevronLeft, ArrowUpRight, ArrowDownLeft, Wallet, PieChart } from 'lucide-react';

interface WalletScreenProps {
  onBack: () => void;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ onBack }) => {
  return (
    <div className="h-full w-full bg-background flex flex-col pt-12">
      <div className="px-6 mb-8 flex items-center gap-4">
        <button onClick={onBack} className="p-2 glass rounded-full">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-black">Wallet</h2>
      </div>

      <div className="px-6 space-y-6 flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Main Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-primary via-secondary to-accent rounded-[32px] blur-sm opacity-50" />
          <div className="relative glass-dark p-8 rounded-[32px] overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet size={120} />
             </div>
             <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Total Balance</p>
             <div className="flex items-end gap-2 mb-8">
               <h1 className="text-4xl font-black">12,550</h1>
               <span className="text-secondary text-sm font-bold mb-1">COINS</span>
             </div>
             <div className="flex gap-4">
                <button className="flex-1 py-3 bg-white text-black rounded-2xl font-black text-sm">Top Up</button>
                <button className="flex-1 py-3 glass rounded-2xl font-black text-sm">Withdraw</button>
             </div>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="glass p-6 rounded-3xl border border-white/5">
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <PieChart size={18} className="text-primary" />
                 <span className="text-sm font-bold">Earnings Dashboard</span>
              </div>
              <button className="text-[10px] font-bold text-secondary">VIEW ANALYTICS</button>
           </div>
           
           <div className="flex justify-between items-end gap-4 h-32 mb-6 px-2">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                   <div 
                     className="w-full rounded-t-lg bg-gradient-to-t from-primary/20 to-primary/80" 
                     style={{ height: `${h}%` }} 
                   />
                   <span className="text-[8px] text-white/40">M</span>
                </div>
              ))}
           </div>

           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                 <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Monthly</p>
                 <p className="text-lg font-black">$3,245.50</p>
                 <span className="text-[10px] text-green-500 font-bold">+12.5%</span>
              </div>
              <div>
                 <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Subscriptions</p>
                 <p className="text-lg font-black">$1,020.00</p>
                 <span className="text-[10px] text-green-500 font-bold">+5.2%</span>
              </div>
           </div>
        </div>

        {/* Recent Transactions */}
        <div>
           <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4 px-2">Recent Activity</h3>
           <div className="space-y-3">
              {[
                { label: 'Live Gifts', val: '+1,234.50', icon: <ArrowDownLeft className="text-green-500" /> },
                { label: 'Subscriptions', val: '+980.00', icon: <ArrowDownLeft className="text-green-500" /> },
                { label: 'Creator Fund', val: '+1,031.00', icon: <ArrowDownLeft className="text-green-500" /> },
                { label: 'Withdrawal', val: '-500.00', icon: <ArrowUpRight className="text-red-500" /> },
              ].map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 glass rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                         {t.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{t.label}</p>
                        <p className="text-[10px] text-white/40">Today, 12:45 PM</p>
                      </div>
                   </div>
                   <span className={`text-sm font-black ${t.val.startsWith('+') ? 'text-green-500' : 'text-white'}`}>{t.val}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default WalletScreen;
