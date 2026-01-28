import { Lock, Users, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function PrivacyModal({ isOpen, onClose, onConfirm }: PrivacyModalProps) {
    const [privacyMode, setPrivacyMode] = useState<'me' | 'friends'>('friends');

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={onClose} />

            <div className="relative bg-surface rounded-t-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />

                <h3 className="text-xl font-bold text-center mb-6 text-text-main">发布到共享胶囊</h3>

                {/* Twin-Asset Toggle */}
                <div className="bg-slate-100 p-1 rounded-xl flex mb-8">
                    <button
                        onClick={() => setPrivacyMode('me')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${privacyMode === 'me' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:bg-slate-200/50'}`}
                    >
                        <Lock size={16} />
                        我看的样子
                    </button>
                    <button
                        onClick={() => setPrivacyMode('friends')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${privacyMode === 'friends' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:bg-slate-200/50'}`}
                    >
                        <Users size={16} />
                        朋友看的样子
                    </button>
                </div>

                {/* Dynamic Preview */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 relative overflow-hidden">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="preview" />
                        </div>
                        <div className="flex-1">
                            {privacyMode === 'me' ? (
                                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                    <p className="text-sm font-bold text-text-main mb-1">这家的毛肚不太新鲜，下次不来了 😓</p>
                                    <p className="text-xs text-rose-500 font-bold">-¥128.00</p>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                    <div className="flex items-center gap-1 mb-1">
                                        <RefreshCw size={12} className="text-primary" />
                                        <span className="text-[10px] text-primary font-bold uppercase">AI Polished</span>
                                    </div>
                                    <p className="text-sm font-bold text-text-main mb-1">终于吃到心心念念的火锅啦！大家周末愉快 😋</p>
                                    <p className="text-xs text-text-muted font-medium">参与 AA</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={onConfirm}
                    className="w-full py-4 bg-primary text-white rounded-[1.5rem] font-bold text-lg shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                    <RefreshCw size={20} />
                    同步并发布
                </button>
            </div>
        </div>
    );
}
