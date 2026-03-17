import { Menu } from 'lucide-react';
import { Button } from './ui/button';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="text-gray-900 hover:bg-gray-50"
      >
        <Menu className="w-5 h-5" />
      </Button>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#14B8A6] flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white rounded"></div>
        </div>
        <span className="text-gray-900">Treatment Plan</span>
      </div>
    </div>
  );
}
