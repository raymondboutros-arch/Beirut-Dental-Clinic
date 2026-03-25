import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, User, CreditCard, CheckCircle2, Wallet, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Service labels lookup
const serviceLabels: Record<string, { name: string; duration: string; price: number }> = {
  'general-checkup': { name: 'General Checkup', duration: '30 min', price: 50 },
  'cavities': { name: 'Cavities Consultation', duration: '20 min', price: 40 },
  'implant': { name: 'Implant Consultation', duration: '45 min', price: 120 },
  'veneers': { name: 'Veneers Consultation', duration: '30 min', price: 80 },
  'tmj': { name: 'TMJ Assessment', duration: '40 min', price: 90 },
  'detartrage': { name: 'Detartrage (Scaling)', duration: '45 min', price: 150 },
  'fluoride': { name: 'Fluoride Treatment', duration: '15 min', price: 35 },
  'composite': { name: 'Composite Filling', duration: '30-60 min', price: 200 },
  'crown': { name: 'Crown Placement', duration: '90 min', price: 800 },
  'root-canal': { name: 'Root Canal Treatment', duration: '60-90 min', price: 1200 },
  'whitening': { name: 'Teeth Whitening', duration: '60 min', price: 350 },
  'veneer-placement': { name: 'Veneer Placement', duration: '2 hours', price: 900 },
  'bonding': { name: 'Cosmetic Bonding', duration: '30 min', price: 180 },
};

const staffLabels: Record<string, { name: string; role: string; avatar: string }> = {
  'dr-jean-pierre': {
    name: 'Dr. Jean Pierre Kalouche',
    role: 'Lead Dentist',
    avatar: 'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWJhbmVzZSUyMG1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzIwMTkxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  'dr-sarah': {
    name: 'Dr. Sarah M.',
    role: 'Dental Surgeon',
    avatar: 'https://images.unsplash.com/photo-1765833468912-56ca0afa0c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwZmVtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMDE5MTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  'dr-nader': {
    name: 'Dr. Nader',
    role: 'Endodontist',
    avatar: 'https://images.unsplash.com/photo-1762066436595-67edb4610539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwbWFsZSUyMGRlbnRpc3QlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIwMTkxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  'dr-nadia': {
    name: 'Dr. Nadia L.',
    role: 'Hygienist',
    avatar: 'https://images.unsplash.com/photo-1631562502360-4487ceab6d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nJTIwc2NydWJzJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzcyMDE5MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
};

interface ReviewAndPayProps {
  selectedService: string;
  selectedStaff: string;
  selectedDate: string;
  selectedTime: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function ReviewAndPay({
  selectedService,
  selectedStaff,
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
}: ReviewAndPayProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'whish'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const service = serviceLabels[selectedService] || { name: selectedService, duration: '30 min', price: 100 };
  const staff = staffLabels[selectedStaff] || { name: selectedStaff, role: 'Dentist', avatar: '' };

  const consultationFee = service.price;
  const taxRate = 0.11;
  const tax = Math.round(consultationFee * taxRate);
  const total = consultationFee + tax;

  const handleConfirmAndPay = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsProcessing(false);
    setIsConfirmed(true);
  };

  // Confirmation screen
  if (isConfirmed) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex flex-col pb-[85px]">
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] w-full text-center">
            <div className="w-20 h-20 rounded-full bg-[#E6F7EF] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#2D9F6F]" />
            </div>
            <h1 className="text-[24px] font-semibold text-[#1C1C1C] mb-2">Booking Confirmed!</h1>
            <p className="text-[#6A7279] mb-8">
              Your appointment has been successfully booked
            </p>

            <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-5 text-left mb-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#D9DEE2]">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#E8F4F8] flex-shrink-0">
                  {staff.avatar && (
                    <ImageWithFallback src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-[#1C1C1C]">{staff.name}</p>
                  <p className="text-sm text-[#6A7279]">{staff.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F0F3F5] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-[#6A7279]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#8AA4B1]">Date & Time</p>
                    <p className="text-sm text-[#1C1C1C]">{selectedDate} at {selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F0F3F5] flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-[#6A7279]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#8AA4B1]">Amount Paid</p>
                    <p className="text-sm text-[#1C1C1C]">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onConfirm}
              className="w-full py-4 rounded-[24px] font-semibold text-white bg-[#1E6E97] hover:bg-[#175A7A] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col pb-[85px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-4 py-4 sticky top-0 z-10">
        <div className="relative flex items-center justify-center max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
          <button
            onClick={onBack}
            className="absolute left-0 p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#1C1C1C]" />
          </button>
          <h1 className="font-medium text-[19px] text-[#1C1C1C]">Review & Pay</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-[#D9DEE2] px-4 py-3">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto flex items-center gap-2">
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
        </div>
        <p className="text-xs text-[#8AA4B1] mt-2 text-center">Step 4 of 4</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-5">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto space-y-4">

          {/* Appointment Summary */}
          <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
            <h2 className="font-semibold text-sm text-[#8AA4B1] uppercase tracking-wider mb-4">
              Appointment Details
            </h2>

            {/* Service */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-[#1E6E97]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1C1C1C]">{service.name}</p>
                <p className="text-sm text-[#6A7279]">{service.duration}</p>
              </div>
            </div>

            {/* Staff */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E8F4F8] flex-shrink-0">
                {staff.avatar ? (
                  <ImageWithFallback src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#1E6E97]" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1C1C1C]">{staff.name}</p>
                <p className="text-sm text-[#6A7279]">{staff.role}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#1E6E97]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1C1C1C]">{selectedDate}</p>
                <p className="text-sm text-[#6A7279]">{selectedTime}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#1E6E97]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1C1C1C]">DentaCare Pro Clinic</p>
                <p className="text-sm text-[#6A7279]">Mar Roukoz, Beirut</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
            <h2 className="font-semibold text-sm text-[#8AA4B1] uppercase tracking-wider mb-4">
              Payment Method
            </h2>

            <button
              onClick={() => setShowPaymentOptions(!showPaymentOptions)}
              className="w-full flex items-center justify-between p-3 bg-[#F0F3F5] rounded-[12px] mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  {paymentMethod === 'card' && <CreditCard className="w-4 h-4 text-[#1E6E97]" />}
                  {paymentMethod === 'whish' && <Wallet className="w-4 h-4 text-[#1E6E97]" />}
                </div>
                <span className="font-medium text-[#1C1C1C]">
                  {paymentMethod === 'card' && 'Credit / Debit Card'}
                  {paymentMethod === 'whish' && 'Whish Money'}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#8AA4B1] transition-transform ${showPaymentOptions ? 'rotate-180' : ''}`} />
            </button>

            {showPaymentOptions && (
              <div className="space-y-2 mb-3">
                {[
                  { id: 'card' as const, label: 'Credit / Debit Card', icon: <CreditCard className="w-4 h-4 text-[#6A7279]" /> },
                  { id: 'whish' as const, label: 'Whish Money', icon: <Wallet className="w-4 h-4 text-[#6A7279]" /> },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id);
                      setShowPaymentOptions(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-[12px] transition-colors ${
                      paymentMethod === method.id
                        ? 'bg-[#E8F4F8] border border-[#1E6E97]'
                        : 'bg-white border border-[#D9DEE2] hover:bg-[#F0F3F5]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F0F3F5] flex items-center justify-center">
                      {method.icon}
                    </div>
                    <span className="text-[#1C1C1C] font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-[#F0F3F5] rounded-[12px] p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-gradient-to-r from-[#1A1F71] to-[#2D3AAF] rounded flex items-center justify-center">
                    <span className="text-white text-[9px] font-medium tracking-wider">VISA</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1C1C1C]">**** **** **** 4242</p>
                    <p className="text-xs text-[#8AA4B1]">Expires 12/27</p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'whish' && (
              <div className="bg-[#F0F3F5] rounded-[12px] p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded flex items-center justify-center">
                    <span className="text-white text-[8px] font-semibold tracking-wider">WHISH</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1C1C1C]">Whish Money Wallet</p>
                    <p className="text-xs text-[#8AA4B1]">Pay via Whish app</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
            <h2 className="font-semibold text-sm text-[#8AA4B1] uppercase tracking-wider mb-4">
              Price Summary
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#6A7279]">{service.name}</span>
                <span className="font-medium text-[#1C1C1C]">${consultationFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6A7279]">Tax (11%)</span>
                <span className="font-medium text-[#1C1C1C]">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#D9DEE2] pt-3 flex items-center justify-between">
                <span className="font-semibold text-[#1C1C1C]">Total</span>
                <span className="font-semibold text-[#1E6E97] text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-[#FFF8F0] border border-[#F5DEB8] rounded-[16px] p-4">
            <p className="text-xs text-[#9A7B4F]">
              <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before your appointment.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-[#D9DEE2] px-4 py-4 sticky bottom-[85px]">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
          <button
            onClick={handleConfirmAndPay}
            disabled={isProcessing}
            className={`w-full py-4 rounded-[24px] font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              isProcessing
                ? 'bg-[#8AA4B1] cursor-not-allowed'
                : 'bg-[#1E6E97] hover:bg-[#175A7A]'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              `Confirm & Pay $${total.toFixed(2)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}