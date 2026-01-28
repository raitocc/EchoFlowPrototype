import { Keyboard, Camera, Mic } from 'lucide-react';

export default function OmniDock() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center pb-8 pt-12 bg-gradient-to-t from-[var(--color-canvas)] via-[var(--color-canvas)]/90 to-transparent">
            <div className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-2 rounded-full bg-surface/50 backdrop-blur-md shadow-sm border border-white/20">

                {/* Left: Keyboard (Journal) */}
                <button className="p-3 bg-surface rounded-full shadow-sm text-text-muted hover:text-primary active:scale-95 transition-all cursor-pointer">
                    <Keyboard size={20} />
                </button>

                {/* Center: Omni-Orb */}
                <button className="relative group -mt-8">
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>

                    {/* Main Orb */}
                    <div className="relative h-16 w-16 rounded-full bg-gradient-to-b from-primary-light to-primary flex items-center justify-center text-white shadow-[var(--shadow-float)] active:scale-95 transition-transform duration-200 cursor-pointer border-2 border-white/20">
                        <Mic size={28} className="drop-shadow-sm" />
                    </div>
                </button>

                {/* Right: Camera */}
                <button className="p-3 bg-surface rounded-full shadow-sm text-text-muted hover:text-primary active:scale-95 transition-all cursor-pointer">
                    <Camera size={20} />
                </button>

            </div>
        </div>
    );
}
