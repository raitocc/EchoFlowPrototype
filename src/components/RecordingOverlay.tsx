import { Mic } from 'lucide-react';

export default function RecordingOverlay() {
    return (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">

            {/* Pulsing Circles */}
            <div className="relative flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-primary/30 animate-ping opacity-75"></div>
                <div className="absolute w-48 h-48 rounded-full bg-primary/10 animate-pulse delay-100"></div>

                {/* Main Mic Icon */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-primary-light to-primary flex items-center justify-center text-white shadow-[0_0_50px_rgba(99,102,241,0.5)] z-10">
                    <Mic size={40} className="animate-pulse" />
                </div>
            </div>

            <h3 className="mt-8 text-white text-lg font-medium tracking-widest animate-pulse">
                正在聆听...
            </h3>

            <p className="mt-2 text-white/60 text-xs">
                点击任意位置取消
            </p>
        </div>
    );
}
