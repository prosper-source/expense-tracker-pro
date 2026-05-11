import React from 'react';
import { 
  LayoutDashboard, Users, FileVideo, AlertCircle, 
  BarChart3, Settings, LogOut, ChevronLeft, 
  Search, Bell, MoreVertical, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <Users size={20} />, label: 'User Management' },
    { icon: <FileVideo size={20} />, label: 'Content Moderation' },
    { icon: <AlertCircle size={20} />, label: 'Reports' },
    { icon: <BarChart3 size={20} />, label: 'Analytics' },
    { icon: <Settings size={20} />, label: 'System Settings' },
  ];

  const stats = [
    { label: 'Total Users', value: '2.5M', change: '+12.5%', up: true },
    { label: 'Daily Videos', value: '18.6M', change: '+8.2%', up: true },
    { label: 'Live Streams', value: '8,456', change: '-15.3%', up: false },
    { label: 'Total Revenue', value: '$125.8K', change: '+10.1%', up: true },
  ];

  return (
    <div className="h-full w-full bg-[#050505] flex text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-[#0A0A0A] flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
             <span className="font-black text-xs">N</span>
           </div>
           <h1 className="text-xl font-black tracking-tighter">NEXA <span className="text-[10px] text-primary">ADMIN</span></h1>
        </div>

        <div className="flex-1 space-y-2">
           {sidebarItems.map((item, idx) => (
             <button 
               key={idx} 
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${item.active ? 'bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(189,0,255,0.1)]' : 'text-white/40 hover:text-white/60'}`}
             >
                {item.icon}
                {item.label}
             </button>
           ))}
        </div>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/40 hover:text-white">
            <ChevronLeft size={20} />
            Back to App
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500/60 hover:text-red-500">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
         {/* Top Header */}
         <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#0A0A0A]">
            <div className="flex items-center glass px-4 py-2 rounded-xl w-96">
               <Search size={18} className="text-white/40 mr-3" />
               <input type="text" placeholder="Search analytics, users..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
            <div className="flex items-center gap-6">
               <button className="relative p-2 glass rounded-full">
                  <Bell size={20} className="text-white/60" />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
               </button>
               <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-xl" />
                  <div>
                    <p className="text-xs font-bold">Admin User</p>
                    <p className="text-[10px] text-white/40">Super Admin</p>
                  </div>
               </div>
            </div>
         </header>

         {/* Dashboard Content */}
         <main className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-3xl font-black mb-1">Dashboard Overview</h2>
                  <p className="text-sm text-white/40">Real-time statistics and insights.</p>
               </div>
               <button className="px-6 py-2.5 bg-primary rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(189,0,255,0.4)]">Download Report</button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
               {stats.map((stat, idx) => (
                 <div key={idx} className="glass p-6 rounded-[24px] border border-white/5 hover:border-primary/20 transition-all group">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">{stat.label}</p>
                    <div className="flex items-end justify-between">
                       <h3 className="text-3xl font-black">{stat.value}</h3>
                       <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {stat.change}
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
               {/* Activity Chart Mock */}
               <div className="col-span-2 glass p-8 rounded-[32px] border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="font-bold">Growth Analytics</h3>
                     <div className="flex gap-2">
                        <button className="px-3 py-1 glass rounded-lg text-[10px] font-bold">DAILY</button>
                        <button className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-lg text-[10px] font-bold">WEEKLY</button>
                        <button className="px-3 py-1 glass rounded-lg text-[10px] font-bold">MONTHLY</button>
                     </div>
                  </div>
                  <div className="h-64 flex items-end gap-4 px-2">
                     {[20, 35, 25, 45, 60, 40, 85, 55, 75, 90, 65, 80].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-primary/5 to-primary/40 rounded-t-lg group relative">
                           <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" style={{ height: `${h}%` }} />
                           <div className="w-full bg-white/5 absolute bottom-0 transition-all duration-1000" style={{ height: `${h}%` }} />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Recent Reports */}
               <div className="glass p-8 rounded-[32px] border border-white/5">
                  <h3 className="font-bold mb-6">Recent Reports</h3>
                  <div className="space-y-6">
                     {[
                       { user: 'user_123', reason: 'Inappropriate content', status: 'Pending', color: 'text-yellow-500' },
                       { user: 'alpha_456', reason: 'Spam or misleading', status: 'Pending', color: 'text-yellow-500' },
                       { user: 'dev_789', reason: 'Hate speech', status: 'Reviewed', color: 'text-green-500' },
                     ].map((report, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                 <AlertCircle size={18} className="text-red-500" />
                              </div>
                              <div>
                                 <p className="text-xs font-bold">{report.reason}</p>
                                 <p className="text-[10px] text-white/40">Reported by @{report.user}</p>
                              </div>
                           </div>
                           <span className={`text-[10px] font-bold ${report.color}`}>{report.status}</span>
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">View All Reports</button>
               </div>
            </div>

            {/* User Management Table Snippet */}
            <div className="glass rounded-[32px] border border-white/5 overflow-hidden">
               <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-bold">Top Content Creators</h3>
                  <button className="text-xs text-primary font-bold uppercase">See all creators</button>
               </div>
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5">
                        <th className="px-8 py-4">Creator</th>
                        <th className="px-8 py-4">Total Views</th>
                        <th className="px-8 py-4">Engagement</th>
                        <th className="px-8 py-4">Revenue</th>
                        <th className="px-8 py-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {[
                       { name: 'Neon Pulse', handle: '@neon_pulse', views: '45.2M', engagement: '8.4%', rev: '$12,450', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100' },
                       { name: 'Nexaa AI', handle: '@its_nexaa', views: '32.6M', engagement: '12.1%', rev: '$8,200', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
                     ].map((creator, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                           <td className="px-8 py-4">
                              <div className="flex items-center gap-3">
                                 <img src={creator.img} className="w-8 h-8 rounded-lg" />
                                 <div>
                                    <p className="text-xs font-bold">{creator.name}</p>
                                    <p className="text-[10px] text-white/40">{creator.handle}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-4 text-xs font-medium">{creator.views}</td>
                           <td className="px-8 py-4 text-xs font-medium text-secondary">{creator.engagement}</td>
                           <td className="px-8 py-4 text-xs font-medium text-green-500">{creator.rev}</td>
                           <td className="px-8 py-4 text-right">
                              <button className="p-2 hover:bg-white/10 rounded-lg"><MoreVertical size={16} /></button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
