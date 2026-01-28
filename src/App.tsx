import Header from './components/Header';
import DateHeader from './components/DateHeader';
import MemoryCard, { type MemoryItem } from './components/MemoryCard';
import OmniDock from './components/OmniDock';

// --- MOCK DATA ---
const MOCK_DATA = [
  {
    date: { day: '28', month: '1月', year: '2026', weekday: 'WED / 星期三' },
    summary: '支出 ¥137.9 · 记录 3',
    items: [
      {
        id: '0',
        type: 'text' as const,
        time: '20:30',
        content: '喝了一杯咖啡熬夜加班加点，终于写完了报告。',
        amount: '-¥9.90',
        expenseCategory: '咖啡',
        mood: 'chill' as const
      },
      {
        id: '1',
        type: 'visual' as const,
        imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        content: '终于考完试了！和室友去吃了那家一直想去的火锅，毛肚超级脆！',
        location: '重庆老火锅 · 大学城店',
        time: '18:30',
        tags: ['宿舍聚餐', 'Happy'],
        amount: '-¥128.00',
        expenseCategory: '餐饮',
        mood: 'happy' as const
      },
      {
        id: '2',
        type: 'text' as const,
        time: '23:15',
        content: '今天把《置身事内》看完了，对于土地财政有了更深的理解...',
        location: '图书馆',
        tags: ['Reading'],
        mood: 'neutral' as const
      }
    ]
  },
  {
    date: { day: '27', month: '1月', year: '2026', weekday: 'TUE / 星期二' },
    summary: '支出 ¥35 · 记录 1',
    items: [
      {
        id: '3',
        type: 'visual' as const,
        imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        content: '路边的猫咪，好像在等谁。',
        time: '14:20',
        location: '校园西门',
        tags: ['Cat', 'Chill'],
        amount: '-¥15.00',
        expenseCategory: '购物',
        mood: 'chill' as const
      }
    ]
  }
];

function App() {
  return (
    // Outer frame to center the "Mobile Phone" on desktop
    <div className="min-h-screen w-full flex justify-center items-center py-0 sm:py-8">

      {/* 20:9 Aspect Ratio Container (approx 430x932 iPhone 14 Pro Max is ~19.5:9, we can adapt) */}
      {/* Using aspect-[20/9] and max-height constraints to verify layout */}
      <div className="
        w-full h-[100vh] sm:h-[90vh] sm:w-auto sm:aspect-[9/20] 
        bg-canvas relative overflow-hidden flex flex-col shadow-2xl sm:rounded-[2.5rem] border-slate-800/10 sm:border-[8px]
      ">

        {/* Scrollable Content Area */}
        {/* Added no-scrollbar utility */}
        <div className="flex-1 overflow-y-auto w-full no-scrollbar relative pb-32">

          <div className="px-6 pb-20">
            <Header />

            <div className="mt-2">
              {MOCK_DATA.map((dayGroup, index) => (
                <div key={index}>
                  <DateHeader
                    date={dayGroup.date}
                    stats={{ summary: dayGroup.summary }}
                  />

                  <div className="space-y-6">
                    {dayGroup.items.map(item => (
                      <MemoryCard key={item.id} data={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Omni Dock (Fixed relative to the container) */}
        <div className="absolute bottom-0 w-full z-50">
          <OmniDock />
          {/* Immersive Home Indicator Area */}
          <div className="h-8 w-full flex justify-center items-end pb-2.5">
            <div className="w-1/3 h-1.5 bg-slate-900/10 rounded-full backdrop-blur-3xl"></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App