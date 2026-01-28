import { Sparkles } from 'lucide-react';

export interface CapsuleItem {
    id: string;
    title: string;
    subtitle: string;
    coverUrl: string;
    engineType: string; // e.g., "时空引擎"
    engineLabel?: string;
    stats: { label: string; value: string }[];
    aiInsight: string;
    // In a real app, this would contain the detailed memory items
}

interface CapsuleCardProps {
    data: CapsuleItem;
    onClick: () => void;
}

export default function CapsuleCard({ data, onClick }: CapsuleCardProps) {
    return (
        <div
            onClick={onClick}
            className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden group cursor-pointer active:scale-95 transition-transform duration-300 shadow-[var(--shadow-float)]"
        >
            {/* Cover Image */}
            <img src={data.coverUrl} alt={data.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                {/* Top Badge */}
                <div className="flex items-start">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10">
                        {data.engineType}
                    </span>
                </div>

                {/* Bottom Info */}
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-lg font-bold leading-tight mb-1 drop-shadow-sm">{data.title}</h3>
                        <p className="text-xs text-white/70 font-medium">{data.subtitle}</p>
                    </div>
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full mb-1">
                        <Sparkles size={16} className="text-primary-light" fill="currentColor" />
                    </div>
                </div>
            </div>
        </div>
    );
}
