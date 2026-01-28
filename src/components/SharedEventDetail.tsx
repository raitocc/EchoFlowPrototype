import { ArrowLeft, Settings, Sparkles, Link2, Camera, Mic, Keyboard, History } from 'lucide-react';

interface SharedEventDetailProps {
    onBack: () => void;
}

// --- MOCK DATA ---
const HEADER_DATA = {
    title: '大理古城火锅局',
    total: 480,
    perPerson: 120,
    cover: 'https://images.unsplash.com/photo-1614104030967-5ca61a54247b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    members: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80'
    ]
};

const MESSAGES = [
    {
        id: '1',
        user: { name: 'Lisa', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
        type: 'photo',
        isMe: false,
        content: {
            image: 'https://images.unsplash.com/photo-1614104030967-5ca61a54247b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    },
    {
        id: '2',
        user: { name: 'Mike', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80' },
        type: 'receipt',
        isMe: false,
        content: {
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            aiSummary: '支出 ¥420.00 (餐饮)',
            verified: true
        }
    },
    {
        id: '3',
        user: { name: 'Me', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' },
        type: 'voice',
        isMe: true,
        content: {
            transcript: '这牛肉也太嫩了吧... 明天必须还来！😋',
            duration: '12"'
        },
        isSynced: true
    }
];

export default function SharedEventDetail({ onBack }: SharedEventDetailProps) {
    return (
        <div className="absolute inset-0 z-[80] flex flex-col bg-slate-50 animate-in slide-in-from-right duration-300">

            {/* 1. Immersive Header */}
            <div className="relative w-full h-48 shrink-0 overflow-hidden">
                {/* Background Blur */}
                <div className="absolute inset-0">
                    <img src={HEADER_DATA.cover} className="w-full h-full object-cover" alt="bg" />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col pt-10 px-6">
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={onBack} className="p-2 -ml-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-lg font-bold text-white tracking-wide shadow-sm">{HEADER_DATA.title}</h1>
                        <div className="flex items-center gap-3">
                            {/* Avatar Group (Small) */}
                            <div className="flex -space-x-2">
                                {HEADER_DATA.members.slice(0, 3).map((m, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full border border-white/50 overflow-hidden">
                                        <img src={m} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <button className="text-white/80 hover:text-white"><Settings size={20} /></button>
                        </div>
                    </div>

                    {/* AI Expense Board */}
                    <div className="mx-auto flex items-center gap-4 px-5 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 shadow-lg text-white">
                        <div className="flex flex-col items-center border-r border-white/20 pr-4">
                            <span className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Total</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xl font-bold">¥{HEADER_DATA.total}</span>
                                <Sparkles size={14} className="text-yellow-300 animate-pulse" fill="currentColor" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center pl-1">
                            <span className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Per Person</span>
                            <span className="text-sm font-bold">¥{HEADER_DATA.perPerson}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Memory Stream */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar pb-32 bg-slate-100">
                {MESSAGES.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        {!msg.isMe && (
                            <img src={msg.user.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover shrink-0 mt-auto" />
                        )}

                        {/* Card Content */}
                        <div className={`relative max-w-[75%] rounded-2xl shadow-sm overflow-hidden border border-slate-200/50 group transition-transform ${msg.isMe ? 'bg-indigo-50 rounded-br-none' : 'bg-white rounded-bl-none'}`}>

                            {/* Type A: Photo */}
                            {msg.type === 'photo' && msg.content.image && (
                                <img src={msg.content.image} className="w-full h-auto object-cover" alt="memory" />
                            )}

                            {/* Type B: Receipt */}
                            {msg.type === 'receipt' && msg.content.image && (
                                <div className="flex flex-col">
                                    <img src={msg.content.image} className="w-full h-32 object-cover opacity-80" alt="receipt" />
                                    <div className="px-3 py-2 bg-white flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <Sparkles size={10} fill="currentColor" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-700">{msg.content.aiSummary}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Type C: Voice */}
                            {msg.type === 'voice' && (
                                <div className="px-4 py-3 min-w-[200px]">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isMe ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            <Mic size={16} fill="currentColor" />
                                        </div>
                                        {/* Fake Waveform */}
                                        <div className="flex items-center gap-1 h-4">
                                            {[2, 5, 3, 6, 4, 7, 3, 5, 2].map((h, i) => (
                                                <div key={i} className={`w-1 rounded-full ${msg.isMe ? 'bg-indigo-500' : 'bg-slate-400'}`} style={{ height: `${h * 4}px` }} />
                                            ))}
                                        </div>
                                        <span className={`text-xs font-bold ${msg.isMe ? 'text-indigo-600' : 'text-slate-500'}`}>{msg.content.duration}</span>
                                    </div>
                                    <p className={`text-sm font-medium leading-relaxed ${msg.isMe ? 'text-indigo-900' : 'text-slate-800'}`}>
                                        "{msg.content.transcript}"
                                    </p>
                                </div>
                            )}

                            {/* Twin Asset Icon (Synced) */}
                            {msg.isSynced && (
                                <div className="absolute bottom-1 right-1 p-1">
                                    <Link2 size={12} className="text-indigo-400 opacity-60" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-8 flex items-center justify-between z-20">
                {/* Left: Keyboard input */}
                <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-indigo-500 transition-colors active:scale-95">
                    <Keyboard size={24} />
                </button>

                {/* Center: Sync-Shot */}
                <button className="w-20 h-20 -mt-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_10px_30px_rgba(99,102,241,0.4)] border-4 border-slate-50 flex items-normal justify-center overflow-hidden group active:scale-95 transition-transform">
                    <div className="w-full h-full flex items-center justify-center relative">
                        <Camera size={32} className="text-white absolute transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0" />
                        <div className="flex flex-col items-center gap-1 absolute translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <Mic size={24} className="text-white" />
                            <span className="text-[9px] text-white font-bold uppercase tracking-wider">Rec</span>
                        </div>
                    </div>
                </button>

                {/* Right: Import History */}
                <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-indigo-500 transition-colors active:scale-95">
                    <History size={24} />
                </button>
            </div>

        </div>
    );
}
