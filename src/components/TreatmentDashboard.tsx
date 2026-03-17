import { ArrowLeft, RotateCcw } from 'lucide-react';
import { PatientHeader } from './PatientHeader';
import { ToothChart } from './ToothChart';
import { JsonPreview } from './JsonPreview';

interface TreatmentDashboardProps {
  selectedTeeth: number[];
  savedTeeth: number[];
  activeTooth?: number;
  savedPayload: any;
  onToothToggle: (toothNumber: number) => void;
  onClearAll: () => void;
  onBack: () => void;
}

export function TreatmentDashboard({
  selectedTeeth,
  savedTeeth,
  activeTooth,
  savedPayload,
  onToothToggle,
  onClearAll,
  onBack,
}: TreatmentDashboardProps) {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-[100px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-5 py-4 sticky top-0 z-10">
        <div className="max-w-[430px] mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#1C1C1C]" />
          </button>
          <h1 className="font-medium text-[19px] text-[#1C1C1C]">Treatment Plan</h1>
          <button
            onClick={onClearAll}
            className="p-2 -mr-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5 text-[#8AA4B1]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5 max-w-[430px] mx-auto">
        <PatientHeader />

        {/* Tooth Chart */}
        <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[#1C1C1C]">Select a Tooth</h2>
            {savedTeeth.length > 0 && (
              <span className="bg-[#1E6E97] text-white text-xs px-2.5 py-1 rounded-full font-medium">
                {savedTeeth.length} treated
              </span>
            )}
          </div>
          <ToothChart
            selectedTeeth={savedTeeth}
            activeTooth={activeTooth}
            onToothToggle={onToothToggle}
          />
        </div>

        {/* Summary */}
        {savedTeeth.length > 0 && (
          <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
            <h2 className="font-semibold text-[#1C1C1C] mb-3">Treatment Summary</h2>
            <div className="space-y-2">
              {savedTeeth.sort((a, b) => a - b).map((tooth) => (
                <button
                  key={tooth}
                  onClick={() => onToothToggle(tooth)}
                  className="w-full flex items-center justify-between bg-[#F0F3F5] rounded-xl px-4 py-3 hover:bg-[#E8F4F8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1E6E97] flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{tooth}</span>
                    </div>
                    <span className="text-[#1C1C1C] font-medium">Tooth #{tooth}</span>
                  </div>
                  <span className="text-xs text-[#1E6E97] font-medium">View</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* JSON Preview FAB */}
      <JsonPreview data={savedPayload} hasData={savedTeeth.length > 0} />
    </div>
  );
}
