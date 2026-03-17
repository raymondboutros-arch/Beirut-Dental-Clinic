import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const timeSlots = [
  { id: 'morning', label: 'Morning', slots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'] },
  { id: 'afternoon', label: 'Afternoon', slots: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'] },
  { id: 'evening', label: 'Evening', slots: ['4:00 PM', '4:30 PM', '5:00 PM'] },
];

// Mock unavailable slots
const unavailableSlots = ['10:00 AM', '2:00 PM', '4:30 PM'];

interface DateTimeSelectionProps {
  onBack: () => void;
  onContinue: (date: string, time: string) => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DateTimeSelection({ onBack, onContinue }: DateTimeSelectionProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const isPastDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  // Sundays off
  const isSunday = (day: number) => new Date(currentYear, currentMonth, day).getDay() === 0;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTime('');
  };

  const formattedDate = selectedDate
    ? `${monthNames[currentMonth]} ${selectedDate}, ${currentYear}`
    : '';

  const handleContinue = () => {
    if (formattedDate && selectedTime) {
      onContinue(formattedDate, selectedTime);
    }
  };

  // Build calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col pb-[85px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-4 py-4 sticky top-0 z-10">
        <div className="relative flex items-center justify-center max-w-[430px] mx-auto">
          <button
            onClick={onBack}
            className="absolute left-0 p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#1C1C1C]" />
          </button>
          <h1 className="font-medium text-[19px] text-[#1C1C1C]">Date & Time</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-[#D9DEE2] px-4 py-3">
        <div className="max-w-[430px] mx-auto flex items-center gap-2">
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#D9DEE2] rounded-full" />
        </div>
        <p className="text-xs text-[#8AA4B1] mt-2 text-center">Step 3 of 4</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-5">
        <div className="max-w-[430px] mx-auto">

          {/* Calendar Card */}
          <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4 mb-5">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 hover:bg-[#F0F3F5] rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#6A7279]" />
              </button>
              <h2 className="font-semibold text-[#1C1C1C]">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-1.5 hover:bg-[#F0F3F5] rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#6A7279]" />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {dayLabels.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-[#8AA4B1] py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} />;
                }
                const past = isPastDay(day);
                const sunday = isSunday(day);
                const disabled = past || sunday;
                const selected = selectedDate === day;
                const todayMark = isToday(day);

                return (
                  <button
                    key={day}
                    disabled={disabled}
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedTime('');
                    }}
                    className={`relative h-10 flex items-center justify-center rounded-full text-sm transition-all ${
                      selected
                        ? 'bg-[#1E6E97] text-white font-medium'
                        : disabled
                        ? 'text-[#D9DEE2] cursor-not-allowed'
                        : todayMark
                        ? 'text-[#1E6E97] font-medium hover:bg-[#E8F4F8]'
                        : 'text-[#1C1C1C] hover:bg-[#F0F3F5]'
                    }`}
                  >
                    {day}
                    {todayMark && !selected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1E6E97] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="space-y-5">
              {timeSlots.map((group) => (
                <div key={group.id}>
                  <h3 className="font-semibold text-[#1C1C1C] text-sm mb-3">{group.label}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {group.slots.map((slot) => {
                      const isUnavailable = unavailableSlots.includes(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          disabled={isUnavailable}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 rounded-[12px] text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-[#1E6E97] text-white shadow-sm'
                              : isUnavailable
                              ? 'bg-[#F0F3F5] text-[#C5CDD3] cursor-not-allowed line-through'
                              : 'bg-white border border-[#D9DEE2] text-[#1C1C1C] hover:border-[#1E6E97] hover:text-[#1E6E97]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!selectedDate && (
            <div className="text-center py-8">
              <p className="text-[#8AA4B1] text-sm">Select a date to see available times</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-[#D9DEE2] px-4 py-4 sticky bottom-[85px]">
        <div className="max-w-[430px] mx-auto">
          {selectedDate && selectedTime && (
            <p className="text-center text-sm text-[#6A7279] mb-3">
              {formattedDate} at {selectedTime}
            </p>
          )}
          <button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-4 rounded-[24px] font-semibold text-white transition-all ${
              selectedDate && selectedTime
                ? 'bg-[#1E6E97] hover:bg-[#175A7A]'
                : 'bg-[#8AA4B1] cursor-not-allowed opacity-50'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
