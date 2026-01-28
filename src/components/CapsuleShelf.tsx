import { X } from 'lucide-react';
import CapsuleCard, { type CapsuleItem } from './CapsuleCard';

interface CapsuleShelfProps {
    capsules: CapsuleItem[];
    onClose: () => void;
    onSelectCapsule: (capsule: CapsuleItem) => void;
}

export default function CapsuleShelf({ capsules, onClose, onSelectCapsule }: CapsuleShelfProps) {
    return (
        <div className="absolute inset-0 z-50 bg-canvas flex flex-col animate-in slide-in-from-bottom-5 duration-300">

            {/* Header */}
            <div className="px-6 py-6 flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">记忆胶囊</h2>
                    <p className="text-sm text-text-muted mt-1">AI 已为你整理 {capsules.length} 个精彩片段</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                    <X size={20} className="text-text-muted" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-20 space-y-6 no-scrollbar">
                {capsules.map(capsule => (
                    <CapsuleCard
                        key={capsule.id}
                        data={capsule}
                        onClick={() => onSelectCapsule(capsule)}
                    />
                ))}

                {/* Exploration Hint */}
                <div className="text-center py-8 text-xs text-text-muted opacity-50">
                    AI 正在挖掘更多回忆...
                </div>
            </div>

        </div>
    );
}
