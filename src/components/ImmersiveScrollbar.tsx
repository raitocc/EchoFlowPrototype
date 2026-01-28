import { useRef, useState, useEffect } from 'react';

interface ImmersiveScrollbarProps {
    containerRef: React.RefObject<HTMLDivElement>;
    currentLabel?: string; // e.g., "2026年 1月"
}

export default function ImmersiveScrollbar({ containerRef, currentLabel = '2026年 1月' }: ImmersiveScrollbarProps) {
    const [isActive, setIsActive] = useState(false);
    const scrollbarRef = useRef<HTMLDivElement>(null);

    const handleScroll = (clientY: number) => {
        if (!containerRef.current || !scrollbarRef.current) return;

        const { top, height } = scrollbarRef.current.getBoundingClientRect();
        const relativeY = Math.max(0, Math.min(1, (clientY - top) / height));

        // Calculate scroll position
        const { scrollHeight, clientHeight } = containerRef.current;
        const scrollTarget = relativeY * (scrollHeight - clientHeight);

        containerRef.current.scrollTop = scrollTarget;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsActive(true);
        handleScroll(e.touches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        // Prevent default to avoid page scrolling if possible (though difficult in pure component)
        handleScroll(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        setIsActive(false);
    };

    // Mouse support for desktop testing
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsActive(true);
        handleScroll(e.clientY);

        const handleMouseMove = (ev: MouseEvent) => handleScroll(ev.clientY);
        const handleMouseUp = () => {
            setIsActive(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="absolute right-0 top-16 bottom-20 w-8 z-40 flex items-center justify-center">
            {/* Touch Target Area */}
            <div
                ref={scrollbarRef}
                className="w-full h-full relative group cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
            >
                {/* The Bar Line */}
                <div className="absolute right-2 top-0 bottom-0 w-0.5 bg-slate-300/30 rounded-full transition-opacity group-hover:bg-slate-300/50"></div>

                {/* Ticks (Visual only) */}
                <div className="absolute inset-y-0 right-2 w-1 flex flex-col justify-between py-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-1.5 h-px bg-slate-400/40"></div>
                    ))}
                </div>

                {/* The Bubble (Thumb) */}
                {isActive && (
                    <div
                        className="absolute right-8 top-[var(--thumb-y)] pointer-events-none transform -translate-y-1/2 whitespace-nowrap z-50 animate-in slide-in-from-right-4 fade-in duration-200"
                        style={{ top: '50%' }} // Dynamic positioning handled conceptually or simplified to center bubble for current feedback
                    >
                        <div className="bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-2xl px-4 py-3 flex items-center gap-3 border border-indigo-100">
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-medium text-text-muted">Currently in</span>
                                <span className="text-lg font-bold text-primary font-mono tracking-tight">{currentLabel}</span>
                            </div>
                            {/* Arrow */}
                            <div className="w-2 h-2 bg-white rotate-45 transform translate-x-1 border-t border-r border-indigo-100/50 absolute -right-1 top-1/2 -translate-y-1/2"></div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
