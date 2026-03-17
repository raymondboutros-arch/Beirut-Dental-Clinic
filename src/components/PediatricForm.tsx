import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface PediatricFields {
  [key: string]: string | string[];
}

const PEDO_SUB_CATEGORIES = [
  'Pit & Fissure Sealant',
  'Fluoride Treatment',
  'Stainless Steel Crown (SSC)',
  'Pulp Therapy (Primary)',
  'Primary Tooth Extraction',
  'Space Maintainer',
  'Habit Breaker',
  'Silver Diamine Fluoride (SDF)',
  'Strip Crown',
] as const;

export type PedoSubCategory = (typeof PEDO_SUB_CATEGORIES)[number];

interface PillFieldDef { key: string; label: string; options: string[]; multi?: boolean; }
interface DropdownFieldDef { key: string; label: string; options: string[]; type: 'dropdown'; }
type FieldDef = PillFieldDef | DropdownFieldDef;

function getFieldsForSubCategory(sub: PedoSubCategory): FieldDef[] {
  switch (sub) {
    case 'Pit & Fissure Sealant':
      return [
        { key: 'sealantMaterial', label: 'Material', options: ['Resin-Based', 'Glass Ionomer (GIC)'] },
        { key: 'sealantTeeth', label: 'Teeth', options: ['First Permanent Molars (6s)', 'Second Permanent Molars (7s)', 'Premolars', 'Primary Molars (Ds/Es)'], multi: true },
        { key: 'numTeeth', label: 'Number of Teeth', type: 'dropdown', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
      ];
    case 'Fluoride Treatment':
      return [
        { key: 'fluorideType', label: 'Type', options: ['Fluoride Varnish (NaF 5%)', 'APF Gel (Acidulated Phosphate)', 'Stannous Fluoride Foam', 'Fluoride Rinse'] },
        { key: 'fluorideApp', label: 'Application', options: ['Full Mouth', 'Selective (High-Risk Teeth)'] },
        { key: 'fluorideFreq', label: 'Frequency', options: ['Every 3 months', 'Every 6 months', 'Annually'] },
      ];
    case 'Stainless Steel Crown (SSC)':
      return [
        { key: 'sscType', label: 'Crown Type', options: ['Standard SSC', 'Pre-Veneered (Aesthetic)', 'Hall Technique (No Prep)'] },
        { key: 'sscToothType', label: 'Tooth Type', options: ['Primary Molar (D/E)', 'Primary Anterior (Strip Crown)', 'Permanent Molar (Hypoplastic)'] },
        { key: 'sscSize', label: 'Size', type: 'dropdown', options: ['2', '3', '4', '5', '6', '7'] },
        { key: 'sscCement', label: 'Cementation', options: ['GIC Cement', 'RMGIC', 'Zinc Phosphate'] },
      ];
    case 'Pulp Therapy (Primary)':
      return [
        { key: 'pulpProc', label: 'Procedure', options: ['Indirect Pulp Cap', 'Direct Pulp Cap', 'Pulpotomy', 'Pulpectomy'] },
        { key: 'pulpMed', label: 'Medicament', options: ['MTA', 'Formocresol', 'Ferric Sulfate', 'Biodentine', 'Calcium Hydroxide'] },
        { key: 'pulpObt', label: 'Obturation (if Pulpectomy)', options: ['N/A', 'ZOE (Zinc Oxide Eugenol)', 'Vitapex', 'Calcium Hydroxide Paste', 'Metapex'] },
        { key: 'pulpRestore', label: 'Restoration Planned', options: ['SSC', 'Composite', 'Strip Crown', 'GIC'] },
      ];
    case 'Primary Tooth Extraction':
      return [
        { key: 'exReason', label: 'Reason', options: ['Caries (Non-restorable)', 'Orthodontic', 'Mobility (Over-retained)', 'Trauma', 'Abscess/Infection', 'Ectopic Eruption'] },
        { key: 'exAnesthesia', label: 'Anesthesia', options: ['Local Infiltration', 'Topical Only', 'Sedation (Nitrous Oxide)', 'Sedation (IV)', 'General Anesthesia'] },
        { key: 'spaceMaint', label: 'Space Maintainer Needed', options: ['Yes', 'No', 'Evaluate Later'] },
        { key: 'behavior', label: 'Behavior Management', options: ['Tell-Show-Do', 'Voice Control', 'Nitrous Oxide', 'Protective Stabilization', 'Sedation', 'None Required'] },
      ];
    case 'Space Maintainer':
      return [
        { key: 'smType', label: 'Type', options: ['Band & Loop', 'Nance Holding Arch', 'Transpalatal Arch (TPA)', 'Lower Lingual Holding Arch', 'Distal Shoe'] },
        { key: 'smLocation', label: 'Location', options: ['Upper Right', 'Upper Left', 'Lower Right', 'Lower Left', 'Bilateral Upper', 'Bilateral Lower'] },
        { key: 'smMissing', label: 'Missing Tooth (Primary Letter)', type: 'dropdown', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'] },
      ];
    case 'Habit Breaker':
      return [
        { key: 'habit', label: 'Habit', options: ['Thumb/Finger Sucking', 'Tongue Thrust', 'Mouth Breathing', 'Lip Biting/Sucking', 'Bruxism', 'Nail Biting'] },
        { key: 'habitApp', label: 'Appliance', options: ['Fixed Palatal Crib', 'Removable Appliance', 'Bluegrass Roller', 'Tongue Trainer (Myofunctional)', 'Lip Bumper'] },
        { key: 'habitDuration', label: 'Duration', type: 'dropdown', options: ['3 months', '6 months', '9 months', '12 months', 'Until habit stops'] },
      ];
    case 'Silver Diamine Fluoride (SDF)':
      return [
        { key: 'sdfConc', label: 'Concentration', options: ['38% SDF (Standard)', '12% SDF'] },
        { key: 'sdfApp', label: 'Application', options: ['Single Tooth', 'Multiple Teeth'] },
        { key: 'sdfNum', label: 'Number of Teeth', type: 'dropdown', options: ['1', '2', '3', '4', '5+'] },
        { key: 'sdfFollowUp', label: 'Follow-Up Plan', options: ['Reapply in 2 weeks', 'Reapply in 6 months', 'GIC Cover', 'Composite Cover', 'Monitor'] },
        { key: 'sdfConsent', label: 'Staining Consent', options: ['Informed consent obtained', 'Parent declined (cosmetic concern)'] },
      ];
    case 'Strip Crown':
      return [
        { key: 'stripMat', label: 'Material', options: ['Composite (Resin)', 'Zirconia (Pre-fabricated)'] },
        { key: 'stripShade', label: 'Shade', type: 'dropdown', options: ['A1', 'A2', 'A3', 'B1', 'Universal', 'Bleach'] },
        { key: 'stripTooth', label: 'Tooth Type', options: ['Primary Central Incisor', 'Primary Lateral Incisor', 'Primary Canine'] },
      ];
    default:
      return [];
  }
}

// ── Form ──
interface PediatricFormProps {
  subCategory: PedoSubCategory;
  fields: PediatricFields;
  onSubCategoryChange: (sub: PedoSubCategory) => void;
  onFieldChange: (key: string, value: string | string[]) => void;
}

export function PediatricForm({ subCategory, fields, onSubCategoryChange, onFieldChange }: PediatricFormProps) {
  const fieldDefs = getFieldsForSubCategory(subCategory);

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
        <Select value={subCategory} onValueChange={(v) => onSubCategoryChange(v as PedoSubCategory)}>
          <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 max-h-[260px]">
            {PEDO_SUB_CATEGORIES.map(sc => (
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
                      id={`pedo-${def.key}-${opt}`}
                      checked={selected.includes(opt)}
                      onCheckedChange={() => toggleMultiValue(def.key, opt)}
                      className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                    />
                    <Label htmlFor={`pedo-${def.key}-${opt}`} className="text-gray-700 cursor-pointer text-sm">{opt}</Label>
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
interface PediatricPreviewProps { subCategory: PedoSubCategory; fields: PediatricFields; }

export function PediatricPreview({ subCategory, fields }: PediatricPreviewProps) {
  const fieldDefs = getFieldsForSubCategory(subCategory);
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

export { PEDO_SUB_CATEGORIES };
