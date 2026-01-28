import { Menu, Calendar } from 'lucide-react';

interface HeaderProps {
    onCalendarClick?: () => void;
}

export default function Header({ onCalendarClick }: HeaderProps) {
    return (
        <header className="flex items-center justify-between py-6">
            {/* Menu Icon */}
            <button
                className="text-text-main p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
                <Menu size={24} strokeWidth={2.5} />
            </button>

            {/* Title */}
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold text-text-main tracking-tight">EchoFlow</h1>
                <span className="text-[10px] text-text-muted font-medium tracking-widest uppercase">
                    回响生活
                </span>
            </div>

            {/* Calendar Icon */}
            <button
                onClick={onCalendarClick}
                className="text-text-main p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
                <Calendar size={24} strokeWidth={2.5} />
            </button>
        </header>
    );
}
