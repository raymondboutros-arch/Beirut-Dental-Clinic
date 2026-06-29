import { useState } from 'react';
import { ArrowLeft, Star, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  rating: number;
  reviews: number;
  nextAvailable: string;
  avatar: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 'dr-jean-pierre',
    name: 'Dr. Jean Pierre Kalouche',
    role: 'Lead Dentist',
    specialty: 'Restorative & Cosmetic',
    rating: 4.9,
    reviews: 127,
    nextAvailable: 'Today, 2:00 PM',
    avatar: 'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWJhbmVzZSUyMG1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzIwMTkxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'dr-sarah',
    name: 'Dr. Sarah M.',
    role: 'Dental Surgeon',
    specialty: 'Oral Surgery & Implants',
    rating: 4.8,
    reviews: 98,
    nextAvailable: 'Tomorrow, 10:00 AM',
    avatar: 'https://images.unsplash.com/photo-1765833468912-56ca0afa0c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwZmVtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMDE5MTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'dr-nader',
    name: 'Dr. Nader',
    role: 'Endodontist',
    specialty: 'Root Canal Specialist',
    rating: 4.7,
    reviews: 85,
    nextAvailable: 'Tomorrow, 3:30 PM',
    avatar: 'https://images.unsplash.com/photo-1762066436595-67edb4610539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwbWFsZSUyMGRlbnRpc3QlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIwMTkxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'dr-nadia',
    name: 'Dr. Nadia L.',
    role: 'Hygienist',
    specialty: 'Cleaning & Prevention',
    rating: 5.0,
    reviews: 64,
    nextAvailable: 'Today, 4:30 PM',
    avatar: 'https://images.unsplash.com/photo-1631562502360-4487ceab6d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nJTIwc2NydWJzJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzcyMDE5MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

interface StaffSelectionProps {
  selectedService: string;
  onBack: () => void;
  onContinue: (staffId: string) => void;
}

export function StaffSelection({ selectedService, onBack, onContinue }: StaffSelectionProps) {
  const [selectedStaff, setSelectedStaff] = useState<string>('');

  return (
    <div className="bg-[#F6F1E7] min-h-screen flex flex-col pb-[85px]">
      {/* Header */}
      <div className="bg-white border-b border-[#E0D8C8] px-4 py-4 sticky top-0 z-10">
        <div className="relative flex items-center justify-center max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
          <button
            onClick={onBack}
            className="absolute left-0 p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#231F20]" />
          </button>
          <h1 className="font-medium text-[19px] text-[#231F20]">Select Staff</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-[#E0D8C8] px-4 py-3">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto flex items-center gap-2">
          <div className="flex-1 h-[3px] bg-[#26C4B5] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#26C4B5] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#E0D8C8] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#E0D8C8] rounded-full" />
        </div>
        <p className="text-xs text-[#8A8378] mt-2 text-center">Step 2 of 4</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
          <p className="text-sm text-[#8A8378] mb-5">
            Choose your preferred practitioner for this visit
          </p>

          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
            {staffMembers.map((staff) => {
              const isSelected = selectedStaff === staff.id;
              return (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff.id)}
                  className={`w-full bg-white border rounded-[16px] p-4 flex items-start gap-3.5 transition-all text-left ${
                    isSelected
                      ? 'border-[#26C4B5] shadow-[0_0_0_1px_#26C4B5]'
                      : 'border-[#E0D8C8] hover:border-[#8A8378]'
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#E3F1F1]">
                    <ImageWithFallback
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-[#231F20]">{staff.name}</p>
                        <p className="text-sm text-[#26C4B5]">{staff.role}</p>
                      </div>
                      {/* Radio */}
                      <div
                        className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? 'border-[#26C4B5] bg-[#26C4B5]'
                            : 'border-[#8A8378] bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#8A8378] mt-1">{staff.specialty}</p>

                    <div className="flex items-center gap-3 mt-2.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-medium text-[#231F20]">{staff.rating}</span>
                        <span className="text-xs text-[#8A8378]">({staff.reviews})</span>
                      </div>
                      <div className="w-px h-3 bg-[#E0D8C8]" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#8A8378]" />
                        <span className="text-xs text-[#8A8378]">{staff.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-[#E0D8C8] px-4 py-4 sticky bottom-[85px]">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
          <button
            onClick={() => selectedStaff && onContinue(selectedStaff)}
            disabled={!selectedStaff}
            className={`w-full py-4 rounded-[24px] font-semibold text-white transition-all ${
              selectedStaff
                ? 'bg-[#26C4B5] hover:bg-[#1FA99B]'
                : 'bg-[#8A8378] cursor-not-allowed opacity-50'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}