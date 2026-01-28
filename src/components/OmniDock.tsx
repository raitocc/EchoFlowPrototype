import { Home, LayoutGrid, Users } from 'lucide-react';

interface OmniDockProps {
    activeTab: 'home' | 'shelf' | 'echo_space';
    onTabChange: (tab: 'home' | 'shelf' | 'echo_space') => void;
}

export default function OmniDock({ activeTab, onTabChange }: OmniDockProps) {
    const tabs = [
        { id: 'home' as const, icon: Home, label: '首页' },
        { id: 'shelf' as const, icon: LayoutGrid, label: '胶囊' },
        { id: 'echo_space' as const, icon: Users, label: '共鸣' },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200/50 pb-8 pt-2">
            <div className="flex justify-around items-center px-4">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="flex-1 flex flex-col items-center gap-1 py-2 active:scale-95 transition-transform"
                        >
                            <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-slate-100'}`}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
