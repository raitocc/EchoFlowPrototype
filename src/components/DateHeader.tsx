interface DateHeaderProps {
    date: {
        day: string; // "26"
        month: string; // "1月"
        year: string; // "2026"
        weekday: string; // "星期一"
    };
    stats?: {
        summary: string; // "支出 ¥35 · 完成 2 项"
    };
}

export default function DateHeader({ date, stats }: DateHeaderProps) {
    return (
        <div className="sticky top-0 z-10 flex items-end justify-between mb-4 py-3 px-1 bg-gradient-to-b from-[var(--color-canvas)] via-[var(--color-canvas)]/95 to-transparent backdrop-blur-sm transition-all">
            <div className="flex items-baseline gap-2">
                {/* Large Day Number */}
                <span className="text-4xl font-bold text-text-main leading-none font-display">
                    {date.day}
                </span>

                {/* Month/Year & Weekday Stack */}
                <div className="flex flex-col leading-none ml-1">
                    <span className="text-xs font-bold text-text-muted uppercase mb-1">
                        {date.month}
                    </span>
                    <span className="text-xs font-medium text-text-muted">
                        {date.weekday}
                    </span>
                </div>
            </div>

            {/* Right Stats */}
            {stats && (
                <span className="text-[10px] text-text-muted font-medium mb-1 tracking-wide">
                    {stats.summary}
                </span>
            )}
        </div>
    );
}
