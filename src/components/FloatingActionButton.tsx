import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-24 right-6 z-[60] w-14 h-14 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-full shadow-[0_8px_20px_rgba(99,102,241,0.4)] flex items-center justify-center text-white transition-transform duration-300 hover:scale-105 active:scale-95 animate-in zoom-in spin-in-12 duration-500"
        >
            <Plus size={28} strokeWidth={3} />
        </button>
    );
}
