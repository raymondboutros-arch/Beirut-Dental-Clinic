import { User, ClipboardList, Calendar, CreditCard, Settings, HelpCircle, LogOut, ChevronRight, Shield } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface MenuScreenProps {
  onNavigate: (screen: string) => void;
}

const menuSections = [
  {
    title: 'Clinical',
    items: [
      { icon: ClipboardList, label: 'Treatment Plans', screen: 'dashboard', badge: '3' },
      { icon: Calendar, label: 'Appointments', screen: 'appointments' },
      { icon: CreditCard, label: 'Billing & Payments', screen: 'billing' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile', screen: 'profile' },
      { icon: Settings, label: 'Settings', screen: 'settings' },
      { icon: Shield, label: 'Privacy & Security', screen: 'privacy' },
      { icon: HelpCircle, label: 'Help & Support', screen: 'help' },
    ],
  },
];

export function MenuScreen({ onNavigate }: MenuScreenProps) {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-[100px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-5 pt-5 pb-5">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
          <h1 className="font-medium text-[19px] text-[#1C1C1C] mb-5">Menu</h1>

          {/* Profile Card */}
          <button onClick={() => onNavigate('profile')} className="w-full bg-[#F0F3F5] rounded-[16px] p-4 flex items-center gap-4 text-left hover:bg-[#E8EBEE] transition-colors">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="bg-[#1E6E97] text-white text-lg">
                DR
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-[#1C1C1C]">Dr. Jean Pierre Kalouche</p>
              <p className="text-sm text-[#6A7279]">Prosthodontist & Implantologist</p>
              <p className="text-xs text-[#8AA4B1] mt-0.5">Beirut Dental Clinic</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8AA4B1]" />
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-5 py-6 max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto space-y-8">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="font-semibold text-xs text-[#8AA4B1] uppercase tracking-wider mb-3 px-1">
              {section.title}
            </h2>
            <div className="bg-white border border-[#D9DEE2] rounded-[16px] overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.screen)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F8F9FA] transition-colors ${
                    index < section.items.length - 1
                      ? 'border-b border-[#D9DEE2]'
                      : ''
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#F0F3F5] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-[18px] h-[18px] text-[#6A7279]" />
                  </div>
                  <span className="flex-1 text-left font-medium text-[#1C1C1C]">
                    {item.label}
                  </span>
                  {'badge' in item && item.badge && (
                    <span className="bg-[#1E6E97] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#8AA4B1]" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Sign Out */}
        <button className="w-full bg-white border border-[#D9DEE2] rounded-[16px] flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <LogOut className="w-[18px] h-[18px] text-red-500" />
          </div>
          <span className="flex-1 text-left font-medium text-red-600">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
