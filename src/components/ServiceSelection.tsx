import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
}

interface ServiceCategory {
  title: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: 'Consultation',
    services: [
      { id: 'general-checkup', name: 'General Checkup', description: '30 min • Comprehensive examination' },
      { id: 'cavities', name: 'Cavities Consultation', description: '20 min • Assessment & treatment plan' },
      { id: 'implant', name: 'Implant Consultation', description: '45 min • 3D imaging & planning' },
      { id: 'veneers', name: 'Veneers Consultation', description: '30 min • Smile design preview' },
      { id: 'tmj', name: 'TMJ Assessment', description: '40 min • Joint evaluation' },
      { id: 'whitening', name: 'Teeth Whitening', description: '60 min • Professional bleaching' },
    ],
  },
  {
    title: 'Cleaning & Prevention',
    services: [
      { id: 'detartrage', name: 'Detartrage (Scaling)', description: '45 min • Deep cleaning procedure' },
      { id: 'fluoride', name: 'Fluoride Treatment', description: '15 min • Enamel protection' },
    ],
  },
];

interface ServiceSelectionProps {
  onBack: () => void;
  onContinue: (selectedService: string) => void;
}

export function ServiceSelection({ onBack, onContinue }: ServiceSelectionProps) {
  const [selectedService, setSelectedService] = useState<string>('');

  const handleContinue = () => {
    if (selectedService) {
      onContinue(selectedService);
    }
  };

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
          <h1 className="font-medium text-[19px] text-[#1C1C1C]">Select Services</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-[#D9DEE2] px-4 py-3">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto flex items-center gap-2">
          <div className="flex-1 h-[3px] bg-[#1E6E97] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#D9DEE2] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#D9DEE2] rounded-full" />
          <div className="flex-1 h-[3px] bg-[#D9DEE2] rounded-full" />
        </div>
        <p className="text-xs text-[#8AA4B1] mt-2 text-center">Step 1 of 4</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto space-y-[36px]">
          {serviceCategories.map((category) => (
            <div key={category.title}>
              {/* Category Title */}
              <h2 className="font-semibold text-[#1C1C1C] mb-4">
                {category.title}
              </h2>

              {/* Service Cards */}
              <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                {category.services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className="w-full bg-white border border-[#D9DEE2] rounded-[16px] p-4 flex items-center justify-between hover:border-[#1E6E97] transition-colors"
                  >
                    <div className="flex-1 text-left pr-4">
                      <div className="font-medium text-[#1C1C1C] mb-1">
                        {service.name}
                      </div>
                      <div className="text-sm text-[#6A7279]">
                        {service.description}
                      </div>
                    </div>

                    {/* Radio Button */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                          selectedService === service.id
                            ? 'border-[#1E6E97] bg-[#1E6E97]'
                            : 'border-[#8AA4B1] bg-white'
                        }`}
                      >
                        {selectedService === service.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-[#D9DEE2] px-4 py-4 sticky bottom-[85px]">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedService}
            className={`w-full py-4 rounded-[24px] font-semibold text-white transition-all ${
              selectedService
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