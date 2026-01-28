import { ArrowLeft, Settings, Flame, Wallet, MapPin, Plus, Clock, Camera } from 'lucide-react';

interface SpaceDetailProps {
    onBack: () => void;
    onOpenEvent: (eventId: string) => void;
}

// --- MOCK DATA ---
const SPACE_INFO = {
    title: '404 宿舍',
    subtitle: '已建立 856 天 | 共同经历 124 个瞬间',
    cover: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Dorm/Room vibe
    members: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80'
    ]
};

const STATS = [
    { icon: Flame, label: '热衷', value: '熬夜 / 火锅', color: 'text-rose-500', bg: 'bg-rose-50' },
    { icon: Wallet, label: '共消费', value: '¥12,450', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: MapPin, label: '足迹', value: '武汉 / 大理', color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

const TIMELINE_EVENTS = [
    {
        id: 'e1',
        title: '🔥 大理古城火锅局',
        time: '2 小时前',
        status: 'Live',
        cover: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: '4人参与 · 支出 ¥480',
        type: 'event'
    },
    {
        id: 'e2',
        title: '期末通宵复习',
        time: '2025年 12月 20日',
        status: 'Archived',
        images: [
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ],
        summary: '图书馆 · 32张照片',
        type: 'gallery'
    },
    {
        id: 'e3',
        title: '老三生日快乐 🎂',
        time: '2025年 11月 12日',
        status: 'Archived',
        cover: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'KTV · 支出 ¥2,100',
        type: 'milestone'
    }
];

export default function SpaceDetail({ onBack, onOpenEvent }: SpaceDetailProps) {
    return (
        <div className="absolute inset-0 z-[65] flex flex-col bg-slate-50 overscroll-none animate-in slide-in-from-right duration-300">

            {/* 1. Header Hero */}
            <div className="relative w-full h-64 shrink-0">
                <img src={SPACE_INFO.cover} className="w-full h-full object-cover brightness-[0.8]" alt="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                {/* Navbar */}
                <div className="absolute top-0 left-0 right-0 p-6 pt-10 flex items-center justify-between z-10">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <button className="p-2 -mr-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
                        <Settings size={22} />
                    </button>
                </div>

                {/* Space Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1 shadow-sm">{SPACE_INFO.title}</h1>
                        <p className="text-xs text-white/80 font-medium tracking-wide">{SPACE_INFO.subtitle}</p>
                    </div>
                    {/* Avatar Group */}
                    <div className="flex -space-x-3">
                        {SPACE_INFO.members.map((m, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-200 overflow-hidden">
                                <img src={m} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Change Cover Fab */}
                <button className="absolute bottom-4 right-4 translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 border border-slate-100">
                    <Camera size={18} />
                </button>
            </div>

            {/* 2. Content Body */}
            <div className="flex-1 overflow-y-auto pt-8 pb-32 no-scrollbar">

                {/* Relationship DNA */}
                <div className="px-6 mb-8">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">AI 关系洞察</h3>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {STATS.map((s, i) => (
                            <div key={i} className={`flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl shrink-0 ${s.bg}`}>
                                <s.icon size={16} className={s.color} />
                                <div className="flex flex-col">
                                    <span className={`text-[10px] font-bold ${s.color} opacity-80`}>{s.label}</span>
                                    <span className={`text-xs font-bold ${s.color}`}>{s.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="px-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">时光长廊</h3>
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pl-8 pb-10">

                        {TIMELINE_EVENTS.map((event) => (
                            <div key={event.id} className="relative group">
                                {/* Dot */}
                                <div className={`absolute -left-[39px] top-6 w-5 h-5 rounded-full border-4 border-slate-50 ${event.status === 'Live' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`} />

                                {/* Date Label */}
                                <span className="absolute -top-6 left-0 text-[10px] font-bold text-slate-400">{event.time}</span>

                                {/* Card */}
                                <div
                                    onClick={() => event.status === 'Live' ? onOpenEvent(event.id) : null}
                                    className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden active:scale-95 transition-transform ${event.type === 'milestone' ? 'ring-2 ring-amber-100' : ''}`}
                                >

                                    {/* Type A: Single Event (Live) */}
                                    {event.type === 'event' && (
                                        <>
                                            <div className="h-32 bg-slate-100 relative">
                                                <img src={event.cover} className="w-full h-full object-cover" />
                                                {event.status === 'Live' && (
                                                    <div className="absolute top-3 right-3 px-2 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg shadow-lg flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                        LIVE
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-bold text-text-main text-base">{event.title}</h4>
                                                <p className="text-xs text-text-muted mt-1">{event.summary}</p>
                                            </div>
                                        </>
                                    )}

                                    {/* Type B: Gallery Stack */}
                                    {event.type === 'gallery' && event.images && (
                                        <div className="p-3">
                                            <h4 className="font-bold text-text-main text-base mb-3">{event.title}</h4>
                                            <div className="grid grid-cols-3 gap-1 h-20 rounded-xl overflow-hidden mb-2">
                                                {event.images.map((img, i) => (
                                                    <img key={i} src={img} className="w-full h-full object-cover" />
                                                ))}
                                            </div>
                                            <p className="text-xs text-text-muted">{event.summary}</p>
                                        </div>
                                    )}

                                    {/* Type C: Milestone */}
                                    {event.type === 'milestone' && (
                                        <div className="relative h-40">
                                            <img src={event.cover} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                                <h4 className="font-bold text-white text-lg">{event.title}</h4>
                                                <p className="text-xs text-white/80">{event.summary}</p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>

            {/* FAB */}
            <button className="absolute bottom-8 right-6 w-14 h-14 rounded-full bg-slate-900 shadow-xl flex items-center justify-center text-white active:scale-95 transition-transform z-20">
                <Plus size={28} />
            </button>

        </div>
    );
}
