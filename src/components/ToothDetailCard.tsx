import { useState } from 'react';
import { ChevronDown, ChevronUp, X, Edit2, Mic } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface CompositeToothData {
  toothNumber: number;
  class: string;
  surfaces: string[];
  depthFlags: string[];
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface ImplantToothData {
  toothNumber: number;
  implantSystem: string;
  diameter: string;
  length: string;
  implantFlags: string[];
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

type ToothData = CompositeToothData | ImplantToothData;

interface ToothDetailCardProps {
  toothNumber: number;
  treatmentType: string;
  data: ToothData;
  onUpdate: (toothNumber: number, data: Partial<ToothData>) => void;
  onRemove: (toothNumber: number) => void;
  onClose: () => void;
  onSave: (toothNumber: number) => void;
}

export function ToothDetailCard({ toothNumber, treatmentType, data, onUpdate, onRemove, onClose, onSave }: ToothDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(toothNumber);
    setIsEditing(false);
  };

  // Composite specific data
  const surfaces = ['O', 'M', 'D', 'B/F', 'L/P'];
  const depthFlags = ['Pulp exposed', 'Very deep', 'Monitor in 6 months'];

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
  const implantFlags = [
    'Immediate implant',
    'Delayed implant',
    'Sinus lift required',
    'Bone graft',
    'Final torque achieved',
    'Healing abutment placed',
    'Temporary crown placed',
  ];

  // Get diameter options based on implant system
  const getDiameterOptions = (system: string): string[] => {
    if (system === 'Tissue Level (RN)' || system === 'Tissue Level (WN)') {
      return ['4.1', '4.8'];
    } else if (system === 'BLT') {
      return ['2.9', '3.3', '4.1', '4.8'];
    } else {
      return ['3.3', '3.75', '4.0', '4.5', '5.5', '6.5'];
    }
  };

  // Get length options based on implant system
  const getLengthOptions = (system: string): string[] => {
    if (system === 'Tissue Level (RN)' || system === 'Tissue Level (WN)') {
      return ['6', '8', '10', '12'];
    } else if (system === 'BLT') {
      return ['8', '10', '12'];
    } else {
      return ['6', '8', '10', '12', '14'];
    }
  };

  const handleSurfaceToggle = (surface: string) => {
    const compositeData = data as CompositeToothData;
    const currentSurfaces = compositeData.surfaces || [];
    const newSurfaces = currentSurfaces.includes(surface)
      ? currentSurfaces.filter(s => s !== surface)
      : [...currentSurfaces, surface];
    onUpdate(toothNumber, { surfaces: newSurfaces });
  };

  const handleDepthFlagToggle = (flag: string) => {
    const compositeData = data as CompositeToothData;
    const currentFlags = compositeData.depthFlags || [];
    const newFlags = currentFlags.includes(flag)
      ? currentFlags.filter(f => f !== flag)
      : [...currentFlags, flag];
    onUpdate(toothNumber, { depthFlags: newFlags });
  };

  const handleImplantFlagToggle = (flag: string) => {
    const implantData = data as ImplantToothData;
    const currentFlags = implantData.implantFlags || [];
    const newFlags = currentFlags.includes(flag)
      ? currentFlags.filter(f => f !== flag)
      : [...currentFlags, flag];
    onUpdate(toothNumber, { implantFlags: newFlags });
  };

  const handleImplantSystemChange = (system: string) => {
    const diameterOptions = getDiameterOptions(system);
    const lengthOptions = getLengthOptions(system);
    onUpdate(toothNumber, {
      implantSystem: system,
      diameter: diameterOptions[0],
      length: lengthOptions[0],
    });
  };

  // Helper to get price display
  const getPriceDisplay = () => {
    if (data.priceOption === 'custom') {
      return data.customPrice ? `$${data.customPrice}` : 'Custom (not set)';
    }
    return `$${data.priceOption}`;
  };

  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-900 hover:text-[#6366F1] transition-colors"
        >
          <span>Tooth {toothNumber}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-[#6366F1] hover:bg-[#6366F1]/10"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {!isEditing ? (
            // Read-only view
            <div className="space-y-3">
              {treatmentType === 'Composite' ? (
                <>
                  <div>
                    <Label className="text-gray-500 text-xs">Class</Label>
                    <p className="text-gray-900 mt-1">{(data as CompositeToothData).class || 'Not set'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Surfaces</Label>
                    <p className="text-gray-900 mt-1">
                      {(data as CompositeToothData).surfaces && (data as CompositeToothData).surfaces.length > 0
                        ? (data as CompositeToothData).surfaces.join(', ')
                        : 'None'}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Depth Flags</Label>
                    <p className="text-gray-900 mt-1">
                      {(data as CompositeToothData).depthFlags && (data as CompositeToothData).depthFlags.length > 0
                        ? (data as CompositeToothData).depthFlags.join(', ')
                        : 'None'}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Status</Label>
                    <p className="text-gray-900 mt-1">{data.status}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Price</Label>
                    <p className="text-gray-900 mt-1">{getPriceDisplay()}</p>
                  </div>
                  
                  {data.notes && (
                    <div>
                      <Label className="text-gray-500 text-xs">Notes</Label>
                      <p className="text-gray-900 mt-1 whitespace-pre-wrap">{data.notes}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-gray-500 text-xs">Implant System</Label>
                    <p className="text-gray-900 mt-1">{(data as ImplantToothData).implantSystem || 'Not set'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Diameter</Label>
                    <p className="text-gray-900 mt-1">{(data as ImplantToothData).diameter || 'Not set'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Length</Label>
                    <p className="text-gray-900 mt-1">{(data as ImplantToothData).length ? `${(data as ImplantToothData).length} mm` : 'Not set'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Implant Flags</Label>
                    <p className="text-gray-900 mt-1">
                      {(data as ImplantToothData).implantFlags && (data as ImplantToothData).implantFlags.length > 0
                        ? (data as ImplantToothData).implantFlags.join(', ')
                        : 'None'}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Status</Label>
                    <p className="text-gray-900 mt-1">{data.status}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-xs">Price</Label>
                    <p className="text-gray-900 mt-1">{getPriceDisplay()}</p>
                  </div>
                  
                  {data.notes && (
                    <div>
                      <Label className="text-gray-500 text-xs">Notes</Label>
                      <p className="text-gray-900 mt-1 whitespace-pre-wrap">{data.notes}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            // Edit mode
            <>
              {treatmentType === 'Composite' ? (
                <>
              {/* Class */}
              <div className="space-y-2">
                <Label className="text-gray-700">Class</Label>
                <Select
                  value={(data as CompositeToothData).class}
                  onValueChange={(value) => {
                    // Clear surfaces that are not available for the new class
                    const availableSurfaces = getAvailableSurfaces(value);
                    const currentSurfaces = (data as CompositeToothData).surfaces || [];
                    const validSurfaces = currentSurfaces.filter(s => availableSurfaces.includes(s));
                    onUpdate(toothNumber, { class: value, surfaces: validSurfaces });
                  }}
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
              <div className="space-y-2">
                <Label className="text-gray-700">Surfaces</Label>
                {getAvailableSurfaces((data as CompositeToothData).class).length > 0 ? (
                  <div className="flex gap-4 flex-wrap">
                    {getAvailableSurfaces((data as CompositeToothData).class).map((surface) => (
                      <div key={surface} className="flex items-center gap-2">
                        <Checkbox
                          id={`${toothNumber}-${surface}`}
                          checked={((data as CompositeToothData).surfaces || []).includes(surface)}
                          onCheckedChange={() => handleSurfaceToggle(surface)}
                          className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                        />
                        <Label htmlFor={`${toothNumber}-${surface}`} className="text-gray-700 cursor-pointer">
                          {surface}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No surfaces available for Class V</p>
                )}
              </div>

              {/* Depth Flags */}
              <div className="space-y-2">
                <Label className="text-gray-700">Depth Flags</Label>
                <div className="space-y-2">
                  {depthFlags.map((flag) => (
                    <div key={flag} className="flex items-center gap-2">
                      <Checkbox
                        id={`${toothNumber}-${flag}`}
                        checked={((data as CompositeToothData).depthFlags || []).includes(flag)}
                        onCheckedChange={() => handleDepthFlagToggle(flag)}
                        className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                      />
                      <Label htmlFor={`${toothNumber}-${flag}`} className="text-gray-700 cursor-pointer">
                        {flag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label className="text-gray-700">Price</Label>
                <RadioGroup
                  value={data.priceOption}
                  onValueChange={(value) => onUpdate(toothNumber, { priceOption: value })}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="70" id={`${toothNumber}-70`} className="border-gray-300 text-[#6366F1]" />
                      <Label htmlFor={`${toothNumber}-70`} className="text-gray-700 cursor-pointer">
                        $70
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="100" id={`${toothNumber}-100`} className="border-gray-300 text-[#6366F1]" />
                      <Label htmlFor={`${toothNumber}-100`} className="text-gray-700 cursor-pointer">
                        $100
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="custom" id={`${toothNumber}-custom`} className="border-gray-300 text-[#6366F1]" />
                      <Label htmlFor={`${toothNumber}-custom`} className="text-gray-700 cursor-pointer">
                        Custom
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
                {data.priceOption === 'custom' && (
                  <Input
                    type="number"
                    placeholder="Enter custom price"
                    value={data.customPrice}
                    onChange={(e) => onUpdate(toothNumber, { customPrice: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                  />
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-700">Notes</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-500 hover:text-[#6366F1] hover:bg-[#6366F1]/10"
                    onClick={() => {
                      // Voice recording functionality would go here
                      console.log('Voice recording activated for tooth:', toothNumber);
                    }}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Add treatment notes..."
                  value={data.notes}
                  onChange={(e) => onUpdate(toothNumber, { notes: e.target.value })}
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 min-h-[80px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#6366F1] hover:bg-[#5558E3] text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={() => onRemove(toothNumber)}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Implant System */}
              <div className="space-y-2">
                <Label className="text-gray-700">Implant System</Label>
                <Select
                  value={(data as ImplantToothData).implantSystem}
                  onValueChange={handleImplantSystemChange}
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
                  value={(data as ImplantToothData).diameter}
                  onValueChange={(value) => onUpdate(toothNumber, { diameter: value })}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {getDiameterOptions((data as ImplantToothData).implantSystem).map((diameter) => (
                      <SelectItem key={diameter} value={diameter}>
                        {diameter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Length */}
              <div className="space-y-2">
                <Label className="text-gray-700">Length</Label>
                <Select
                  value={(data as ImplantToothData).length}
                  onValueChange={(value) => onUpdate(toothNumber, { length: value })}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {getLengthOptions((data as ImplantToothData).implantSystem).map((length) => (
                      <SelectItem key={length} value={length}>
                        {length} mm
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Implant Flags */}
              <div className="space-y-2">
                <Label className="text-gray-700">Implant Flags</Label>
                <div className="space-y-2">
                  {implantFlags.map((flag) => (
                    <div key={flag} className="flex items-center gap-2">
                      <Checkbox
                        id={`${toothNumber}-${flag}`}
                        checked={((data as ImplantToothData).implantFlags || []).includes(flag)}
                        onCheckedChange={() => handleImplantFlagToggle(flag)}
                        className="border-gray-300 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                      />
                      <Label htmlFor={`${toothNumber}-${flag}`} className="text-gray-700 cursor-pointer">
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
                  value={data.status}
                  onValueChange={(value) => onUpdate(toothNumber, { status: value })}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="Planned">Planned</SelectItem>
                    <SelectItem value="In progress">In progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label className="text-gray-700">Price</Label>
                <RadioGroup
                  value={data.priceOption}
                  onValueChange={(value) => onUpdate(toothNumber, { priceOption: value })}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="300" id={`${toothNumber}-300`} className="border-gray-300 text-[#6366F1]" />
                      <Label htmlFor={`${toothNumber}-300`} className="text-gray-700 cursor-pointer">
                        $300
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="500" id={`${toothNumber}-500`} className="border-gray-300 text-[#6366F1]" />
                      <Label htmlFor={`${toothNumber}-500`} className="text-gray-700 cursor-pointer">
                        $500
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="custom" id={`${toothNumber}-custom`} className="border-gray-300 text-[#6366F1]" />
                      <Label htmlFor={`${toothNumber}-custom`} className="text-gray-700 cursor-pointer">
                        Custom
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
                {data.priceOption === 'custom' && (
                  <Input
                    type="number"
                    placeholder="Enter custom price"
                    value={data.customPrice}
                    onChange={(e) => onUpdate(toothNumber, { customPrice: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                  />
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-gray-700">Notes</Label>
                <Textarea
                  placeholder="Add treatment notes..."
                  value={data.notes}
                  onChange={(e) => onUpdate(toothNumber, { notes: e.target.value })}
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 min-h-[80px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#6366F1] hover:bg-[#5558E3] text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={() => onRemove(toothNumber)}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </>
          )}
            </>
          )}
        </div>
      )}
    </Card>
  );
}
