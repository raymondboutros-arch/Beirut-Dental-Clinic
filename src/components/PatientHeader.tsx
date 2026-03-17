import { Avatar, AvatarFallback } from './ui/avatar';
import { ChevronRight } from 'lucide-react';

export function PatientHeader() {
  return (
    <div className="mb-5">
      {/* Compact Patient Card */}
      <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-[#1E6E97] text-white">RB</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-[#1C1C1C]">Raymond Boutros</p>
            <p className="text-sm text-[#6A7279]">DOB: Nov 3, 1986 · #P-00123</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#8AA4B1]" />
        </div>

        {/* Quick Info */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1 bg-[#F0F3F5] rounded-xl px-3 py-2">
            <p className="text-xs text-[#8AA4B1]">Phone</p>
            <p className="text-sm text-[#1C1C1C]">(555) 123-4567</p>
          </div>
          <div className="flex-1 bg-[#F0F3F5] rounded-xl px-3 py-2">
            <p className="text-xs text-[#8AA4B1]">Last Visit</p>
            <p className="text-sm text-[#1C1C1C]">Nov 17, 2025</p>
          </div>
        </div>

        {/* Medical Alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 text-xs font-medium">!</span>
          </div>
          <p className="text-xs text-red-700">
            Allergic to Penicillin · Hypertension
          </p>
        </div>
      </div>
    </div>
  );
}
