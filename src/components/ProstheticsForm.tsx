import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { BridgeToothSelector, type BridgeTooth } from './BridgeToothSelector';

export interface ProstheticsFields {
  [key: string]: string | string[];
}

const PROSTH_SUB_CATEGORIES = [
  // Fixed
  'Single Crown',
  'Bridge',
  'Veneer',
  'Inlay / Onlay',
  // Removable
  'Complete Denture',
  'Partial Denture',
  'Overdenture (Implant-Supported)',
  // Post & Core
  'Post & Core',
] as const;

export type ProsthSubCategory = (typeof PROSTH_SUB_CATEGORIES)[number];

// ── helpers ──────────────────────────────────────────────

interface PillFieldDef {
  key: string;
  label: string;
  options: string[];
  multi?: boolean;
}

interface DropdownFieldDef {
  key: string;
  label: string;
  options: string[];
  type: 'dropdown';
}

interface InputFieldDef {
  key: string;
  label: string;
  type: 'input';
  placeholder: string;
}

type FieldDef = PillFieldDef | DropdownFieldDef | InputFieldDef;

function getFieldsForSubCategory(sub: ProsthSubCategory): FieldDef[] {
  switch (sub) {
    case 'Single Crown':
      return [
        { key: 'crownType', label: 'Crown Type', options: ['Definitive', 'Provisional (Temporary)'] },
        { key: 'material', label: 'Material', options: ['Zirconia (Monolithic)', 'Zirconia (Layered / Veneered)', 'Lithium Disilicate (E.max)', 'Porcelain-Fused-to-Metal (PFM)', 'Full Metal (Gold)', 'Full Metal (Base Metal)', 'PMMA (Provisional)', 'Composite (Provisional)'] },
        { key: 'preparationType', label: 'Preparation Type', options: ['Full Coverage', 'Partial Coverage (3/4 Crown)', 'Endocrown'] },
        { key: 'cementationType', label: 'Cementation', options: ['Conventional Cement (GIC / RMGIC)', 'Adhesive (Resin Cement)', 'Self-Adhesive Resin Cement', 'Temporary Cement'] },
        { key: 'shade', label: 'Shade', type: 'input', placeholder: 'e.g. A2, BL1, OM1' },
        { key: 'impressionMethod', label: 'Impression Method', options: ['Digital (Intraoral Scanner)', 'Conventional (PVS / Polyether)', 'Alginate'] },
      ];
    case 'Bridge':
      return [
        { key: 'bridgeType', label: 'Bridge Type', options: ['Traditional (Fixed-Fixed)', 'Cantilever', 'Maryland (Resin-Bonded)', 'Implant-Supported'] },
        { key: 'material', label: 'Material', options: ['Zirconia (Monolithic)', 'Zirconia (Layered / Veneered)', 'Lithium Disilicate (E.max)', 'Porcelain-Fused-to-Metal (PFM)', 'Full Metal (Gold)', 'Full Metal (Base Metal)', 'PMMA (Provisional)'] },
        // numberOfUnits, abutmentTeeth, ponticTeeth are handled by the BridgeToothSelector
        { key: 'ponticDesign', label: 'Pontic Design', options: ['Ovate', 'Modified Ridge Lap', 'Sanitary (Hygienic)', 'Conical'] },
        { key: 'cementationType', label: 'Cementation', options: ['Conventional Cement (GIC / RMGIC)', 'Adhesive (Resin Cement)', 'Self-Adhesive Resin Cement', 'Temporary Cement'] },
        { key: 'shade', label: 'Shade', type: 'input', placeholder: 'e.g. A2, BL1, OM1' },
        { key: 'impressionMethod', label: 'Impression Method', options: ['Digital (Intraoral Scanner)', 'Conventional (PVS / Polyether)', 'Alginate'] },
      ];
    case 'Veneer':
      return [
        { key: 'veneerType', label: 'Veneer Type', options: ['Conventional (With Prep)', 'Minimal Prep', 'No-Prep (Contact Lens Veneer)'] },
        { key: 'material', label: 'Material', options: ['Feldspathic Porcelain', 'Lithium Disilicate (E.max)', 'Zirconia', 'Composite (Direct)', 'Composite (Indirect / Lab)'] },
        { key: 'shade', label: 'Shade', type: 'input', placeholder: 'e.g. BL1, A1, B1' },
        { key: 'numberOfTeeth', label: 'Number of Teeth', type: 'dropdown', options: ['1', '2', '4', '6', '8', '10'] },
        { key: 'teethInvolved', label: 'Teeth Involved', type: 'input', placeholder: 'e.g. 13-23' },
        { key: 'cementationType', label: 'Cementation', options: ['Adhesive (Light-Cure Resin Cement)', 'Adhesive (Dual-Cure Resin Cement)', 'Try-In Paste Used'] },
        { key: 'impressionMethod', label: 'Impression Method', options: ['Digital (Intraoral Scanner)', 'Conventional (PVS / Polyether)'] },
      ];
    case 'Inlay / Onlay':
      return [
        { key: 'restorationType', label: 'Restoration Type', options: ['Inlay', 'Onlay', 'Overlay'] },
        { key: 'material', label: 'Material', options: ['Lithium Disilicate (E.max)', 'Feldspathic Ceramic', 'Zirconia', 'Composite (Indirect / Lab)', 'Gold'] },
        { key: 'cementationType', label: 'Cementation', options: ['Adhesive (Resin Cement)', 'Self-Adhesive Resin Cement', 'Conventional Cement (GIC)'] },
        { key: 'shade', label: 'Shade', type: 'input', placeholder: 'e.g. A2, A3' },
        { key: 'impressionMethod', label: 'Impression Method', options: ['Digital (Intraoral Scanner)', 'Conventional (PVS / Polyether)'] },
      ];
    case 'Complete Denture':
      return [
        { key: 'arch', label: 'Arch', options: ['Maxillary (Upper)', 'Mandibular (Lower)', 'Both (Complete Set)'] },
        { key: 'dentureType', label: 'Denture Type', options: ['Conventional (After Healing)', 'Immediate (Day of Extraction)', 'Copy / Duplicate Denture'] },
        { key: 'baseMaterial', label: 'Base Material', options: ['Acrylic (PMMA)', 'Flexible Nylon (Valplast)', 'Metal-Reinforced (Chrome-Cobalt Frame)'] },
        { key: 'teethMaterial', label: 'Teeth Material', options: ['Acrylic', 'Composite (SR Phonares / Ivoclar)', 'Nano-Ceramic Composite'] },
        { key: 'shade', label: 'Teeth Shade', type: 'input', placeholder: 'e.g. A2, A3' },
        { key: 'mould', label: 'Mould / Shape', type: 'input', placeholder: 'e.g. Square, Ovoid, Tapered' },
        { key: 'occlusionScheme', label: 'Occlusion Scheme', options: ['Balanced Occlusion', 'Lingualized Occlusion', 'Monoplane'] },
        { key: 'impressionTechnique', label: 'Impression Technique', options: ['Preliminary (Alginate)', 'Final (Border-Molded Custom Tray)', 'Functional Impression (Closed Mouth)'] },
      ];
    case 'Partial Denture':
      return [
        { key: 'arch', label: 'Arch', options: ['Maxillary (Upper)', 'Mandibular (Lower)'] },
        { key: 'frameworkMaterial', label: 'Framework Material', options: ['Chrome-Cobalt (Cast Metal)', 'Acrylic (PMMA)', 'Flexible Nylon (Valplast)', 'PEEK (Polyether Ether Ketone)', 'BioHPP'] },
        { key: 'kennedyClassification', label: 'Kennedy Classification', type: 'dropdown', options: ['Class I (Bilateral Free End)', 'Class II (Unilateral Free End)', 'Class III (Bounded Saddle)', 'Class IV (Anterior Free End)'] },
        { key: 'retainerType', label: 'Retainer Type', options: ['Circumferential Clasp', 'RPI System', 'Wrought Wire Clasp', 'Precision Attachment', 'No Clasp (Aesthetic)'] },
        { key: 'missingTeeth', label: 'Missing Teeth', type: 'input', placeholder: 'e.g. 35, 36, 37' },
        { key: 'restSeatLocation', label: 'Rest Seat Location', type: 'input', placeholder: 'e.g. Mesial 34, Distal 38' },
        { key: 'teethMaterial', label: 'Teeth Material', options: ['Acrylic', 'Composite', 'Ceramic'] },
        { key: 'shade', label: 'Teeth Shade', type: 'input', placeholder: 'e.g. A2, A3' },
      ];
    case 'Overdenture (Implant-Supported)':
      return [
        { key: 'arch', label: 'Arch', options: ['Maxillary (Upper)', 'Mandibular (Lower)', 'Both'] },
        { key: 'retentionType', label: 'Retention Type', options: ['Locator Attachment', 'Ball Attachment', 'Bar & Clip', 'Novaloc'] },
        { key: 'numberOfImplants', label: 'Number of Implants', type: 'dropdown', options: ['2', '4', '6'] },
        { key: 'prosthesisType', label: 'Prosthesis Type', options: ['Removable Overdenture', 'Fixed Hybrid (All-on-4)', 'Fixed Hybrid (All-on-6)', 'Milled Bar with Overdenture'] },
        { key: 'frameworkMaterial', label: 'Framework Material', options: ['Titanium', 'Zirconia', 'Chrome-Cobalt', 'PEEK'] },
        { key: 'dentureBaseMaterial', label: 'Denture Base', options: ['Acrylic (PMMA)', 'Composite (Nano-Ceramic)', 'Zirconia with Ceramic Veneering'] },
        { key: 'shade', label: 'Teeth Shade', type: 'input', placeholder: 'e.g. A2, BL2' },
        { key: 'impressionMethod', label: 'Impression Method', options: ['Digital (Intraoral Scanner)', 'Open Tray (Pick-Up)', 'Closed Tray (Transfer)'] },
      ];
    case 'Post & Core':
      return [
        { key: 'postType', label: 'Post Type', options: ['Prefabricated Fiber Post', 'Prefabricated Metal Post', 'Custom Cast Post & Core', 'Zirconia Post'] },
        { key: 'coreMaterial', label: 'Core Material', options: ['Composite Core Build-Up', 'Amalgam Core', 'Glass Ionomer (GIC)', 'Cast Metal (Gold / Base Metal)'] },
        { key: 'cementationType', label: 'Cementation', options: ['Adhesive (Resin Cement)', 'Self-Adhesive Resin Cement', 'Glass Ionomer Cement'] },
        { key: 'canalPrepLength', label: 'Canal Preparation', options: ['2/3 Root Length', '1/2 Root Length', 'Custom Length'] },
      ];
    default:
      return [];
  }
}

// ── Components ───────────────────────────────────────────

interface ProstheticsFormProps {
  subCategory: ProsthSubCategory;
  fields: ProstheticsFields;
  onSubCategoryChange: (sub: ProsthSubCategory) => void;
  onFieldChange: (key: string, value: string | string[]) => void;
  // Bridge-specific props
  currentToothNumber?: number;
  bridgeTeeth?: BridgeTooth[];
  onBridgeTeethChange?: (teeth: BridgeTooth[]) => void;
  savedTeeth?: number[];
}

export function ProstheticsForm({ subCategory, fields, onSubCategoryChange, onFieldChange, currentToothNumber, bridgeTeeth, onBridgeTeethChange, savedTeeth }: ProstheticsFormProps) {
  const fieldDefs = getFieldsForSubCategory(subCategory);

  const toggleMultiValue = (key: string, value: string) => {
    const current = (fields[key] as string[] | undefined) || [];
    if (current.includes(value)) {
      onFieldChange(key, current.filter(v => v !== value));
    } else {
      onFieldChange(key, [...current, value]);
    }
  };

  const isBridge = subCategory === 'Bridge';

  return (
    <div className="space-y-4">
      {/* Sub-Category */}
      <div className="space-y-2">
        <Label className="text-gray-700">Sub-Category</Label>
        <Select value={subCategory} onValueChange={(v) => onSubCategoryChange(v as ProsthSubCategory)}>
          <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 max-h-[260px]">
            <SelectItem disabled value="__fixed_header" className="font-semibold text-gray-500 text-xs">FIXED</SelectItem>
            {(['Single Crown', 'Bridge', 'Veneer', 'Inlay / Onlay'] as ProsthSubCategory[]).map(sc => (
              <SelectItem key={sc} value={sc}>{sc}</SelectItem>
            ))}
            <SelectItem disabled value="__removable_header" className="font-semibold text-gray-500 text-xs mt-2">REMOVABLE</SelectItem>
            {(['Complete Denture', 'Partial Denture', 'Overdenture (Implant-Supported)'] as ProsthSubCategory[]).map(sc => (
              <SelectItem key={sc} value={sc}>{sc}</SelectItem>
            ))}
            <SelectItem disabled value="__other_header" className="font-semibold text-gray-500 text-xs mt-2">OTHER</SelectItem>
            <SelectItem value="Post & Core">Post & Core</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bridge Tooth Selector - shown before other fields when Bridge is selected */}
      {isBridge && currentToothNumber && onBridgeTeethChange && bridgeTeeth && (
        <BridgeToothSelector
          currentToothNumber={currentToothNumber}
          selectedTeeth={bridgeTeeth}
          onSelectionChange={onBridgeTeethChange}
          existingSavedTeeth={savedTeeth}
        />
      )}

      {/* Dynamic fields */}
      {fieldDefs.map((def) => {
        if ('type' in def && def.type === 'dropdown') {
          return (
            <div key={def.key} className="space-y-2">
              <Label className="text-gray-700">{def.label}</Label>
              <Select
                value={(fields[def.key] as string) || ''}
                onValueChange={(v) => onFieldChange(def.key, v)}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue placeholder={`Select ${def.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {def.options.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }

        if ('type' in def && def.type === 'input') {
          return (
            <div key={def.key} className="space-y-2">
              <Label className="text-gray-700">{def.label}</Label>
              <Input
                value={(fields[def.key] as string) || ''}
                onChange={(e) => onFieldChange(def.key, e.target.value)}
                placeholder={def.placeholder}
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          );
        }

        // multi-select (checkboxes)
        if ('multi' in def && def.multi) {
          const selected = (fields[def.key] as string[] | undefined) || [];
          return (
            <div key={def.key} className="space-y-2">
              <Label className="text-gray-700">{def.label}</Label>
              <div className="space-y-2">
                {def.options.map(opt => (
                  <div key={opt} className="flex items-center gap-2">
                    <Checkbox
                      id={`${def.key}-${opt}`}
                      checked={selected.includes(opt)}
                      onCheckedChange={() => toggleMultiValue(def.key, opt)}
                      className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                    />
                    <Label htmlFor={`${def.key}-${opt}`} className="text-gray-700 cursor-pointer text-sm">
                      {opt}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Single-select pill buttons
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
                  className={`text-xs ${
                    currentValue === opt
                      ? 'bg-[#6366F1] text-white border-[#6366F1] hover:bg-[#5558E3] hover:text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
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

// ── Preview ──────────────────────────────────────────────

interface ProstheticsPreviewProps {
  subCategory: ProsthSubCategory;
  fields: ProstheticsFields;
  bridgeTeeth?: BridgeTooth[];
}

export function ProstheticsPreview({ subCategory, fields, bridgeTeeth }: ProstheticsPreviewProps) {
  const fieldDefs = getFieldsForSubCategory(subCategory);

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-gray-500 text-xs">Sub-Category</Label>
        <p className="text-gray-900 mt-1">{subCategory}</p>
      </div>

      {/* Bridge teeth summary in preview */}
      {subCategory === 'Bridge' && bridgeTeeth && bridgeTeeth.length > 1 && (
        <div>
          <Label className="text-gray-500 text-xs">Bridge Teeth</Label>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {[...bridgeTeeth]
              .sort((a, b) => a.toothNumber - b.toothNumber)
              .map(t => (
                <span
                  key={t.toothNumber}
                  className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                    t.role === 'abutment'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-amber-50 text-amber-600 border border-amber-200 border-dashed'
                  }`}
                >
                  {t.toothNumber} ({t.role === 'abutment' ? 'A' : 'P'})
                </span>
              ))}
          </div>
        </div>
      )}

      {fieldDefs.map(def => {
        const value = fields[def.key];
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
          <div key={def.key}>
            <Label className="text-gray-500 text-xs">{def.label}</Label>
            <p className="text-gray-900 mt-1 text-sm">
              {Array.isArray(value) ? value.join(', ') : value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export { PROSTH_SUB_CATEGORIES };
