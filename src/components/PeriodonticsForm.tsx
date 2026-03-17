import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface PeriodonticsFields {
  [key: string]: string | string[];
}

const PERIO_SUB_CATEGORIES = [
  'Scaling & Root Planing',
  'Flap Surgery',
  'Gum Graft',
  'Bone Graft / Regeneration',
  'Crown Lengthening',
  'Gingivectomy / Gingivoplasty',
  'Frenectomy',
  'Periodontal Splinting',
  'Laser Periodontal Therapy',
  'Periodontal Maintenance',
] as const;

export type PerioSubCategory = (typeof PERIO_SUB_CATEGORIES)[number];

// ── helpers ──────────────────────────────────────────────

interface PillFieldDef {
  key: string;
  label: string;
  options: string[];
  multi?: boolean; // true = checkboxes, false = single select pills
}

interface DropdownFieldDef {
  key: string;
  label: string;
  options: string[];
  type: 'dropdown';
}

type FieldDef = PillFieldDef | DropdownFieldDef;

function getFieldsForSubCategory(sub: PerioSubCategory, fields: PeriodonticsFields): FieldDef[] {
  switch (sub) {
    case 'Scaling & Root Planing':
      return [
        { key: 'procedureType', label: 'Procedure Type', options: ['Scaling Only (Prophylaxis)', 'Scaling & Root Planing (SRP)', 'Full Mouth Debridement', 'Gross Debridement'] },
        { key: 'scope', label: 'Scope', options: ['Full Mouth', 'Q1 (Upper Right)', 'Q2 (Upper Left)', 'Q3 (Lower Left)', 'Q4 (Lower Right)'] },
        { key: 'instrumentation', label: 'Instrumentation', options: ['Hand (Curettes/Scalers)', 'Ultrasonic (Piezo/Magnetostrictive)', 'Combined (Hand + Ultrasonic)'] },
        { key: 'anesthesia', label: 'Anesthesia', options: ['Local Infiltration', 'Block', 'Topical Only', 'None'] },
        { key: 'adjunctiveTherapy', label: 'Adjunctive Therapy', options: ['Subgingival Irrigation (CHX)', 'Local Antibiotic (Arestin / Minocycline Microspheres)', 'Local Antibiotic (PerioChip / Chlorhexidine Chip)', 'Fluoride Application', 'Air Polishing'], multi: true },
      ];
    case 'Flap Surgery':
      return [
        { key: 'flapType', label: 'Flap Type', options: ['Open Flap Debridement (OFD)', 'Modified Widman Flap', 'Apically Positioned Flap', 'Coronally Advanced Flap', 'Papilla Preservation Flap'] },
        { key: 'osseousSurgery', label: 'Osseous Surgery', options: ['None', 'Osteoplasty (Reshaping without removal)', 'Ostectomy (Bone removal for pocket elimination)'] },
        { key: 'quadrant', label: 'Quadrant', options: ['Q1 (Upper Right)', 'Q2 (Upper Left)', 'Q3 (Lower Left)', 'Q4 (Lower Right)'] },
        { key: 'sutureType', label: 'Suture Type', type: 'dropdown', options: ['Resorbable (Vicryl / Chromic Gut)', 'Non-Resorbable (Silk / PTFE / Nylon)', 'Sling Sutures', 'Mattress Sutures'] },
      ];
    case 'Gum Graft':
      return [
        { key: 'graftTechnique', label: 'Graft Technique', options: ['Free Gingival Graft (FGG)', 'Subepithelial Connective Tissue Graft (CTG)', 'Lateral Pedicle Flap', 'Coronally Advanced Flap (CAF)', 'Semilunar Coronally Repositioned Flap', 'Tunnel Technique (MCAT)'] },
        { key: 'graftSource', label: 'Graft Source', options: ['Autogenous — Palate', 'Autogenous — Tuberosity', 'Allograft — AlloDerm (Acellular Dermal Matrix)', 'Xenograft — Collagen Matrix (Mucograft)'] },
        { key: 'recessionClassification', label: 'Recession Classification (Cairo)', options: ['RT1 (No interproximal attachment loss)', 'RT2 (Interproximal loss ≤ buccal loss)', 'RT3 (Interproximal loss > buccal loss)'] },
        { key: 'numberOfTeeth', label: 'Number of Teeth', type: 'dropdown', options: ['1', '2', '3', '4', '5', '6+'] },
        { key: 'biologicsUsed', label: 'Biologics Used', options: ['None', 'Emdogain (Enamel Matrix Derivative)', 'PRF (Platelet-Rich Fibrin)', 'PRP (Platelet-Rich Plasma)', 'rhPDGF (Recombinant Human Platelet-Derived Growth Factor)'], multi: true },
      ];
    case 'Bone Graft / Regeneration': {
      const base: FieldDef[] = [
        { key: 'procedure', label: 'Procedure', options: ['Bone Graft Only', 'Guided Tissue Regeneration (GTR)', 'Guided Bone Regeneration (GBR)', 'Socket Preservation', 'Ridge Augmentation', 'Sinus Floor Elevation (Sinus Lift)'] },
        { key: 'graftMaterial', label: 'Graft Material', options: ['Autograft (Patient\'s own bone)', 'Allograft — FDBA', 'Allograft — DFDBA', 'Xenograft — Bovine (Bio-Oss)', 'Xenograft — Porcine', 'Alloplast — β-TCP', 'Alloplast — Hydroxyapatite (HA)', 'Alloplast — Bioactive Glass', 'Alloplast — Biphasic Calcium Phosphate', 'Composite (Autograft + Xenograft mix)'] },
        { key: 'membrane', label: 'Membrane', options: ['None', 'Resorbable — Collagen (Bio-Gide)', 'Resorbable — Polylactic Acid (PLA)', 'Non-Resorbable — d-PTFE', 'Non-Resorbable — Titanium-Reinforced PTFE', 'PRF Membrane (Pressed L-PRF)'] },
        { key: 'defectType', label: 'Defect Type', options: ['1-Wall Intrabony', '2-Wall Intrabony', '3-Wall Intrabony', 'Circumferential', 'Furcation (Class I)', 'Furcation (Class II)', 'Furcation (Class III)', 'Horizontal Defect', 'Vertical Defect'] },
        { key: 'biologics', label: 'Biologics', options: ['None', 'Emdogain (EMD)', 'L-PRF', 'A-PRF', 'i-PRF', 'PRP', 'rhPDGF-BB (GEM 21S)', 'rhBMP-2', 'Sticky Bone (PRF + Graft mix)'], multi: true },
      ];
      if (fields.procedure === 'Sinus Floor Elevation (Sinus Lift)') {
        base.push({ key: 'sinusApproach', label: 'Sinus Approach', options: ['Lateral Window Approach', 'Crestal (Osteotome / Transalveolar)'] });
      }
      return base;
    }
    case 'Crown Lengthening':
      return [
        { key: 'purpose', label: 'Purpose', options: ['Restorative (Expose margin for crown/restoration)', 'Aesthetic (Correct gummy smile)', 'Access for Subgingival Caries/Fracture'] },
        { key: 'technique', label: 'Technique', options: ['Gingivectomy Only (Soft tissue only)', 'Apically Positioned Flap + Osseous Recontouring', 'Surgical Extrusion'] },
        { key: 'numberOfTeeth', label: 'Number of Teeth', type: 'dropdown', options: ['1', '2', '3', '4', '5', '6+'] },
      ];
    case 'Gingivectomy / Gingivoplasty':
      return [
        { key: 'procedure', label: 'Procedure', options: ['Gingivectomy (Excision of excess gingiva)', 'Gingivoplasty (Reshaping of gingival contour)', 'Combined Gingivectomy + Gingivoplasty'] },
        { key: 'indication', label: 'Indication', options: ['Gingival Hyperplasia (Drug-induced)', 'Gingival Enlargement (Inflammatory)', 'Gummy Smile Correction', 'Pseudo-Pocket Elimination', 'Access for Restorative'] },
        { key: 'method', label: 'Method', options: ['Scalpel (Conventional)', 'Electrosurgery', 'Laser (Diode)', 'Laser (Er:YAG)'] },
        { key: 'numberOfTeethArea', label: 'Number of Teeth / Area', type: 'dropdown', options: ['1-2 teeth', '3-4 teeth', '5-6 teeth', 'Sextant', 'Full Arch'] },
      ];
    case 'Frenectomy':
      return [
        { key: 'frenumLocation', label: 'Frenum Location', options: ['Maxillary Labial (Upper Lip)', 'Mandibular Labial (Lower Lip)', 'Lingual (Tongue-Tie / Ankyloglossia)', 'Buccal'] },
        { key: 'technique', label: 'Technique', options: ['Conventional (Scalpel)', 'Laser (Diode)', 'Laser (Er:YAG)', 'Electrosurgery', 'Z-Plasty'] },
        { key: 'indication', label: 'Indication', options: ['Diastema Closure (Ortho-related)', 'Denture Interference', 'Restricted Tongue Movement', 'Gingival Recession Cause', 'Speech Difficulty'] },
      ];
    case 'Periodontal Splinting':
      return [
        { key: 'splintType', label: 'Splint Type', options: ['Fiber-Reinforced Composite (Ribbond / EverStick)', 'Composite + Wire (Ligature Wire)', 'Removable Splint', 'Fixed (Cast Metal)'] },
        { key: 'location', label: 'Location', options: ['Upper Anterior', 'Lower Anterior', 'Upper Posterior', 'Lower Posterior'] },
        { key: 'numberOfTeethSplinted', label: 'Number of Teeth Splinted', type: 'dropdown', options: ['2', '3', '4', '5', '6', '7', '8+'] },
        { key: 'indication', label: 'Indication', options: ['Mobility due to Bone Loss', 'Post-Trauma Stabilization', 'Post-Regenerative Surgery Support', 'Pre-Prosthetic Stabilization'] },
      ];
    case 'Laser Periodontal Therapy':
      return [
        { key: 'protocol', label: 'Protocol', options: ['LANAP (Nd:YAG)', 'LAPIP (Nd:YAG)', 'Laser Bacterial Reduction (Diode)', 'Laser Curettage (Diode / Er:YAG)', 'Photodynamic Therapy (PDT)', 'Photobiomodulation / LLLT'] },
        { key: 'laserType', label: 'Laser Type', options: ['Nd:YAG (1064 nm)', 'Er:YAG (2940 nm)', 'Er,Cr:YSGG (2780 nm)', 'Diode (810–980 nm)', 'CO2 (10,600 nm)'] },
        { key: 'scope', label: 'Scope', options: ['Localized (1-3 teeth)', 'Quadrant', 'Full Mouth'] },
      ];
    case 'Periodontal Maintenance':
      return [
        { key: 'visitType', label: 'Visit Type', options: ['Recall / Maintenance Visit', 'Supportive Periodontal Therapy (SPT)', 'Re-evaluation'] },
        { key: 'proceduresPerformed', label: 'Procedures Performed', options: ['Scaling & Polishing', 'Subgingival Debridement (Localized)', 'Oral Hygiene Instruction (OHI)', 'Periodontal Charting Update', 'Radiographs Taken (PA / Bitewing)', 'Fluoride Application', 'Local Antibiotic Delivery'], multi: true },
        { key: 'recallInterval', label: 'Recall Interval', options: ['3 months', '4 months', '6 months', '12 months'] },
      ];
    default:
      return [];
  }
}

// ── Components ───────────────────────────────────────────

interface PeriodonticsFormProps {
  subCategory: PerioSubCategory;
  fields: PeriodonticsFields;
  onSubCategoryChange: (sub: PerioSubCategory) => void;
  onFieldChange: (key: string, value: string | string[]) => void;
}

export function PeriodonticsForm({ subCategory, fields, onSubCategoryChange, onFieldChange }: PeriodonticsFormProps) {
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
      {/* Sub-Category */}
      <div className="space-y-2">
        <Label className="text-gray-700">Sub-Category</Label>
        <Select value={subCategory} onValueChange={(v) => onSubCategoryChange(v as PerioSubCategory)}>
          <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 max-h-[260px]">
            {PERIO_SUB_CATEGORIES.map(sc => (
              <SelectItem key={sc} value={sc}>{sc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

        // multi-select (checkboxes)
        if (def.multi) {
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

interface PeriodonticsPreviewProps {
  subCategory: PerioSubCategory;
  fields: PeriodonticsFields;
}

export function PeriodonticsPreview({ subCategory, fields }: PeriodonticsPreviewProps) {
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
            <p className="text-gray-900 mt-1 text-sm">
              {Array.isArray(value) ? value.join(', ') : value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export { PERIO_SUB_CATEGORIES };
