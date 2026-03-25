import svgPaths from "../imports/svg-95m1j3vtbe";

type ActiveTab = 'home' | 'search' | 'notifications' | 'menu';

function FeedIcon({ active }: { active: boolean }) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          <path
            d={svgPaths.p267dd7f0}
            stroke={active ? "#027BA4" : "#8A8B8D"}
            strokeWidth="2.25"
          />
        </g>
      </svg>
    </div>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <div className="relative shrink-0 size-[28px] flex items-center justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#027BA4" : "#8A8B8D"} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>
  );
}

function BellIcon({ active }: { active: boolean }) {
  return (
    <div className="h-[22px] relative shrink-0 w-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 23">
        <g>
          <path d={svgPaths.p20a7a000} fill={active ? "#027BA4" : "#8A8B8D"} />
          <path d={svgPaths.p3990a880} stroke={active ? "#027BA4" : "#8A8B8D"} strokeLinecap="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function MenuIcon({ active }: { active: boolean }) {
  return (
    <div className="h-[14px] relative shrink-0 w-[22px]">
      <svg className="block" width="22" height="14" viewBox="0 0 25 17" fill="none">
        <path d="M23.125 1.125L1.12501 1.125" stroke={active ? "#027BA4" : "#8A8B8D"} strokeLinecap="round" strokeWidth="2.25" />
        <path d="M23.125 8.125L1.125 8.125" stroke={active ? "#027BA4" : "#8A8B8D"} strokeLinecap="round" strokeWidth="2.25" />
        <path d="M23.125 15.125L1.125 15.125" stroke={active ? "#027BA4" : "#8A8B8D"} strokeLinecap="round" strokeWidth="2.25" />
      </svg>
    </div>
  );
}

function ActiveDot() {
  return (
    <div className="size-[5px] mt-[4px]">
      <svg className="block size-full" fill="none" viewBox="0 0 5 5">
        <circle cx="2.5" cy="2.5" r="2.5" fill="#027BA4" />
      </svg>
    </div>
  );
}

interface BottomNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs: { id: ActiveTab; icon: (active: boolean) => React.ReactNode; label: string }[] = [
    { id: 'home', icon: (a) => <FeedIcon active={a} />, label: 'Home' },
    { id: 'search', icon: (a) => <SearchIcon active={a} />, label: 'Search' },
    { id: 'notifications', icon: (a) => <BellIcon active={a} />, label: 'Alerts' },
    { id: 'menu', icon: (a) => <MenuIcon active={a} />, label: 'Menu' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="w-full max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
        {/* Tab Bar */}
        <div className="flex items-center justify-around px-4 pt-3 pb-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center min-w-[48px] py-1 cursor-pointer hover:opacity-80 transition-opacity"
              >
                {tab.icon(isActive)}
                {isActive ? <ActiveDot /> : <div className="h-[9px]" />}
              </button>
            );
          })}
        </div>
        {/* Home Indicator */}
        <div className="flex justify-center pb-2 pt-1">
          <div className="bg-[#101010] h-[5px] rounded-[100px] w-[134px]" />
        </div>
      </div>
    </div>
  );
}
