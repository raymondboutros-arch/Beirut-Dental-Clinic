import { ArrowLeft, RotateCcw } from 'lucide-react';
import { PatientHeader } from './PatientHeader';
import { ToothChart } from './ToothChart';
import { JsonPreview } from './JsonPreview';

interface BridgeGroup {
  id: string;
  teeth: { toothNumber: number; role: 'abutment' | 'pontic'; treatmentId: string }[];
  createdAt: string;
}

interface TreatmentDashboardProps {
  selectedTeeth: number[];
  savedTeeth: number[];
  activeTooth?: number;
  savedPayload: any;
  bridgeGroups?: Record<string, BridgeGroup>;
  teethData?: Record<number, any[]>;
  onToothToggle: (toothNumber: number) => void;
  onClearAll: () => void;
  onBack: () => void;
}

export function TreatmentDashboard({
  selectedTeeth,
  savedTeeth,
  activeTooth,
  savedPayload,
  bridgeGroups = {},
  teethData = {},
  onToothToggle,
  onClearAll,
  onBack,
}: TreatmentDashboardProps) {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-[100px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-5 md:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto flex items-center justify-between">
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
      <div className="px-5 md:px-8 py-5 max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
        <PatientHeader />

        {/* Main content: side-by-side on tablet */}
        <div className="md:flex md:gap-6">
          {/* Left column: Tooth Chart */}
          <div className="md:flex-1 md:min-w-0">
            {/* Tooth Chart */}
            <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4 md:p-6 mb-4">
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
                bridgeGroups={bridgeGroups}
              />
            </div>

            {/* Bridge Groups Summary */}
            {Object.keys(bridgeGroups).length > 0 && (
              <div className="bg-white border border-amber-200 rounded-[16px] p-4 mb-4">
                <h2 className="font-semibold text-[#1C1C1C] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  Bridges
                </h2>
                <div className="space-y-2">
                  {Object.values(bridgeGroups).map(group => {
                    const sorted = [...group.teeth].sort((a, b) => a.toothNumber - b.toothNumber);
                    const firstAbutment = sorted.find(t => t.role === 'abutment');
                    return (
                      <button
                        key={group.id}
                        onClick={() => firstAbutment && onToothToggle(firstAbutment.toothNumber)}
                        className="w-full flex items-center justify-between bg-amber-50 rounded-xl px-4 py-3 hover:bg-amber-100 transition-colors border border-amber-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-1">
                            {sorted.map(t => (
                              <div
                                key={t.toothNumber}
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white ${
                                  t.role === 'abutment' ? 'bg-amber-500 text-white' : 'bg-amber-200 text-amber-700'
                                }`}
                              >
                                {t.toothNumber}
                              </div>
                            ))}
                          </div>
                          <span className="text-amber-800 font-medium text-sm">
                            {sorted.length}-unit Bridge
                          </span>
                        </div>
                        <span className="text-xs text-amber-600 font-medium">View</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right column: Summary */}
          <div className="md:w-[280px] lg:w-[320px] md:flex-shrink-0">
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
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          bridgeGroups && Object.values(bridgeGroups).some(g => g.teeth.some(t => t.toothNumber === tooth))
                            ? 'bg-amber-500'
                            : 'bg-[#1E6E97]'
                        }`}>
                          <span className="text-white text-sm font-medium">{tooth}</span>
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-[#1C1C1C] font-medium">Tooth #{tooth}</span>
                          {bridgeGroups && Object.values(bridgeGroups).some(g => g.teeth.some(t => t.toothNumber === tooth)) && (
                            <span className="text-[10px] text-amber-600">Bridge</span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-[#1E6E97] font-medium">View</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* JSON Preview FAB */}
      <JsonPreview data={savedPayload} hasData={savedTeeth.length > 0} />
    </div>
  );
}
