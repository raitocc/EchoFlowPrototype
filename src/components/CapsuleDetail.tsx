import { ArrowLeft, Sparkles, Share2 } from 'lucide-react';
import { CapsuleItem } from './CapsuleCard';

interface CapsuleDetailProps {
    data: CapsuleItem;
    onBack: () => void;
}

export default function CapsuleDetail({ data, onBack }: CapsuleDetailProps) {
    return (
        <div className="absolute inset-0 z-[60] bg-canvas flex flex-col animate-in fade-in zoom-in-95 duration-300">

            {/* Immersive Header (Hero) */}
            <div className="relative h-[45vh] w-full shrink-0">
                <img src={data.coverUrl} className="w-full h-full object-cover" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-canvas" />

                {/* Top Bar */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                    <button onClick={onBack} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/30">
                        <ArrowLeft size={20} />
                    </button>
                    <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/30">
                        <Share2 size={20} />
                    </button>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-block px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full text-[10px] font-bold text-white mb-3 shadow-lg">
                        {data.engineType}
                    </div>
                    <h1 className="text-3xl font-bold text-text-main leading-tight mb-4 drop-shadow-sm">{data.title}</h1>

                    {/* Stats Scroll */}
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                        {data.stats.map((stat, idx) => (
                            <div key={idx} className="flex-shrink-0 bg-white/60 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/50 shadow-sm">
                                <span className="text-xs font-bold text-text-main">{stat.value}</span>
                                <span className="text-[10px] text-text-muted ml-1 opacity-80">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto bg-canvas pb-20 no-scrollbar">
                <div className="px-6 -mt-2 relative z-10">

                    {/* AI Insight Box */}
                    <div className="bg-gradient-to-br from-[var(--color-primary-bg)] to-indigo-50/50 p-5 rounded-2xl border border-[var(--color-primary-light)]/30 mb-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
                            <Sparkles size={16} fill="currentColor" className="animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI Insight · 智能洞察</span>
                        </div>
                        <p className="text-sm text-text-main leading-relaxed font-medium">
                            {data.aiInsight}
                        </p>
                    </div>

                    {/* Masonry / Timeline Fallback */}
                    {/* For prototype, we simulate a masonry layout with columns */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="w-full h-40 bg-slate-200 rounded-xl overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="grid" />
                            </div>
                            <div className="w-full h-56 bg-slate-200 rounded-xl overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="grid" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="w-full h-48 bg-slate-200 rounded-xl overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="grid" />
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-50">
                                <p className="text-xs text-text-muted leading-relaxed">
                                    "那是最好的时光，阳光正好，微风不噪..."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button className="text-xs text-primary font-bold bg-primary/5 px-4 py-2 rounded-full">
                            查看全部 12 个瞬间
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
