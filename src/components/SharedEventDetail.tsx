import { ArrowLeft, RefreshCw, Activity, Upload } from 'lucide-react';
import { useState } from 'react';
import SharedMemoryCard, { SharedItem } from './SharedMemoryCard';
import PrivacyModal from './PrivacyModal';

interface SharedEventDetailProps {
    onBack: () => void;
}

// Mock Shared Data (Preserved from old view)
const SHARED_DATA: SharedItem[] = [
    {
        id: 's1',
        user: { name: 'Lisa', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', isMe: false },
        type: 'video',
        content: '锅底开啦！！快来下肉！🔥🔥',
        mediaUrl: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&w=600&q=80', // Hotpot Image simulating video
        timestamp: '18:45'
    },
    {
        id: 's2',
        user: { name: 'Me', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', isMe: true },
        type: 'photo',
        content: '终于吃到心心念念的火锅啦！大家周末愉快 😋',
        mediaUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        amount: '参与 AA',
        timestamp: '19:10'
    },
    {
        id: 's3',
        user: { name: 'System', avatar: '', isMe: false },
        type: 'system',
        content: 'Mike 支付了饮料费 ¥60.00，AA 账单已更新',
        timestamp: '19:30'
    },
    {
        id: 's4',
        user: { name: 'Mike', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80', isMe: false },
        type: 'photo',
        content: '吃饱喝足，这家的冰粉也很绝！',
        mediaUrl: 'https://images.unsplash.com/photo-1563583769065-c7911727e0f1?auto=format&fit=crop&w=600&q=80',
        timestamp: '20:05'
    }
];

export default function SharedEventDetail({ onBack }: SharedEventDetailProps) {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    return (
        <div className="absolute inset-0 z-[70] bg-slate-50 flex flex-col animate-in slide-in-from-right duration-300">

            {/* Header */}
            <div className="px-6 py-6 pt-8 bg-white/80 backdrop-blur-md border-b border-slate-100 z-10 sticky top-0">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-text-main transition-colors">
                        <ArrowLeft size={24} />
                    </button>

                    {/* Avatar Group */}
                    <div className="flex -space-x-2">
                        {['Lisa', 'Me', 'Mike'].map((u, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                <img src={`https://images.unsplash.com/photo-${[1494790108377, 1535713875002, 1599566150163][i]}?auto=format&fit=crop&w=100&q=80`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-text-muted font-bold">
                            +1
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-text-main">🔥 大学城火锅局</h1>
                    {/* Smart Board */}
                    <div className="inline-flex items-center gap-3 mt-2 px-3 py-1.5 bg-text-main text-white rounded-lg shadow-sm">
                        <span className="text-xs font-medium opacity-80">总支出 ¥482</span>
                        <div className="w-px h-3 bg-white/30" />
                        <span className="text-xs font-bold">人均 ¥120</span>
                    </div>
                </div>
            </div>

            {/* Stream Body */}
            <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                <div className="columns-2 gap-4 space-y-4">
                    {SHARED_DATA.map((item) => (
                        <SharedMemoryCard key={item.id} data={item} />
                    ))}
                </div>
                {/* Bottom Spacer */}
                <div className="h-32" />
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-white via-white/90 to-transparent z-20 flex items-center gap-4">

                {/* Import History */}
                <button className="flex flex-col items-center gap-1 text-text-muted active:scale-90 transition-transform">
                    <div className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center">
                        <Upload size={20} />
                    </div>
                    <span className="text-[10px] font-medium">导入</span>
                </button>

                {/* Core Sync Button */}
                <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="flex-1 h-14 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-full shadow-[0_8px_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 text-white font-bold text-lg active:scale-95 transition-transform"
                >
                    <RefreshCw size={24} className="animate-spin-slow" />
                    Sync Shot
                </button>

                {/* Vibe */}
                <button className="flex flex-col items-center gap-1 text-text-muted active:scale-90 transition-transform">
                    <div className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <span className="text-[10px] font-medium">氛围</span>
                </button>

            </div>

            {/* Modal */}
            <PrivacyModal
                isOpen={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
                onConfirm={() => setShowPrivacyModal(false)}
            />

        </div>
    );
}
