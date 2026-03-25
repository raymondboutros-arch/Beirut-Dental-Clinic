import { Button } from './ui/button';

interface BridgeTooth {
  toothNumber: number;
  role: 'abutment' | 'pontic';
}

interface BridgeToothSelectorProps {
  currentToothNumber: number;
  selectedTeeth: BridgeTooth[];
  onSelectionChange: (teeth: BridgeTooth[]) => void;
  existingSavedTeeth?: number[];
}

const UPPER_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

export type { BridgeTooth };

export function BridgeToothSelector({
  currentToothNumber,
  selectedTeeth,
  onSelectionChange,
  existingSavedTeeth = [],
}: BridgeToothSelectorProps) {
  const isSelected = (tooth: number) => selectedTeeth.some(t => t.toothNumber === tooth);
  const getRole = (tooth: number) => selectedTeeth.find(t => t.toothNumber === tooth)?.role;

  const handleToothClick = (tooth: number) => {
    if (tooth === currentToothNumber) return; // Can't remove the origin tooth
    if (isSelected(tooth)) {
      // Remove tooth
      onSelectionChange(selectedTeeth.filter(t => t.toothNumber !== tooth));
    } else {
      // Add tooth as abutment by default
      onSelectionChange([...selectedTeeth, { toothNumber: tooth, role: 'abutment' }]);
    }
  };

  const toggleRole = (tooth: number) => {
    onSelectionChange(
      selectedTeeth.map(t =>
        t.toothNumber === tooth
          ? { ...t, role: t.role === 'abutment' ? 'pontic' : 'abutment' }
          : t
      )
    );
  };

  const sortedSelection = [...selectedTeeth].sort((a, b) => {
    // Sort by physical position: upper right to left, then lower left to right
    const order = [...UPPER_TEETH, ...LOWER_TEETH];
    return order.indexOf(a.toothNumber) - order.indexOf(b.toothNumber);
  });

  const unitCount = selectedTeeth.length;

  const renderToothRow = (teeth: number[], label: string) => (
    <div className="space-y-1">
      <span className="text-[10px] text-gray-400 font-medium">{label}</span>
      <div className="flex flex-wrap gap-[3px]">
        {teeth.map(tooth => {
          const selected = isSelected(tooth);
          const role = getRole(tooth);
          const isCurrent = tooth === currentToothNumber;
          const hasTreatment = existingSavedTeeth.includes(tooth) && !selected;

          return (
            <button
              key={tooth}
              type="button"
              onClick={() => handleToothClick(tooth)}
              className={`
                relative w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-md text-[10px] md:text-xs font-semibold
                transition-all duration-150 border
                ${isCurrent
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : selected && role === 'abutment'
                  ? 'bg-amber-100 text-amber-800 border-amber-400'
                  : selected && role === 'pontic'
                  ? 'bg-amber-50 text-amber-600 border-amber-300 border-dashed'
                  : hasTreatment
                  ? 'bg-indigo-50 text-indigo-400 border-indigo-200 hover:border-amber-300 hover:bg-amber-50'
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                }
              `}
            >
              {tooth}
              {hasTreatment && !selected && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Teeth in Bridge</span>
        <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
          {unitCount} {unitCount === 1 ? 'unit' : 'units'}
        </span>
      </div>

      <p className="text-[11px] text-gray-400">
        Tap teeth to add/remove. Tooth {currentToothNumber} is the origin.
      </p>

      {/* Tooth rows */}
      {renderToothRow(UPPER_TEETH, 'UPPER')}
      {renderToothRow(LOWER_TEETH, 'LOWER')}

      {/* Role assignment */}
      {selectedTeeth.length > 1 && (
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <span className="text-xs font-semibold text-gray-600">Assign Roles</span>
          <p className="text-[11px] text-gray-400">Tap a role to toggle between Abutment and Pontic</p>
          <div className="flex flex-wrap gap-1.5">
            {sortedSelection.map(t => (
              <button
                key={t.toothNumber}
                type="button"
                onClick={() => toggleRole(t.toothNumber)}
                className={`
                  flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                  transition-all border
                  ${t.role === 'abutment'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-amber-50 text-amber-600 border-amber-200 border-dashed'
                  }
                `}
              >
                <span className="font-bold">{t.toothNumber}</span>
                <span className={`text-[10px] px-1 py-0.5 rounded ${
                  t.role === 'abutment' ? 'bg-amber-200/60' : 'bg-amber-100/60'
                }`}>
                  {t.role === 'abutment' ? 'A' : 'P'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary line */}
      {selectedTeeth.length > 1 && (
        <div className="text-xs text-gray-500 bg-white rounded-lg px-3 py-2 border border-gray-100">
          <span className="font-medium text-gray-700">Bridge: </span>
          {sortedSelection.map((t, i) => (
            <span key={t.toothNumber}>
              {i > 0 && ' – '}
              <span className={t.role === 'abutment' ? 'font-semibold text-amber-700' : 'text-amber-500'}>
                {t.toothNumber}
              </span>
              <span className="text-gray-400">({t.role === 'abutment' ? 'A' : 'P'})</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
