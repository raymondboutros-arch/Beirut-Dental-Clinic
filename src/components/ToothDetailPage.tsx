import { useState } from 'react';
import { ArrowLeft, X, Mic, Edit2, Plus, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { PeriodonticsForm, PeriodonticsPreview, type PeriodonticsFields, type PerioSubCategory, PERIO_SUB_CATEGORIES } from './PeriodonticsForm';
import { OrthodonticsForm, OrthodonticsPreview, type OrthodonticsFields, type OrthoSubCategory, ORTHO_SUB_CATEGORIES } from './OrthodonticsForm';
import { PediatricForm, PediatricPreview, type PediatricFields, type PedoSubCategory, PEDO_SUB_CATEGORIES } from './PediatricForm';

interface CompositeToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Composite';
  visitDate: string;
  material: string;
  class: string;
  surfaces: string[];
  depthFlags: string[];
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface ImplantToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Implant';
  visitDate: string;
  implantSystem: string;
  diameter: string;
  length: string;
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface RootCanalToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Root Canal';
  visitDate: string;
  subCategory: string; // 'BIO' or 'Retreatment (Existing Root Canal)'
  canalCount: string; // 'Single canal', 'Two canals', etc.
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface SurgeryToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Surgery';
  visitDate: string;
  subCategory: 'Extractions' | 'Bone Graft';
  extractionType?: string; // for Extractions subcategory
  graftType?: string; // for Bone Graft subcategory
  membraneType?: string; // conditional, only if graftType is 'Membrane'
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface PeriodonticsToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Periodontics';
  visitDate: string;
  subCategory: string;
  perioFields: PeriodonticsFields;
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface OrthodonticsToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Orthodontics';
  visitDate: string;
  subCategory: string;
  orthoFields: OrthodonticsFields;
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface PediatricToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Pediatric';
  visitDate: string;
  subCategory: string;
  pedoFields: PediatricFields;
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

type ToothData = CompositeToothData | ImplantToothData | RootCanalToothData | SurgeryToothData | PeriodonticsToothData | OrthodonticsToothData | PediatricToothData;

interface ToothDetailPageProps {
  toothNumber: number;
  treatments: ToothData[];
  isSaved: boolean;
  onAddTreatment: (toothNumber: number, treatmentType: 'Composite' | 'Implant' | 'Root Canal' | 'Surgery' | 'Periodontics' | 'Orthodontics' | 'Pediatric') => string;
  onTreatmentUpdate: (toothNumber: number, treatmentId: string, updates: Partial<ToothData>) => void;
  onTreatmentRemove: (toothNumber: number, treatmentId: string) => void;
  onRemoveAllTreatments: (toothNumber: number) => void;
  onClose: () => void;
  onSave: (toothNumber: number) => void;
}

export function ToothDetailPage({ 
  toothNumber, 
  treatments,
  isSaved, 
  onAddTreatment,
  onTreatmentUpdate,
  onTreatmentRemove,
  onRemoveAllTreatments,
  onClose, 
  onSave 
}: ToothDetailPageProps) {
  const [editingTreatmentId, setEditingTreatmentId] = useState<string | null>(null);
  const [showAddTreatmentMenu, setShowAddTreatmentMenu] = useState(false);
  
  // Ensure treatments is always an array
  const treatmentsList = Array.isArray(treatments) ? treatments : [];
  
  // Helper to get price display
  const getPriceDisplay = (treatment: ToothData) => {
    if (treatment.priceOption === 'custom') {
      return treatment.customPrice ? `$${treatment.customPrice}` : 'Custom (not set)';
    }
    return `$${treatment.priceOption}`;
  };
  
  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleAddNewTreatment = (treatmentType: 'Composite' | 'Implant' | 'Root Canal' | 'Surgery' | 'Periodontics' | 'Orthodontics' | 'Pediatric') => {
    const newTreatmentId = onAddTreatment(toothNumber, treatmentType);
    setEditingTreatmentId(newTreatmentId);
    setShowAddTreatmentMenu(false);
  };

  const handleSaveTreatment = () => {
    onSave(toothNumber);
    setEditingTreatmentId(null);
  };

  // Get available surfaces based on class
  const getAvailableSurfaces = (classValue: string): string[] => {
    switch (classValue) {
      case 'Class I':
        return ['O'];
      case 'Class II':
        return ['OM', 'OD', 'MOD'];
      case 'Class III':
        return ['M', 'D'];
      case 'Class IV':
        return ['M', 'D'];
      case 'Class V':
        return [];
      default:
        return [];
    }
  };

  // Implant specific data
  const implantSystems = ['Tissue Level (RN)', 'Tissue Level (WN)', 'BLT', 'BLC', 'TLC', 'BLX', 'TLX'];
  const depthFlags = ['Pulp exposed', 'Very deep', 'Monitor in 6 months'];

  // Get diameter options based on implant system
  const getDiameterOptions = (system: string): string[] => {
    if (system === 'Tissue Level (RN)') {
      return ['4.1', '4.8'];
    } else if (system === 'Tissue Level (WN)') {
      return ['4.8']; // WN only supports 4.8mm diameter
    } else if (system === 'BLT') {
      return ['2.9', '3.3', '4.1', '4.8'];
    } else if (system === 'BLX') {
      return ['3.5', '3.75', '4.0', '4.5', '5.0', '5.5', '6.5'];
    } else if (system === 'TLX') {
      return ['3.75', '4.5', '5.5', '6.5'];
    } else if (system === 'BLC') {
      return ['3.3', '3.75', '4.5', '5.5', '6.5'];
    } else if (system === 'TLC') {
      return ['3.3', '3.75', '4.5', '5.5', '6.5'];
    } else {
      return ['3.5', '3.75', '4.0', '4.5', '5.5', '6.5'];
    }
  };

  // Get length options based on implant system
  const getLengthOptions = (system: string): string[] => {
    if (system === 'Tissue Level (RN)' || system === 'Tissue Level (WN)') {
      return ['8', '10', '12', '14', '16'];
    } else if (system === 'BLT') {
      return ['8', '10', '12', '14', '16'];
    } else {
      return ['4', '6', '8', '10', '12', '14', '16', '18'];
    }
  };

  // Get canal count options based on tooth number
  const getCanalCountOptions = (toothNum: number): string[] => {
    // Upper premolars (14, 15, 24, 25): single + two canals + custom
    if ([14, 15, 24, 25].includes(toothNum)) {
      return ['Single canal', 'Two canals', 'Custom'];
    }
    // Upper molars (16, 17, 18, 26, 27, 28): all options
    if ([16, 17, 18, 26, 27, 28].includes(toothNum)) {
      return ['Single canal', 'Two canals', 'Three canals', 'Four canals', 'Custom'];
    }
    // Upper anterior (13, 12, 11, 21, 22, 23): single canal + custom
    if ([11, 12, 13, 21, 22, 23].includes(toothNum)) {
      return ['Single canal', 'Custom'];
    }
    // Lower anterior + premolars (31-35, 41-45): single + two canals + custom
    if ((toothNum >= 31 && toothNum <= 35) || (toothNum >= 41 && toothNum <= 45)) {
      return ['Single canal', 'Two canals', 'Custom'];
    }
    // Lower molars (36-38, 46-48) and others: all options
    return ['Single canal', 'Two canals', 'Three canals', 'Four canals', 'Custom'];
  };

  const handleClassChange = (treatmentId: string, classValue: string) => {
    const availableSurfaces = getAvailableSurfaces(classValue);
    onTreatmentUpdate(toothNumber, treatmentId, {
      class: classValue,
      surfaces: availableSurfaces.length === 1 ? availableSurfaces : [],
    });
  };

  const handleSurfaceToggle = (treatmentId: string, treatment: CompositeToothData, surface: string) => {
    const currentSurfaces = treatment.surfaces || [];
    const availableSurfaces = getAvailableSurfaces(treatment.class);
    
    if (availableSurfaces.length === 1) {
      onTreatmentUpdate(toothNumber, treatmentId, { surfaces: [surface] });
      return;
    }

    const newSurfaces = currentSurfaces.includes(surface)
      ? currentSurfaces.filter(s => s !== surface)
      : [...currentSurfaces, surface];
    onTreatmentUpdate(toothNumber, treatmentId, { surfaces: newSurfaces });
  };

  const handleDepthFlagToggle = (treatmentId: string, treatment: CompositeToothData, flag: string) => {
    const currentFlags = treatment.depthFlags || [];
    const newFlags = currentFlags.includes(flag)
      ? currentFlags.filter(f => f !== flag)
      : [...currentFlags, flag];
    onTreatmentUpdate(toothNumber, treatmentId, { depthFlags: newFlags });
  };

  const handleImplantSystemChange = (treatmentId: string, system: string) => {
    const diameterOptions = getDiameterOptions(system);
    const lengthOptions = getLengthOptions(system);
    onTreatmentUpdate(toothNumber, treatmentId, {
      implantSystem: system,
      diameter: diameterOptions[0],
      length: lengthOptions[0],
    });
  };

  const renderTreatmentPreview = (treatment: ToothData) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-500 text-xs">Treatment Type</Label>
            <p className="text-gray-900 mt-1">{treatment.treatmentType}</p>
          </div>
          <div>
            <Label className="text-gray-500 text-xs">Date Worked</Label>
            <p className="text-gray-900 mt-1">{formatDate(treatment.visitDate)}</p>
          </div>
        </div>

        {treatment.treatmentType === 'Composite' ? (
          <>
            <div>
              <Label className="text-gray-500 text-xs">Material</Label>
              <p className="text-gray-900 mt-1">{(treatment as CompositeToothData).material || 'Not set'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Class</Label>
                <p className="text-gray-900 mt-1">{(treatment as CompositeToothData).class}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">Status</Label>
                <p className="text-gray-900 mt-1">{(treatment as CompositeToothData).status}</p>
              </div>
            </div>

            {getAvailableSurfaces((treatment as CompositeToothData).class).length > 0 && (
              <div>
                <Label className="text-gray-500 text-xs">Surfaces</Label>
                <p className="text-gray-900 mt-1">
                  {(treatment as CompositeToothData).surfaces && (treatment as CompositeToothData).surfaces.length > 0
                    ? (treatment as CompositeToothData).surfaces.join(', ')
                    : 'None selected'}
                </p>
              </div>
            )}

            {(treatment as CompositeToothData).depthFlags && (treatment as CompositeToothData).depthFlags.length > 0 && (
              <div>
                <Label className="text-gray-500 text-xs">Depth Flags</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(treatment as CompositeToothData).depthFlags.map(flag => (
                    <Badge key={flag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {flag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : treatment.treatmentType === 'Implant' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Implant System</Label>
                <p className="text-gray-900 mt-1">{(treatment as ImplantToothData).implantSystem}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">Status</Label>
                <p className="text-gray-900 mt-1">{(treatment as ImplantToothData).status}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Diameter</Label>
                <p className="text-gray-900 mt-1">{(treatment as ImplantToothData).diameter} mm</p>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">Length</Label>
                <p className="text-gray-900 mt-1">{(treatment as ImplantToothData).length} mm</p>
              </div>
            </div>
          </>
        ) : treatment.treatmentType === 'Root Canal' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Sub-Category</Label>
                <p className="text-gray-900 mt-1">{(treatment as RootCanalToothData).subCategory}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">Status</Label>
                <p className="text-gray-900 mt-1">{(treatment as RootCanalToothData).status}</p>
              </div>
            </div>

            <div>
              <Label className="text-gray-500 text-xs">Canal Count</Label>
              <p className="text-gray-900 mt-1">{(treatment as RootCanalToothData).canalCount}</p>
            </div>
          </>
        ) : treatment.treatmentType === 'Surgery' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Sub-Category</Label>
                <p className="text-gray-900 mt-1">{(treatment as SurgeryToothData).subCategory}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">Status</Label>
                <p className="text-gray-900 mt-1">{(treatment as SurgeryToothData).status}</p>
              </div>
            </div>

            {treatment.subCategory === 'Extractions' && (
              <div>
                <Label className="text-gray-500 text-xs">Extraction Type</Label>
                <p className="text-gray-900 mt-1">{(treatment as SurgeryToothData).extractionType}</p>
              </div>
            )}

            {treatment.subCategory === 'Bone Graft' && (
              <>
                <div>
                  <Label className="text-gray-500 text-xs">Graft Type</Label>
                  <p className="text-gray-900 mt-1">{(treatment as SurgeryToothData).graftType}</p>
                </div>

                {(treatment as SurgeryToothData).graftType === 'Membrane' && (
                  <div>
                    <Label className="text-gray-500 text-xs">Membrane Type</Label>
                    <p className="text-gray-900 mt-1">{(treatment as SurgeryToothData).membraneType}</p>
                  </div>
                )}
              </>
            )}
          </>
        ) : treatment.treatmentType === 'Orthodontics' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Status</Label>
                <p className="text-gray-900 mt-1">{(treatment as OrthodonticsToothData).status}</p>
              </div>
            </div>

            <OrthodonticsPreview
              subCategory={(treatment as OrthodonticsToothData).subCategory as OrthoSubCategory}
              fields={(treatment as OrthodonticsToothData).orthoFields || {}}
            />
          </>
        ) : treatment.treatmentType === 'Pediatric' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Status</Label>
                <p className="text-gray-900 mt-1">{(treatment as PediatricToothData).status}</p>
              </div>
            </div>

            <PediatricPreview
              subCategory={(treatment as PediatricToothData).subCategory as PedoSubCategory}
              fields={(treatment as PediatricToothData).pedoFields || {}}
            />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-xs">Status</Label>
                <p className="text-gray-900 mt-1">{(treatment as PeriodonticsToothData).status}</p>
              </div>
            </div>

            <PeriodonticsPreview
              subCategory={(treatment as PeriodonticsToothData).subCategory as PerioSubCategory}
              fields={(treatment as PeriodonticsToothData).perioFields || {}}
            />
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-500 text-xs">Price</Label>
            <p className="text-gray-900 mt-1">{getPriceDisplay(treatment)}</p>
          </div>
        </div>

        {treatment.notes && (
          <div>
            <Label className="text-gray-500 text-xs">Notes</Label>
            <p className="text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
              {treatment.notes}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditingTreatmentId(treatment.id)}
            className="text-[#6366F1] border-[#6366F1] hover:bg-[#6366F1]/10"
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onTreatmentRemove(toothNumber, treatment.id)}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    );
  };

  const renderTreatmentEdit = (treatment: ToothData) => {
    return (
      <div className="space-y-4">
        {/* Visit Date */}
        <div className="space-y-2">
          <Label className="text-gray-700">Date Worked</Label>
          <Input
            type="date"
            value={treatment.visitDate}
            onChange={(e) => onTreatmentUpdate(toothNumber, treatment.id, { visitDate: e.target.value })}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
        </div>

        {/* Treatment-specific fields */}
        {treatment.treatmentType === 'Composite' ? (
          <>
            {/* Material */}
            <div className="space-y-2">
              <Label className="text-gray-700">Material</Label>
              <Select
                value={(treatment as CompositeToothData).material}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { material: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Composite direct">Composite direct</SelectItem>
                  <SelectItem value="Composite indirect">Composite indirect</SelectItem>
                  <SelectItem value="Glass ceramic">Glass ceramic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <Label className="text-gray-700">Class</Label>
              <Select
                value={(treatment as CompositeToothData).class}
                onValueChange={(value) => handleClassChange(treatment.id, value)}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Class I">Class I</SelectItem>
                  <SelectItem value="Class II">Class II</SelectItem>
                  <SelectItem value="Class III">Class III</SelectItem>
                  <SelectItem value="Class IV">Class IV</SelectItem>
                  <SelectItem value="Class V">Class V</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Surfaces */}
            {getAvailableSurfaces((treatment as CompositeToothData).class).length > 0 && (
              <div className="space-y-2">
                <Label className="text-gray-700">Surfaces</Label>
                <div className="space-y-2">
                  {getAvailableSurfaces((treatment as CompositeToothData).class).map((surface) => (
                    <div key={surface} className="flex items-center gap-2">
                      <Checkbox
                        id={`${treatment.id}-surface-${surface}`}
                        checked={((treatment as CompositeToothData).surfaces || []).includes(surface)}
                        onCheckedChange={() => handleSurfaceToggle(treatment.id, treatment as CompositeToothData, surface)}
                        className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                      />
                      <Label
                        htmlFor={`${treatment.id}-surface-${surface}`}
                        className="text-gray-700 cursor-pointer"
                      >
                        {surface}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Depth Flags */}
            <div className="space-y-2">
              <Label className="text-gray-700">Depth Flags</Label>
              <div className="space-y-2">
                {depthFlags.map((flag) => (
                  <div key={flag} className="flex items-center gap-2">
                    <Checkbox
                      id={`${treatment.id}-depth-${flag}`}
                      checked={((treatment as CompositeToothData).depthFlags || []).includes(flag)}
                      onCheckedChange={() => handleDepthFlagToggle(treatment.id, treatment as CompositeToothData, flag)}
                      className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                    />
                    <Label
                      htmlFor={`${treatment.id}-depth-${flag}`}
                      className="text-gray-700 cursor-pointer"
                    >
                      {flag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-gray-700">Status</Label>
              <Select
                value={(treatment as CompositeToothData).status}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { status: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : treatment.treatmentType === 'Implant' ? (
          <>
            {/* Implant System */}
            <div className="space-y-2">
              <Label className="text-gray-700">Implant System</Label>
              <Select
                value={(treatment as ImplantToothData).implantSystem}
                onValueChange={(value) => handleImplantSystemChange(treatment.id, value)}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {implantSystems.map((system) => (
                    <SelectItem key={system} value={system}>
                      {system}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Diameter */}
            <div className="space-y-2">
              <Label className="text-gray-700">Diameter</Label>
              <Select
                value={(treatment as ImplantToothData).diameter}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { diameter: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {getDiameterOptions((treatment as ImplantToothData).implantSystem).map((diameter) => (
                    <SelectItem key={diameter} value={diameter}>
                      {diameter} mm
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Length */}
            <div className="space-y-2">
              <Label className="text-gray-700">Length</Label>
              <Select
                value={(treatment as ImplantToothData).length}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { length: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {getLengthOptions((treatment as ImplantToothData).implantSystem).map((length) => (
                    <SelectItem key={length} value={length}>
                      {length} mm
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-gray-700">Status</Label>
              <Select
                value={(treatment as ImplantToothData).status}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { status: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : treatment.treatmentType === 'Root Canal' ? (
          <>
            {/* Root Canal Sub-Category */}
            <div className="space-y-2">
              <Label className="text-gray-700">Sub-Category</Label>
              <Select
                value={(treatment as RootCanalToothData).subCategory}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { subCategory: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="BIO">BIO</SelectItem>
                  <SelectItem value="Retreatment (Existing Root Canal)">Retreatment (Existing Root Canal)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Canal Count */}
            <div className="space-y-2">
              <Label className="text-gray-700">Canal Count</Label>
              <div className="flex flex-wrap gap-2">
                {getCanalCountOptions(toothNumber).map((count) => (
                  <Button
                    key={count}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onTreatmentUpdate(toothNumber, treatment.id, { canalCount: count })}
                    className={`${
                      (treatment as RootCanalToothData).canalCount === count
                        ? 'bg-[#6366F1] text-white border-[#6366F1] hover:bg-[#5558E3] hover:text-white'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {count}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-gray-700">Status</Label>
              <Select
                value={(treatment as RootCanalToothData).status}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { status: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : treatment.treatmentType === 'Surgery' ? (
          <>
            {/* Surgery Sub-Category */}
            <div className="space-y-2">
              <Label className="text-gray-700">Sub-Category</Label>
              <Select
                value={(treatment as SurgeryToothData).subCategory}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { subCategory: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Extractions">Extractions</SelectItem>
                  <SelectItem value="Bone Graft">Bone Graft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(treatment as SurgeryToothData).subCategory === 'Extractions' && (
              <div className="space-y-2">
                <Label className="text-gray-700">Extraction Type</Label>
                <div className="flex flex-wrap gap-2">
                  {['Simple Extraction', 'Surgical Extraction', 'Impacted Tooth Extraction', 'Wisdom Tooth Surgical Extraction'].map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onTreatmentUpdate(toothNumber, treatment.id, { extractionType: type })}
                      className={`${
                        (treatment as SurgeryToothData).extractionType === type
                          ? 'bg-[#6366F1] text-white border-[#6366F1] hover:bg-[#5558E3] hover:text-white'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {(treatment as SurgeryToothData).subCategory === 'Bone Graft' && (
              <>
                <div className="space-y-2">
                  <Label className="text-gray-700">Graft Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Xenograft', 'Allograft', 'Autograft', 'Membrane', 'Sinus Floor Elevation'].map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onTreatmentUpdate(toothNumber, treatment.id, { graftType: type, membraneType: type === 'Membrane' ? 'Collagen Membrane' : undefined })}
                        className={`${
                          (treatment as SurgeryToothData).graftType === type
                            ? 'bg-[#6366F1] text-white border-[#6366F1] hover:bg-[#5558E3] hover:text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {(treatment as SurgeryToothData).graftType === 'Membrane' && (
                  <div className="space-y-2">
                    <Label className="text-gray-700">Membrane Type</Label>
                    <div className="flex flex-wrap gap-2">
                      {['Collagen Membrane', 'Reinforced', 'Titanium Membrane', 'Magnesium Membrane'].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => onTreatmentUpdate(toothNumber, treatment.id, { membraneType: type })}
                          className={`${
                            (treatment as SurgeryToothData).membraneType === type
                              ? 'bg-[#6366F1] text-white border-[#6366F1] hover:bg-[#5558E3] hover:text-white'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-gray-700">Status</Label>
              <Select
                value={(treatment as SurgeryToothData).status}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { status: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : treatment.treatmentType === 'Orthodontics' ? (
          <>
            {/* Orthodontics */}
            <OrthodonticsForm
              subCategory={(treatment as OrthodonticsToothData).subCategory as OrthoSubCategory}
              fields={(treatment as OrthodonticsToothData).orthoFields || {}}
              onSubCategoryChange={(sub) => onTreatmentUpdate(toothNumber, treatment.id, { subCategory: sub, orthoFields: {} } as any)}
              onFieldChange={(key, value) => {
                const currentFields = (treatment as OrthodonticsToothData).orthoFields || {};
                onTreatmentUpdate(toothNumber, treatment.id, { orthoFields: { ...currentFields, [key]: value } } as any);
              }}
            />

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-gray-700">Status</Label>
              <Select
                value={(treatment as OrthodonticsToothData).status}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { status: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : treatment.treatmentType === 'Pediatric' ? (
          <>
            {/* Pediatric */}
            <PediatricForm
              subCategory={(treatment as PediatricToothData).subCategory as PedoSubCategory}
              fields={(treatment as PediatricToothData).pedoFields || {}}
              onSubCategoryChange={(sub) => onTreatmentUpdate(toothNumber, treatment.id, { subCategory: sub, pedoFields: {} } as any)}
              onFieldChange={(key, value) => {
                const currentFields = (treatment as PediatricToothData).pedoFields || {};
                onTreatmentUpdate(toothNumber, treatment.id, { pedoFields: { ...currentFields, [key]: value } } as any);
              }}
            />

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-gray-700">Status</Label>
              <Select
                value={(treatment as PediatricToothData).status}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { status: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <>
            {/* Periodontics */}
            <PeriodonticsForm
              subCategory={(treatment as PeriodonticsToothData).subCategory as PerioSubCategory}
              fields={(treatment as PeriodonticsToothData).perioFields || {}}
              onSubCategoryChange={(sub) => onTreatmentUpdate(toothNumber, treatment.id, { subCategory: sub, perioFields: {} } as any)}
              onFieldChange={(key, value) => {
                const currentFields = (treatment as PeriodonticsToothData).perioFields || {};
                onTreatmentUpdate(toothNumber, treatment.id, { perioFields: { ...currentFields, [key]: value } } as any);
              }}
            />

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-gray-700">Status</Label>
              <Select
                value={(treatment as PeriodonticsToothData).status}
                onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { status: value })}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Price */}
        <div className="space-y-2">
          <Label className="text-gray-700">Price</Label>
          <RadioGroup
            value={treatment.priceOption}
            onValueChange={(value) => onTreatmentUpdate(toothNumber, treatment.id, { priceOption: value })}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="100" id={`${treatment.id}-100`} className="border-gray-300 text-[#6366F1]" />
                <Label htmlFor={`${treatment.id}-100`} className="text-gray-700 cursor-pointer">
                  $100
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="300" id={`${treatment.id}-300`} className="border-gray-300 text-[#6366F1]" />
                <Label htmlFor={`${treatment.id}-300`} className="text-gray-700 cursor-pointer">
                  $300
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="custom" id={`${treatment.id}-custom`} className="border-gray-300 text-[#6366F1]" />
                <Label htmlFor={`${treatment.id}-custom`} className="text-gray-700 cursor-pointer">
                  Custom
                </Label>
              </div>
            </div>
          </RadioGroup>
          {treatment.priceOption === 'custom' && (
            <Input
              type="number"
              placeholder="Enter custom price"
              value={treatment.customPrice}
              onChange={(e) => onTreatmentUpdate(toothNumber, treatment.id, { customPrice: e.target.value })}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 mt-2"
            />
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-gray-700">Notes</Label>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-gray-500 hover:text-[#6366F1] hover:bg-[#6366F1]/10"
              onClick={() => {
                console.log('Voice recording activated for treatment:', treatment.id);
              }}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Add treatment notes..."
            value={treatment.notes}
            onChange={(e) => onTreatmentUpdate(toothNumber, treatment.id, { notes: e.target.value })}
            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 min-h-[100px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <Button
            onClick={handleSaveTreatment}
            className="flex-1 bg-[#6366F1] hover:bg-[#5558E3] text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]"
          >
            Save Treatment
          </Button>
          <Button
            onClick={() => setEditingTreatmentId(null)}
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] z-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] sticky top-0 z-10">
        <div className="max-w-[430px] mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-[#1C1C1C] hover:bg-gray-50 -ml-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[#1C1C1C] text-[19px] font-medium">Tooth {toothNumber}</h1>
                  {isSaved && (
                    <Badge className="bg-[#E8F4F8] text-[#1E6E97] hover:bg-[#E8F4F8]">
                      {treatmentsList.length} {treatmentsList.length === 1 ? 'Treatment' : 'Treatments'}
                    </Badge>
                  )}
                </div>
                <p className="text-[#6A7279] text-sm">Treatment Records</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-[#8AA4B1] hover:text-[#1C1C1C]"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[430px] mx-auto px-5 py-5 pb-[120px]">
        {treatmentsList.length === 0 ? (
          // No treatments
          <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-6 text-center">
            <h3 className="text-[#1C1C1C] mb-2">No treatments yet</h3>
            <p className="text-[#6A7279] mb-5 text-sm">Add a treatment to get started</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={() => handleAddNewTreatment('Composite')}
                className="bg-[#1E6E97] hover:bg-[#175A7A] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Restorative Dentistry
              </Button>
              <Button
                onClick={() => handleAddNewTreatment('Implant')}
                variant="outline"
                className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Implant
              </Button>
              <Button
                onClick={() => handleAddNewTreatment('Root Canal')}
                variant="outline"
                className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Root Canal
              </Button>
              <Button
                onClick={() => handleAddNewTreatment('Surgery')}
                variant="outline"
                className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Surgery
              </Button>
              <Button
                onClick={() => handleAddNewTreatment('Periodontics')}
                variant="outline"
                className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Periodontics
              </Button>
              <Button
                onClick={() => handleAddNewTreatment('Orthodontics')}
                variant="outline"
                className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Orthodontics
              </Button>
              <Button
                onClick={() => handleAddNewTreatment('Pediatric')}
                variant="outline"
                className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Pediatric
              </Button>
            </div>
          </div>
        ) : (
          // Has treatments
          <div className="space-y-4">
            <Accordion type="single" collapsible value={editingTreatmentId || undefined}>
              {treatmentsList.map((treatment, index) => (
                <AccordionItem 
                  key={treatment.id} 
                  value={treatment.id}
                  className="bg-white border border-[#D9DEE2] rounded-[16px] mb-3"
                >
                  <AccordionTrigger className="px-4 py-3.5 hover:no-underline">
                    <div className="flex items-center gap-3 text-left w-full">
                      <Badge 
                        variant="outline" 
                        className={treatment.treatmentType === 'Composite' 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : treatment.treatmentType === 'Implant'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : treatment.treatmentType === 'Root Canal'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : treatment.treatmentType === 'Surgery'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : treatment.treatmentType === 'Orthodontics'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : treatment.treatmentType === 'Pediatric'
                          ? 'bg-pink-50 text-pink-700 border-pink-200'
                          : 'bg-teal-50 text-teal-700 border-teal-200'}
                      >
                        {treatment.treatmentType === 'Composite' ? 'Restorative Dentistry' : treatment.treatmentType}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          {treatment.treatmentType === 'Composite' 
                            ? `${(treatment as CompositeToothData).class} - ${formatDate(treatment.visitDate)}`
                            : treatment.treatmentType === 'Implant'
                            ? `${(treatment as ImplantToothData).implantSystem} - ${formatDate(treatment.visitDate)}`
                            : treatment.treatmentType === 'Root Canal'
                            ? `${(treatment as RootCanalToothData).subCategory} - ${formatDate(treatment.visitDate)}`
                            : treatment.treatmentType === 'Surgery'
                            ? `${(treatment as SurgeryToothData).subCategory} - ${formatDate(treatment.visitDate)}`
                            : treatment.treatmentType === 'Orthodontics'
                            ? `${(treatment as OrthodonticsToothData).subCategory} - ${formatDate(treatment.visitDate)}`
                            : treatment.treatmentType === 'Pediatric'
                            ? `${(treatment as PediatricToothData).subCategory} - ${formatDate(treatment.visitDate)}`
                            : `${(treatment as PeriodonticsToothData).subCategory} - ${formatDate(treatment.visitDate)}`}
                        </p>
                      </div>
                      <span className="text-gray-600">{getPriceDisplay(treatment)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5">
                    {editingTreatmentId === treatment.id 
                      ? renderTreatmentEdit(treatment) 
                      : renderTreatmentPreview(treatment)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Add New Treatment Button */}
            <div className="relative">
              {showAddTreatmentMenu ? (
                <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
                  <p className="text-[#6A7279] mb-3 text-sm">Add new treatment:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleAddNewTreatment('Composite')}
                      size="sm"
                      className="bg-[#1E6E97] hover:bg-[#175A7A] text-white"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Restorative Dentistry
                    </Button>
                    <Button
                      onClick={() => handleAddNewTreatment('Implant')}
                      size="sm"
                      variant="outline"
                      className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Implant
                    </Button>
                    <Button
                      onClick={() => handleAddNewTreatment('Root Canal')}
                      size="sm"
                      variant="outline"
                      className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Root Canal
                    </Button>
                    <Button
                      onClick={() => handleAddNewTreatment('Surgery')}
                      size="sm"
                      variant="outline"
                      className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Surgery
                    </Button>
                    <Button
                      onClick={() => handleAddNewTreatment('Periodontics')}
                      size="sm"
                      variant="outline"
                      className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Periodontics
                    </Button>
                    <Button
                      onClick={() => handleAddNewTreatment('Orthodontics')}
                      size="sm"
                      variant="outline"
                      className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Orthodontics
                    </Button>
                    <Button
                      onClick={() => handleAddNewTreatment('Pediatric')}
                      size="sm"
                      variant="outline"
                      className="border-[#1E6E97] text-[#1E6E97] hover:bg-[#E8F4F8]"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Pediatric
                    </Button>
                    <Button
                      onClick={() => setShowAddTreatmentMenu(false)}
                      size="sm"
                      variant="ghost"
                      className="text-[#6A7279]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAddTreatmentMenu(true)}
                  variant="outline"
                  className="w-full border-dashed border-[#D9DEE2] text-[#6A7279] hover:border-[#1E6E97] hover:text-[#1E6E97] rounded-[16px]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Treatment
                </Button>
              )}
            </div>

            {/* Remove All */}
            <div className="pt-4 border-t border-[#D9DEE2]">
              <Button
                onClick={() => onRemoveAllTreatments(toothNumber)}
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50 rounded-[16px]"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove All Treatments
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}