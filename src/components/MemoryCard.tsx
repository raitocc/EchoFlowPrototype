import { MapPin, Smile, Frown, Meh, Coffee, ShoppingBag, Utensils } from 'lucide-react';

export interface MemoryItem {
    id: string;
    type: 'visual' | 'text' | 'audio';
    imageUrl?: string;
    location?: string;
    time: string;
    content?: string;
    tags?: string[];
    amount?: string; // e.g., "-¥35.00"
    expenseCategory?: string; // e.g., "餐饮", "娱乐"
    mood?: 'happy' | 'sad' | 'neutral' | 'excited' | 'chill';
}

interface MemoryCardProps {
    data: MemoryItem;
    onClick?: () => void;
}

const MoodIcon = ({ mood }: { mood?: string }) => {
    if (!mood) return null;
    const size = 14;
    const className = "text-yellow-500 drop-shadow-sm";
    switch (mood) {
        case 'happy': return <Smile size={size} className={className} />;
        case 'sad': return <Frown size={size} className={className} />;
        case 'excited': return <Smile size={size} className="text-orange-500" />;
        case 'neutral': return <Meh size={size} className="text-slate-400" />;
        case 'chill': return <Coffee size={size} className="text-amber-700" />;
        default: return <Smile size={size} className={className} />;
    }
};

const CategoryIcon = ({ category }: { category?: string }) => {
    if (!category) return null;
    const size = 12;
    if (category === '餐饮') return <Utensils size={size} />;
    if (category === '购物') return <ShoppingBag size={size} />;
    if (category.includes('咖啡')) return <Coffee size={size} />;
    return null;
}

export default function MemoryCard({ data, onClick }: MemoryCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-surface rounded-[1.5rem] shadow-[var(--shadow-float)] overflow-hidden mb-6 active:scale-[0.98] transition-transform duration-200 cursor-pointer border border-slate-50/50"
        >
            {/* Image Section */}
            {data.imageUrl && (
                <div className="relative">
                    <img
                        src={data.imageUrl}
                        alt="Memory"
                        className="w-full h-48 object-cover"
                    />

                    {/* Tags floating on image */}
                    {data.tags && data.tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex gap-2">
                            {data.tags.map(tag => (
                                <span key={tag} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-text-muted shadow-sm uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Content Section */}
            <div className="p-5">

                {/* Header Row: Mood & Time (if no image, otherwise just helpful metadata) */}
                {!data.imageUrl && data.mood && (
                    <div className="mb-2 flex items-center gap-2">
                        <span className="bg-yellow-50/50 p-1.5 rounded-full"><MoodIcon mood={data.mood} /></span>
                        <span className="text-xs font-bold text-yellow-600/80 uppercase tracking-wider">{data.mood}</span>
                    </div>
                )}

                {/* Caption */}
                {data.content && (
                    <p className="text-text-main text-sm font-medium leading-relaxed mb-4 line-clamp-3">
                        {data.content}
                    </p>
                )}

                {/* Metadata & Footer Row */}
                <div className="flex justify-between items-end pt-2 border-t border-slate-50">

                    {/* Left: Location & Time */}
                    <div className="flex flex-col gap-1">
                        {data.location && (
                            <div className="flex items-center gap-1.5 text-text-muted">
                                <MapPin size={12} className="text-primary" />
                                <span className="text-xs font-medium">{data.location}</span>
                            </div>
                        )}
                        <span className="text-[10px] text-text-muted font-mono pl-0.5 opacity-60">{data.time}</span>
                    </div>

                    {/* Right: Expense & Amount */}
                    {data.amount && (
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-rose-500">{data.amount}</span>
                            {data.expenseCategory && (
                                <div className="flex items-center gap-1 text-[10px] text-rose-400 bg-rose-50 px-1.5 py-0.5 rounded-md mt-0.5">
                                    <CategoryIcon category={data.expenseCategory} />
                                    <span>{data.expenseCategory}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
