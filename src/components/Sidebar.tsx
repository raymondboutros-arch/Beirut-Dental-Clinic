import { ClipboardList, Users, Calendar, CreditCard, Settings } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const menuItems = [
    { icon: ClipboardList, label: 'Treatment Plans', active: true },
    { icon: Users, label: 'Patients', active: false },
    { icon: Calendar, label: 'Appointments', active: false },
    { icon: CreditCard, label: 'Billing', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const SidebarContent = () => (
    <div className="h-full bg-white flex flex-col p-4 border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#14B8A6] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white rounded"></div>
        </div>
        <span className="text-gray-900">Dent Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onMobileClose?.()}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              item.active
                ? 'bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen border-r border-gray-200">
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-64 p-0 bg-white border-gray-200">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Access treatment plans, patients, appointments, billing and settings</SheetDescription>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
