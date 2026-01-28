import { X, MoreHorizontal, DollarSign, Smile, Music } from 'lucide-react';
import { type MemoryItem } from './MemoryCard';
import { useState } from 'react';

interface MemoryDetailProps {
    mode: 'confirm' | 'view';
    data: MemoryItem;
    onClose: () => void;
    onSave?: (newData: MemoryItem) => void;
}

export default function MemoryDetail({ mode, data, onClose }: MemoryDetailProps) {
    const isConfirmMode = mode === 'confirm';
    const displayTitle = isConfirmMode ? '新建回响' : data.time;

    // Local state for editing (mocking functionality)
    const [content, setContent] = useState(data.content || '');
    const [amount] = useState(data.amount || '');
    const [mood, setMood] = useState(data.mood || 'neutral');

    const hasImage = data.type === 'visual' && data.imageUrl;

    return (
        <div className="flex flex-col h-full bg-canvas relative overscroll-none">

            {/* 1. Navbar */}
            <div className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6 pt-12 transition-colors ${hasImage ? 'text-white' : 'text-text-main'}`}>
                <button
                    onClick={onClose}
                    className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform ${hasImage ? 'bg-black/10 text-white' : 'bg-slate-100 text-text-main'}`}
                >
                    <X size={20} strokeWidth={2.5} />
                </button>

                <h2 className={`text-base font-bold tracking-wide ${hasImage ? 'text-white drop-shadow-md' : 'text-text-main'}`}>
                    {displayTitle}
                </h2>

                <button className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform ${hasImage ? 'bg-black/10 text-white' : 'bg-slate-100 text-text-main'}`}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* 2. Hero Media */}
            <div className={`w-full shrink-0 relative transition-all duration-300 ${hasImage ? 'h-[35vh] bg-slate-900' : 'h-[25vh] bg-primary-bg/50'}`}>
                {hasImage ? (
                    <div className="w-full h-full relative">
                        <img src={data.imageUrl} className="w-full h-full object-cover" alt="Hero" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                ) : (
                    // Audio/Text abstract hero (Lighter & Smaller)
                    <div className="w-full h-full flex items-center justify-center pt-10">
                        <div className="w-24 h-24 rounded-full bg-white/80 border border-white/50 shadow-inner flex items-center justify-center">
                            <Music size={40} className="text-primary/60" />
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Content Card (Sheet) */}
            <div className="flex-1 bg-surface -mt-8 rounded-t-[2rem] relative z-10 flex flex-col shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Decorative Drag Handle */}
                <div className="w-full h-6 flex justify-center items-center shrink-0">
                    <div className="w-12 h-1 bg-slate-200 rounded-full" />
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-32 pt-2 no-scrollbar">

                    {/* Text Editor Area */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-transparent text-xl text-text-main font-medium leading-relaxed resize-none outline-none min-h-[120px] placeholder:text-slate-300"
                        placeholder="记录下当下的回响..."
                    />

                    {/* 4. AI Magic Section */}
                    <div className="mt-8 space-y-4">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">AI 洞察</h3>

                        {/* Expense Card */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group active:scale-[0.99] transition-transform">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shadow-sm">
                                    <DollarSign size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-text-muted font-medium">消费金额</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold text-text-main">{amount || '0.00'}</span>
                                        {data.expenseCategory && <span className="text-xs text-rose-500 bg-rose-50 px-1.5 rounded ml-1">{data.expenseCategory}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mood Card */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                                    <Smile size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-text-muted font-medium">此刻心情</span>
                                    <span className="text-sm font-bold text-text-main capitalize">
                                        {mood === 'happy' && '开心'}
                                        {mood === 'chill' && '惬意'}
                                        {mood === 'neutral' && '平静'}
                                        {mood === 'sad' && '低落'}
                                        {mood === 'excited' && '兴奋'}
                                        {!mood && '未记录'}
                                    </span>
                                </div>
                            </div>
                            {/* Mood Selector (Simplified) */}
                            <div className="flex justify-between px-2 pt-1">
                                {['happy', 'chill', 'neutral', 'sad'].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setMood(m as any)}
                                        className={`text-2xl p-2 rounded-full transition-all hover:bg-white active:scale-90 ${mood === m ? 'bg-white shadow-md scale-110' : 'opacity-40 grayscale'}`}
                                    >
                                        {m === 'happy' && '😆'}
                                        {m === 'chill' && '☕'}
                                        {m === 'neutral' && '😐'}
                                        {m === 'sad' && '😔'}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* 5. Footer (Fixed) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)] to-transparent z-20 pb-10">
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-bold text-lg shadow-[0_10px_30px_-5px_rgba(99,102,241,0.4)] active:scale-[0.98] transition-all">
                    {isConfirmMode ? '保存回响' : '更新记录'}
                </button>
            </div>

        </div>
    );
}
