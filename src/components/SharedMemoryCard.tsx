import { Play, Link2 } from 'lucide-react';

export interface SharedItem {
    id: string;
    user: { name: string; avatar: string; isMe: boolean };
    type: 'video' | 'photo' | 'system';
    content: string; // The text or AI summary
    mediaUrl?: string; // For photos/videos
    audioUrl?: string; // For voice notes
    amount?: string; // If expense involved
    timestamp: string;
}

interface SharedMemoryCardProps {
    data: SharedItem;
}

export default function SharedMemoryCard({ data }: SharedMemoryCardProps) {
    const isMe = data.user.isMe;

    // System Message Layout
    if (data.type === 'system') {
        return (
            <div className="flex justify-center py-4">
                <div className="bg-slate-200/50 px-4 py-1.5 rounded-full text-[10px] text-text-muted font-medium backdrop-blur-sm">
                    {data.content}
                </div>
            </div>
        );
    }

    return (
        <div className={`
            break-inside-avoid mb-4 rounded-2xl overflow-hidden shadow-sm border border-slate-100/50
            ${isMe ? 'bg-[var(--color-primary-bg)]' : 'bg-white'}
        `}>
            {/* Header: User Info */}
            <div className="flex items-center gap-2 p-3">
                <img src={data.user.avatar} alt={data.user.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-bold text-text-main opacity-80">{data.user.name}</span>
                {isMe && <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-auto font-bold">已同步</span>}
            </div>

            {/* Media Content */}
            {data.mediaUrl && (
                <div className="relative">
                    <img src={data.mediaUrl} alt="Shared" className="w-full h-auto object-cover" />
                    {data.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                                <Play size={16} fill="white" className="text-white translate-x-0.5" />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Content Body */}
            <div className="p-3">
                {/* Audio Waveform Stub if active */}
                {data.audioUrl && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-black/5 rounded-lg">
                        <Play size={12} fill="currentColor" className="text-text-main" />
                        <div className="flex-1 flex items-center gap-0.5 h-3">
                            {/* Mock Waveform */}
                            {[4, 8, 3, 6, 9, 5, 7, 3, 6, 4].map((h, i) => (
                                <div key={i} className="w-0.5 bg-text-main/50 rounded-full" style={{ height: `${h * 10}%` }} />
                            ))}
                        </div>
                        <span className="text-[10px] text-text-muted">12"</span>
                    </div>
                )}

                <p className="text-xs text-text-main leading-relaxed mb-2 font-medium">
                    {data.content}
                </p>

                {/* Footer: Amount & Timestamp */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                    {data.amount && (
                        <span className="text-xs font-bold text-text-main">{data.amount}</span>
                    )}
                    <div className="flex items-center gap-1 ml-auto">
                        <span className="text-[10px] text-text-muted opacity-60">{data.timestamp}</span>
                        {/* Twin Link Icon for Me */}
                        {isMe && <Link2 size={12} className="text-primary opacity-60" />}
                    </div>
                </div>
            </div>
        </div>
    );
}
