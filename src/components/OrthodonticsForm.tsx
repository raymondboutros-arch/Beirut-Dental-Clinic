import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface OrthodonticsFields {
  [key: string]: string | string[];
}

const ORTHO_SUB_CATEGORIES = [
  'Fixed Braces',
  'Clear Aligners',
  'Retainer',
  'Appliance',
  'Ortho Adjustment',
] as const;

export type OrthoSubCategory = (typeof ORTHO_SUB_CATEGORIES)[number];

interface PillFieldDef { key: string; label: string; options: string[]; multi?: boolean; }
interface DropdownFieldDef { key: string; label: string; options: string[]; type: 'dropdown'; }
type FieldDef = PillFieldDef | DropdownFieldDef;

function getFieldsForSubCategory(sub: OrthoSubCategory, fields: OrthodonticsFields): FieldDef[] {
  switch (sub) {
    case 'Fixed Braces':
      return [
        { key: 'bracketType', label: 'Bracket Type', options: ['Metal (Conventional)', 'Metal (Self-Ligating / Damon)', 'Ceramic (Clear)', 'Ceramic (Self-Ligating)', 'Lingual'] },
        { key: 'slotSize', label: 'Slot Size', options: ['0.018"', '0.022"'] },
        { key: 'prescription', label: 'Prescription', options: ['MBT', 'Roth', 'Alexander', 'Damon', 'Custom'] },
        { key: 'arch', label: 'Arch', options: ['Upper Only', 'Lower Only', 'Both Arches'] },
        { key: 'wireType', label: 'Wire Type', type: 'dropdown', options: ['NiTi (Superelastic)', 'CuNiTi (Heat-Activated)', 'Stainless Steel (SS)', 'TMA (Beta-Titanium)', 'Multistranded SS'] },
        { key: 'wireSize', label: 'Wire Size', type: 'dropdown', options: ['0.012" Round', '0.014" Round', '0.016" Round', '0.018" Round', '0.016 x 0.022" Rect', '0.016 x 0.025" Rect', '0.017 x 0.025" Rect', '0.018 x 0.025" Rect', '0.019 x 0.025" Rect', '0.021 x 0.025" Rect'] },
        { key: 'auxiliaries', label: 'Auxiliaries', options: ['Elastic Chain (Power Chain)', 'Open Coil Spring', 'NiTi Closing Coil', 'Elastic Bands (Class II)', 'Elastic Bands (Class III)', 'Elastic Bands (Vertical)', 'Hooks', 'Kobayashi Ties', 'Laceback Ligatures', 'TADs / Mini-screws', 'Transpalatal Arch (TPA)', 'Nance Button'], multi: true },
        { key: 'phase', label: 'Treatment Phase', options: ['Initial Alignment', 'Leveling', 'Space Closure', 'Finishing & Detailing', 'Retention'] },
        { key: 'duration', label: 'Estimated Duration', type: 'dropdown', options: ['6 months', '12 months', '18 months', '24 months', '30+ months'] },
      ];
    case 'Clear Aligners':
      return [
        { key: 'alignerSystem', label: 'System', options: ['Invisalign', 'ClearCorrect', 'SureSmile', 'Spark', 'In-House (3D Printed)', 'Other'] },
        { key: 'package', label: 'Package (if Invisalign)', options: ['Lite (14 aligners)', 'Moderate (26)', 'Comprehensive (unlimited)', 'Express (7)', 'First (Teens)', 'Go'] },
        { key: 'arch', label: 'Arch', options: ['Upper Only', 'Lower Only', 'Both Arches'] },
        { key: 'attachments', label: 'Attachments', options: ['Yes', 'No'] },
        { key: 'ipr', label: 'IPR (Interproximal Reduction)', options: ['Yes', 'No'] },
        { key: 'numAligners', label: 'Number of Aligners', type: 'dropdown', options: ['7', '14', '21', '28', '35', '42', '56+'] },
        { key: 'currentAligner', label: 'Current Aligner', type: 'dropdown', options: Array.from({ length: 56 }, (_, i) => String(i + 1)) },
        { key: 'duration', label: 'Estimated Duration', type: 'dropdown', options: ['3 months', '6 months', '9 months', '12 months', '18+ months'] },
      ];
    case 'Retainer':
      return [
        { key: 'retainerType', label: 'Retainer Type', options: ['Fixed Wire (Bonded)', 'Essix (Clear)', 'Hawley (Acrylic + Wire)', 'Vivera (Invisalign)'] },
        { key: 'arch', label: 'Arch', options: ['Upper', 'Lower', 'Both'] },
        { key: 'wearSchedule', label: 'Wear Schedule', options: ['Full-Time (22 hrs/day)', 'Nights Only', 'Alternate Nights'] },
      ];
    case 'Appliance':
      return [
        { key: 'applianceType', label: 'Appliance Type', options: ['Palatal Expander (RPE/Hyrax)', 'Quad Helix', 'Transpalatal Arch (TPA)', 'Nance Holding Arch', 'Lower Lingual Holding Arch', 'Space Maintainer', 'Habit Breaker (Crib)', 'Headgear', 'Herbst', 'Twin Block', 'Forsus', 'Pendulum'] },
        { key: 'arch', label: 'Arch', options: ['Upper', 'Lower', 'Both'] },
      ];
    case 'Ortho Adjustment':
      return [
        { key: 'visitType', label: 'Visit Type', options: ['Wire Change', 'Elastic Change', 'Bracket Reposition/Rebond', 'Aligner Check & Distribute', 'Power Chain Placement', 'Debonding (Braces Removal)', 'Emergency (Broken bracket/wire)'] },
        { key: 'wireSize', label: 'Wire Size (if Wire Change)', type: 'dropdown', options: ['N/A', '0.012" NiTi', '0.014" NiTi', '0.016" NiTi', '0.018" NiTi', '0.016x0.022" NiTi', '0.017x0.025" NiTi', '0.016" SS', '0.016x0.022" SS', '0.017x0.025" SS', '0.019x0.025" SS', '0.016x0.022" TMA', '0.017x0.025" TMA'] },
        { key: 'photos', label: 'Progress Photos Taken', options: ['Yes', 'No'] },
      ];
    default:
      return [];
  }
}

// ── Form ──
interface OrthodonticsFormProps {
  subCategory: OrthoSubCategory;
  fields: OrthodonticsFields;
  onSubCategoryChange: (sub: OrthoSubCategory) => void;
  onFieldChange: (key: string, value: string | string[]) => void;
}

export function OrthodonticsForm({ subCategory, fields, onSubCategoryChange, onFieldChange }: OrthodonticsFormProps) {
  const fieldDefs = getFieldsForSubCategory(subCategory, fields);

  const toggleMultiValue = (key: string, value: string) => {
    const current = (fields[key] as string[] | undefined) || [];
    if (current.includes(value)) {
      onFieldChange(key, current.filter(v => v !== value));
    } else {
      onFieldChange(key, [...current, value]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-700">Sub-Category</Label>
        <Select value={subCategory} onValueChange={(v) => onSubCategoryChange(v as OrthoSubCategory)}>
          <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 max-h-[260px]">
            {ORTHO_SUB_CATEGORIES.map(sc => (
              <SelectItem key={sc} value={sc}>{sc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {fieldDefs.map((def) => {
        if ('type' in def && def.type === 'dropdown') {
          return (
            <div key={def.key} className="space-y-2">
              <Label className="text-gray-700">{def.label}</Label>
              <Select value={(fields[def.key] as string) || ''} onValueChange={(v) => onFieldChange(def.key, v)}>
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue placeholder={`Select ${def.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 max-h-[200px]">
                  {def.options.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }

        if (def.multi) {
          const selected = (fields[def.key] as string[] | undefined) || [];
          return (
            <div key={def.key} className="space-y-2">
              <Label className="text-gray-700">{def.label}</Label>
              <div className="space-y-2">
                {def.options.map(opt => (
                  <div key={opt} className="flex items-center gap-2">
                    <Checkbox
                      id={`ortho-${def.key}-${opt}`}
                      checked={selected.includes(opt)}
                      onCheckedChange={() => toggleMultiValue(def.key, opt)}
                      className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                    />
                    <Label htmlFor={`ortho-${def.key}-${opt}`} className="text-gray-700 cursor-pointer text-sm">{opt}</Label>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        const currentValue = (fields[def.key] as string) || '';
        return (
          <div key={def.key} className="space-y-2">
            <Label className="text-gray-700">{def.label}</Label>
            <div className="flex flex-wrap gap-2">
              {def.options.map(opt => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onFieldChange(def.key, opt)}
                  className={`text-xs ${currentValue === opt ? 'bg-[#6366F1] text-white border-[#6366F1] hover:bg-[#5558E3] hover:text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Preview ──
interface OrthodonticsPreviewProps { subCategory: OrthoSubCategory; fields: OrthodonticsFields; }

export function OrthodonticsPreview({ subCategory, fields }: OrthodonticsPreviewProps) {
  const fieldDefs = getFieldsForSubCategory(subCategory, fields);
  return (
    <div className="space-y-3">
      <div>
        <Label className="text-gray-500 text-xs">Sub-Category</Label>
        <p className="text-gray-900 mt-1">{subCategory}</p>
      </div>
      {fieldDefs.map(def => {
        const value = fields[def.key];
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
          <div key={def.key}>
            <Label className="text-gray-500 text-xs">{def.label}</Label>
            <p className="text-gray-900 mt-1 text-sm">{Array.isArray(value) ? value.join(', ') : value}</p>
          </div>
        );
      })}
    </div>
  );
}

export { ORTHO_SUB_CATEGORIES };
