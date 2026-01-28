import { Mic, Home, LayoutGrid } from 'lucide-react';

interface OmniDockProps {
    onOmniClick?: () => void;
    activeTab?: 'home' | 'capsules';
    onTabChange?: (tab: 'home' | 'capsules') => void;
}

export default function OmniDock({ onOmniClick, activeTab = 'home', onTabChange }: OmniDockProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center pb-8 pt-12 bg-gradient-to-t from-[var(--color-canvas)] via-[var(--color-canvas)]/90 to-transparent">
            <div className="pointer-events-auto flex items-center justify-between px-8 py-2 rounded-full bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/40 gap-8 transition-all duration-300 hover:scale-[1.02]">

                {/* Left Action: Home */}
                <button
                    onClick={() => onTabChange?.('home')}
                    className={`p-3 rounded-full transition-colors active:scale-90 duration-200 ${activeTab === 'home' ? 'text-primary bg-primary/10' : 'text-text-muted hover:bg-slate-100'}`}
                >
                    <Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2.5} />
                </button>

                {/* Center: Omni-Orb (Voice Input) */}
                <button
                    onClick={onOmniClick}
                    className="relative group -mt-10"
                >
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-primary-light)] to-[var(--color-primary)] shadow-[0_10px_20px_rgba(99,102,241,0.3)] flex items-center justify-center text-white transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-95 border-2 border-white/20">
                        <Mic size={28} />
                    </div>
                </button>

                {/* Right Action: Capsules (Assets) */}
                <button
                    onClick={() => onTabChange?.('capsules')}
                    className={`p-3 rounded-full transition-colors active:scale-90 duration-200 ${activeTab === 'capsules' ? 'text-primary bg-primary/10' : 'text-text-muted hover:bg-slate-100'}`}
                >
                    <LayoutGrid size={24} strokeWidth={activeTab === 'capsules' ? 3 : 2.5} />
                </button>

            </div>
        </div>
    );
}
