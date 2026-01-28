import { Plus, Sparkles, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import SharedEventDetail from './SharedEventDetail';

interface EchoSpaceViewProps {
    onBack: () => void;
}

// --- Mock Data ---
const MOCK_SPACES = [
    { id: '1', name: '404宿舍', avatar: 'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: '2', name: '家人群', avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: '3', name: '大理小队', avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
];

const MOCK_EVENTS = [
    {
        id: 'e1',
        title: '🔥 大理古城火锅局',
        status: 'Live',
        coverUrl: 'https://images.unsplash.com/photo-1614104030967-5ca61a54247b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: '大理 · 古城',
        time: '进行中',
        participants: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80'
        ],
        spaceId: '3'
    },
    {
        id: 'e2',
        title: '周末开黑夜',
        status: 'Archived',
        coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: '宿舍',
        time: '2天前',
        participants: [
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80'
        ],
        spaceId: '1'
    },
    {
        id: 'e3',
        title: '路边的奇妙偶遇',
        status: 'Archived',
        coverUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: '市中心',
        time: '5天前',
        participants: [
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80'
        ],
        spaceId: undefined // No specific space
    }
];

// --- Sub-Components ---
function SpaceItem({ name, avatar, isNew = false, onClick }: { name?: string, avatar?: string, isNew?: boolean, onClick?: () => void }) {
    if (isNew) {
        return (
            <button className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-active:scale-95 transition-transform bg-white">
                    <Plus size={24} />
                </div>
                <span className="text-xs text-text-muted font-medium">新建空间</span>
            </button>
        );
    }
    return (
        <button onClick={onClick} className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-full p-0.5 border border-slate-100 bg-white shadow-sm overflow-hidden group-active:scale-95 transition-transform">
                <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="text-xs text-text-main font-medium">{name}</span>
        </button>
    );
}

function InsightCard() {
    return (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 mb-6 flex items-center justify-between shadow-sm">
            <div className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-500">
                    <Sparkles size={20} fill="currentColor" className="opacity-80" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-indigo-900 mb-1">发现记忆纠缠</h3>
                    <p className="text-xs text-indigo-700/80 leading-relaxed max-w-[200px]">
                        检测到你与 <strong>王小明</strong>、<strong>李华</strong> 共同经历了 3 个事件，建议归档为共建空间。
                    </p>
                </div>
            </div>
            <button className="px-4 py-2 bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
                Merge
            </button>
        </div>
    );
}

function EventCard({ item, onClick }: { item: typeof MOCK_EVENTS[0], onClick: () => void }) {
    const isLive = item.status === 'Live';
    const spaceName = MOCK_SPACES.find(s => s.id === item.spaceId)?.name;

    return (
        <div onClick={onClick} className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100/50 overflow-hidden active:scale-[0.99] transition-transform relative">
            {/* Space Badge */}
            {spaceName && (
                <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] text-white font-bold border border-white/20">
                    {spaceName}
                </div>
            )}

            {/* Content Container */}
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                    {isLive && (
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                    <h3 className="text-lg font-bold text-text-main leading-tight">{item.title}</h3>
                </div>

                {/* Cover Image */}
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-slate-100 relative">
                    <img src={item.coverUrl} className="w-full h-full object-cover" alt="cover" />
                    {isLive && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
                            LIVE
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {item.participants.map((p, i) => (
                            <img key={i} src={p} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 object-cover" />
                        ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-text-muted">
                        <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{item.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>{item.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EchoSpaceView({ onBack, onOpenDetail, onOpenSpace }: { onBack: () => void, onOpenDetail: () => void, onOpenSpace: () => void }) {
    // Determine whether to show detail or list
    // const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    // If an event is selected, render the detail view (which is the code we salvaged)
    // if (selectedEventId) {
    //    return <SharedEventDetail onBack={() => setSelectedEventId(null)} />;
    // }

    return (
        <div className="absolute inset-0 z-[60] bg-canvas flex flex-col pt-10 pb-24 overflow-hidden animate-in fade-in duration-300">

            {/* Header */}
            <div className="px-6 pb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-text-main tracking-tight">共鸣 Space</h1>
                <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-text-main active:scale-90 transition-transform">
                    <Plus size={20} />
                </button>
            </div>

            {/* Zone A: Space Rail */}
            <div className="w-full overflow-x-auto no-scrollbar pl-6 pr-6 pb-6 pt-2">
                <div className="flex items-start gap-6 min-w-max">
                    <SpaceItem isNew />
                    {MOCK_SPACES.map(space => (
                        <SpaceItem
                            key={space.id}
                            name={space.name}
                            avatar={space.avatar}
                            onClick={() => {
                                if (space.id === '1') onOpenSpace();
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Zone B: Main Feed */}
            <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar space-y-6">

                {/* AI Insight */}
                <InsightCard />

                {/* Events Stream */}
                <div className="space-y-6">
                    {MOCK_EVENTS.map(event => (
                        <EventCard
                            key={event.id}
                            item={event}
                            onClick={() => {
                                // Only the 'Hotpot' event (e1) links to the detailed mockup we have
                                if (event.id === 'e1') onOpenDetail();
                            }}
                        />
                    ))}

                    {/* Spacer for bottom dock */}
                    <div className="h-10 text-center text-xs text-slate-300 font-medium">
                        —— 所有的相遇都有回响 ——
                    </div>
                </div>
            </div>

        </div>
    );
}
