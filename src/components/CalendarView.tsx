import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMemo } from 'react';

interface CalendarViewProps {
    data: any[]; // The MOCK_DATA structure
    onClose: () => void;
    onDateSelect: (day: string) => void;
}

export default function CalendarView({ data, onClose, onDateSelect }: CalendarViewProps) {
    // 1. Process Data for Heatmap
    const heatmapData = useMemo(() => {
        const map = new Map<string, { hasExpense: boolean; hasMemory: boolean }>();

        data.forEach(dayGroup => {
            // dayGroup.date.day is "28", "27" etc.
            const day = parseInt(dayGroup.date.day).toString(); // Normalize "01" to "1" if needed, just assuming simple string match for prototype

            let hasExpense = false;
            let hasMemory = false;

            dayGroup.items.forEach((item: any) => {
                if (item.amount) hasExpense = true;
                // Any item counts as a memory, but we differentiate purely visual/text vs expense
                // Requirement: "Blue dot: has diary/photo". "Red dot: has expense".
                // Since every item is technically a diary/photo/audio, 'hasMemory' is true if there's any item?
                // "如果这两点都有"，implies separation. 
                // Let's say Blue = Non-expense items (Visual/Text/Audio w/o amount) OR just presence of Content?
                // "当天有日记/照片" usually means the content itself. 
                // Let's simplify: 
                // - Red if ANY item has amount.
                // - Blue if ANY item has content/imageUrl/audio. 
                if (item.content || item.imageUrl || item.type === 'audio') hasMemory = true;
            });

            if (hasExpense || hasMemory) {
                map.set(day, { hasExpense, hasMemory });
            }
        });

        return map;
    }, [data]);

    // 2. Generate Calendar Grid for January 2026
    // Jan 1, 2026 is Thursday. 31 Days.
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    // const startOffset = 4; // Mon=0, Tue=1, Wed=2, Thu=3. Wait.
    // 2026-01-01 is Thursday.
    // If calendar starts on Sunday: Sun, Mon, Tue, Wed, Thu. 
    // 0, 1, 2, 3, 4. So 4 empty slots.
    // If starts on Monday: Mon, Tue, Wed, Thu. 3 empty slots.
    // Let's use standard S-M-T-W-T-F-S (Sunday start). 
    // 2026 Jan 1 is Thursday. Sun(0)->Thu(4). Correct.

    return (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex flex-col animate-in fade-in duration-200">
            {/* Top Spacer to push it down slightly or full cover? "下拉覆盖" implies popping from top. */}
            {/* Let's make it a sheet from top */}

            <div className="bg-surface rounded-b-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-top-10 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 pt-6 border-b border-slate-100">
                    <button className="p-2 rounded-full hover:bg-slate-100 text-text-muted">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-text-main">2026年 1月</span>
                    </div>
                    <button className="p-2 rounded-full hover:bg-slate-100 text-text-muted">
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Close Button (Absolute top-right for easy exit? Or bottom handle?) */}
                {/* Let's add a clear close button in the header or just overlay click. PROTOTYPE: Add X button. */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"
                >
                    <X size={16} className="text-text-muted" />
                </button>


                {/* Weekdays */}
                <div className="grid grid-cols-7 px-6 pt-4 pb-2">
                    {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                        <div key={d} className="text-center text-xs font-bold text-text-muted opacity-50">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 px-6 pb-8 gap-y-4">
                    {/* Empty slots for start offset (Thursday start = 4 empty) */}
                    {Array.from({ length: 4 }).map((_, i) => <div key={`empty-${i}`} />)}

                    {days.map(day => {
                        const dayStr = day.toString();
                        const status = heatmapData.get(dayStr);
                        const isToday = day === 28; // Mock today

                        return (
                            <button
                                key={day}
                                onClick={() => {
                                    if (status) onDateSelect(dayStr); // Only scroll if there's data? Or allow logic to handle it.
                                }}
                                className={`
                                relative flex flex-col items-center justify-center py-2 rounded-xl transition-all
                                ${isToday ? 'bg-primary/10' : 'hover:bg-slate-50'}
                                ${status ? 'opacity-100' : 'opacity-40'}
                            `}
                            >
                                <span className={`text-sm font-medium ${isToday ? 'text-primary font-bold' : 'text-text-main'}`}>
                                    {day}
                                </span>

                                {/* Heatmap Dots */}
                                <div className="flex gap-0.5 mt-1 h-1.5">
                                    {status?.hasExpense && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-sm"></div>
                                    )}
                                    {status?.hasMemory && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm"></div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer Handle */}
                <button onClick={onClose} className="w-full py-3 flex justify-center border-t border-slate-50 bg-slate-50/50 active:bg-slate-100">
                    <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
                </button>
            </div>

            {/* Click outside to close */}
            <div className="flex-1" onClick={onClose} />
        </div>
    );
}
