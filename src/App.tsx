import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DateHeader from './components/DateHeader';
import MemoryCard, { type MemoryItem } from './components/MemoryCard';
import MemoryDetail from './components/MemoryDetail';
import OmniDock from './components/OmniDock';
import RecordingOverlay from './components/RecordingOverlay';
import ImmersiveScrollbar from './components/ImmersiveScrollbar';
import CalendarView from './components/CalendarView';

import CapsuleShelf from './components/CapsuleShelf';
import CapsuleDetail from './components/CapsuleDetail';
import { CapsuleItem } from './components/CapsuleCard';

// --- MOCK DATA ---
const CAPSULE_DATA: CapsuleItem[] = [
  {
    id: 'c1',
    title: '2026 大理漫游记',
    subtitle: '3天 · 12个瞬间',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    engineType: '时空引擎',
    stats: [
      { label: '跨度', value: '3 天' },
      { label: '花费', value: '¥3,240' },
      { label: '足迹', value: '大理古城' }
    ],
    aiInsight: '这是你 2026 年的第一次远行。相比去年的"特种兵式"打卡，这次你明显放慢了节奏，平均每天只去了 1.5 个景点。Enjoy the slow life!'
  },
  {
    id: 'c2',
    title: '咖啡星人的续命日常',
    subtitle: '3个月 · 48杯',
    coverUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    engineType: '视觉聚类',
    stats: [
      { label: '累计', value: '48 杯' },
      { label: '花费', value: '¥1,450' },
      { label: '最爱', value: '冰美式' }
    ],
    aiInsight: '你最爱周三下午 15:00 左右去楼下买咖啡，看来周三是你的工作攻坚期？数据显示，喝完咖啡后的记录心情值提升了 40%。'
  },
  {
    id: 'c3',
    title: '我和王小明的独家记忆',
    subtitle: '1年 · 8次聚会',
    coverUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    engineType: '关系引擎',
    stats: [
      { label: '相识', value: '365 天' },
      { label: '频率', value: '0.8 次/月' },
      { label: '共同', value: '火锅' }
    ],
    aiInsight: '你们平均每月聚餐不到 1 次，但每次聚会都要持续 3 小时以上。要不要约个时间再聚聚？'
  }
];
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
        location: '火锅 · 大学城店',
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
  },
  {
    date: { day: '26', month: '1月', year: '2026', weekday: 'MON / 星期一' },
    summary: '无消费 · 记录 2',
    items: [
      {
        id: '4',
        type: 'audio' as const,
        time: '22:10',
        content: '听到这首老歌，突然想起了很多小时候的事情。',
        mood: 'neutral' as const
      },
      {
        id: '5',
        type: 'text' as const,
        time: '08:00',
        content: '早安，新的一周开始了。保持专注！',
        mood: 'excited' as const
      }
    ]
  },
  {
    date: { day: '25', month: '1月', year: '2026', weekday: 'SUN / 星期日' },
    summary: '支出 ¥299 · 记录 1',
    items: [
      {
        id: '6',
        type: 'visual' as const,
        imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        content: '周末去Livehouse看了演出，现场氛围太棒了！',
        location: 'MAO Livehouse',
        tags: ['Music', 'Weekend'],
        amount: '-¥299.00',
        expenseCategory: '娱乐',
        mood: 'excited' as const,
        time: '21:00'
      }
    ]
  }
];

function App() {
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [memoryMode, setMemoryMode] = useState<'view' | 'confirm'>('view');
  const [showCalendar, setShowCalendar] = useState(false);

  // Capsule State
  const [viewMode, setViewMode] = useState<'home' | 'shelf' | 'capsule_detail'>('home');
  const [activeCapsule, setActiveCapsule] = useState<CapsuleItem | null>(null);

  // Immersive Scrollbar State
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDateLabel, setCurrentDateLabel] = useState('2026 1月');

  const handleCardClick = (item: MemoryItem) => {
    setMemoryMode('view');
    setActiveMemory(item);
  };

  const handleCloseDetail = () => {
    setActiveMemory(null);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleDateSelect = (day: string) => {
    setShowCalendar(false);
    // Scroll to the specific date element
    const elementId = `date-2026-01-${day.padStart(2, '0')}`; // Construct ID (Assuming Jan 2026)
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.log(`Date element ${elementId} not found.`);
    }
  };

  // Capsule Handlers
  const handleOpenShelf = () => {
    setViewMode('shelf');
  };

  const handleCloseShelf = () => {
    setViewMode('home');
  };

  const handleSelectCapsule = (capsule: CapsuleItem) => {
    setActiveCapsule(capsule);
    setViewMode('capsule_detail');
  };

  const handleBackFromCapsule = () => {
    setActiveCapsule(null);
    setViewMode('shelf');
  };

  // Simulate Recording Process
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        setIsRecording(false);
        // Create a new mock memory
        const newMemory: MemoryItem = {
          id: 'new-1',
          type: 'text',
          time: '刚刚',
          content: '刚刚去楼下转了一圈，阳光真好，看见一只橘猫在晒太阳。',
          mood: 'happy',
          expenseCategory: '',
          amount: ''
        };
        setMemoryMode('confirm');
        setActiveMemory(newMemory);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  // Update scroll label logic (Simplified for prototype)
  const handleScroll = () => {
    // In a real app, logic would calculate which DateHeader is sticky/visible
    // For prototype, we just alternate labels based on scroll depth or match top item
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    if (scrollTop > 800) setCurrentDateLabel('2026 1月 (下旬)');
    else setCurrentDateLabel('2026 1月');
  };

  return (
    // Outer frame to center the "Mobile Phone" on desktop
    <div className="min-h-screen w-full flex justify-center items-center py-0 sm:py-8">

      {/* 20:9 Aspect Ratio Container */}
      <div className="
        w-full h-[100vh] sm:h-[90vh] sm:w-auto sm:aspect-[9/20] 
        bg-canvas relative overflow-hidden flex flex-col shadow-2xl sm:rounded-[2.5rem] border-slate-800/10 sm:border-[8px]
      ">

        {/* Recording Overlay */}
        {isRecording && <RecordingOverlay />}

        {/* Calendar View Overlay */}
        {showCalendar && (
          <CalendarView
            data={MOCK_DATA}
            onClose={() => setShowCalendar(false)}
            onDateSelect={handleDateSelect}
          />
        )}

        {/* Capsule Views */}
        {viewMode === 'shelf' && (
          <CapsuleShelf
            capsules={CAPSULE_DATA}
            onClose={handleCloseShelf}
            onSelectCapsule={handleSelectCapsule}
          />
        )}

        {viewMode === 'capsule_detail' && activeCapsule && (
          <CapsuleDetail
            data={activeCapsule}
            onBack={handleBackFromCapsule}
          />
        )}

        {/* Render Either Detail Page or Home Feed */}
        {activeMemory ? (
          <MemoryDetail
            mode={memoryMode}
            data={activeMemory}
            onClose={handleCloseDetail}
          />
        ) : (
          <>
            {/* Immersive Scrollbar */}
            <ImmersiveScrollbar containerRef={containerRef} currentLabel={currentDateLabel} />

            {/* Scrollable Content Area */}
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto w-full no-scrollbar relative pb-32 scroll-smooth"
            >

              <div className="px-6 pb-20">
                <Header onCalendarClick={() => setShowCalendar(true)} />

                <div className="mt-2">
                  {MOCK_DATA.map((dayGroup, index) => (
                    <div
                      key={index}
                      id={`date-2026-01-${dayGroup.date.day.padStart(2, '0')}`}
                      className="scroll-mt-24"
                    >
                      <DateHeader
                        date={dayGroup.date}
                        stats={{ summary: dayGroup.summary }}
                      />

                      <div className="space-y-6">
                        {dayGroup.items.map(item => (
                          <MemoryCard
                            key={item.id}
                            data={item}
                            onClick={() => handleCardClick(item)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Omni Dock (Fixed relative to the container) */}
            <div className="absolute bottom-0 w-full z-50">
              <OmniDock
                onOmniClick={handleStartRecording}
                activeTab={viewMode === 'home' ? 'home' : 'capsules'}
                onTabChange={(tab) => {
                  if (tab === 'home') setViewMode('home');
                  else setViewMode('shelf');
                }}
              />
              {/* Immersive Home Indicator Area */}
              <div className="h-8 w-full flex justify-center items-end pb-2.5">
                <div className="w-1/3 h-1.5 bg-slate-900/10 rounded-full backdrop-blur-3xl"></div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default App