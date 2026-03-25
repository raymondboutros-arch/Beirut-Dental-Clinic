import { useState, useEffect } from 'react';
import { Homepage } from './components/Homepage';
import { ServiceSelection } from './components/ServiceSelection';
import { StaffSelection } from './components/StaffSelection';
import { DateTimeSelection } from './components/DateTimeSelection';
import { ReviewAndPay } from './components/ReviewAndPay';
import { TreatmentDashboard } from './components/TreatmentDashboard';
import { ToothDetailPage } from './components/ToothDetailPage';
import { SearchScreen } from './components/SearchScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { MenuScreen } from './components/MenuScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

type ActiveTab = 'home' | 'search' | 'notifications' | 'menu';
type Screen = 'home' | 'service-selection' | 'staff-selection' | 'datetime-selection' | 'review-pay' | 'dashboard' | 'profile';

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
  subCategory: string;
  canalCount: string;
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
  subCategory: 'Extractions' | 'Bone Graft' | 'Apicectomy' | 'Frenectomy' | 'Crown Lengthening' | 'Hemisection';
  extractionType?: string;
  graftType?: string;
  graftBrand?: string;
  graftProcedure?: string;
  membraneType?: string;
  sinusApproach?: string;
  sinusImplant?: string;
  crownLengtheningScope?: string;
  crownLengtheningTeeth?: string;
  apicectomyTechnique?: string;
  frenectomyType?: string;
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
  perioFields: Record<string, string | string[]>;
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
  orthoFields: Record<string, string | string[]>;
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
  pedoFields: Record<string, string | string[]>;
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

interface BridgeTooth {
  toothNumber: number;
  role: 'abutment' | 'pontic';
}

interface BridgeGroup {
  id: string;
  teeth: { toothNumber: number; role: 'abutment' | 'pontic'; treatmentId: string }[];
  createdAt: string;
}

interface ProstheticsToothData {
  id: string;
  toothNumber: number;
  treatmentType: 'Prosthetics';
  visitDate: string;
  subCategory: string;
  prosthFields: Record<string, string | string[]>;
  bridgeGroupId?: string;
  bridgeRole?: 'abutment' | 'pontic';
  status: string;
  priceOption: string;
  customPrice: string;
  notes: string;
}

type ToothData = CompositeToothData | ImplantToothData | RootCanalToothData | SurgeryToothData | PeriodonticsToothData | OrthodonticsToothData | PediatricToothData | ProstheticsToothData;

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);
  const [teethData, setTeethData] = useState<Record<number, ToothData[]>>({});
  const [savedTeeth, setSavedTeeth] = useState<number[]>([]);
  const [savedPayload, setSavedPayload] = useState<any>(null);
  const [bridgeGroups, setBridgeGroups] = useState<Record<string, BridgeGroup>>({});

  // Booking flow state
  const [bookingService, setBookingService] = useState<string>('');
  const [bookingStaff, setBookingStaff] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('dentalTreatmentData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.teethData) {
          const convertedData: Record<number, ToothData[]> = {};
          Object.keys(parsed.teethData).forEach(toothNum => {
            const toothData = parsed.teethData[toothNum];
            if (Array.isArray(toothData)) {
              convertedData[Number(toothNum)] = toothData;
            } else if (toothData && typeof toothData === 'object') {
              const treatmentWithId = {
                ...toothData,
                id: toothData.id || `${toothNum}-${Date.now()}`,
              };
              convertedData[Number(toothNum)] = [treatmentWithId];
            }
          });
          setTeethData(convertedData);
        }
        if (parsed.savedTeeth) setSavedTeeth(parsed.savedTeeth);
        if (parsed.bridgeGroups) setBridgeGroups(parsed.bridgeGroups);
      } catch (e) {
        console.error('Error loading saved data:', e);
        localStorage.removeItem('dentalTreatmentData');
      }
    }
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    }
    // Close any open tooth detail
    setSelectedTeeth([]);
  };

  const handleBookNow = () => {
    setCurrentScreen('service-selection');
    setActiveTab('home');
  };

  const handleServiceContinue = (service: string) => {
    setBookingService(service);
    setCurrentScreen('staff-selection');
  };

  const handleStaffContinue = (staffId: string) => {
    setBookingStaff(staffId);
    setCurrentScreen('datetime-selection');
  };

  const handleDateTimeContinue = (date: string, time: string) => {
    setBookingDate(date);
    setBookingTime(time);
    setCurrentScreen('review-pay');
  };

  const handleBookingConfirmed = () => {
    // Reset booking state
    setBookingService('');
    setBookingStaff('');
    setBookingDate('');
    setBookingTime('');
    setCurrentScreen('home');
    toast.success('Appointment booked successfully!');
  };

  const handleToothToggle = (toothNumber: number) => {
    if (selectedTeeth.includes(toothNumber)) {
      setSelectedTeeth([]);
    } else {
      setSelectedTeeth([toothNumber]);
      if (!teethData[toothNumber]) {
        setTeethData({ ...teethData, [toothNumber]: [] });
      }
    }
  };

  const handleAddTreatment = (toothNumber: number, treatmentType: 'Composite' | 'Implant' | 'Root Canal' | 'Surgery' | 'Periodontics' | 'Orthodontics' | 'Pediatric' | 'Prosthetics') => {
    const newTreatment = treatmentType === 'Composite'
      ? {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Composite' as const,
          visitDate: new Date().toISOString().split('T')[0],
          material: 'Composite direct',
          class: 'Class I',
          surfaces: [],
          depthFlags: [],
          status: 'Planned',
          priceOption: '70',
          customPrice: '',
          notes: '',
        }
      : treatmentType === 'Implant'
      ? {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Implant' as const,
          visitDate: new Date().toISOString().split('T')[0],
          implantSystem: 'Tissue Level (RN)',
          diameter: '4.1',
          length: '8',
          status: 'Planned',
          priceOption: '300',
          customPrice: '',
          notes: '',
        }
      : treatmentType === 'Root Canal'
      ? {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Root Canal' as const,
          visitDate: new Date().toISOString().split('T')[0],
          subCategory: 'BIO',
          canalCount: 'Single canal',
          status: 'Planned',
          priceOption: '1200',
          customPrice: '',
          notes: '',
        }
      : treatmentType === 'Surgery'
      ? {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Surgery' as const,
          visitDate: new Date().toISOString().split('T')[0],
          subCategory: 'Extractions' as const,
          extractionType: 'Simple Extraction',
          graftType: '',
          membraneType: '',
          status: 'Planned',
          priceOption: '100',
          customPrice: '',
          notes: '',
        }
      : treatmentType === 'Orthodontics'
      ? {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Orthodontics' as const,
          visitDate: new Date().toISOString().split('T')[0],
          subCategory: 'Fixed Braces',
          orthoFields: {} as Record<string, string | string[]>,
          status: 'Planned',
          priceOption: '2000',
          customPrice: '',
          notes: '',
        }
      : treatmentType === 'Pediatric'
      ? {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Pediatric' as const,
          visitDate: new Date().toISOString().split('T')[0],
          subCategory: 'Pit & Fissure Sealant',
          pedoFields: {} as Record<string, string | string[]>,
          status: 'Planned',
          priceOption: '50',
          customPrice: '',
          notes: '',
        }
      : treatmentType === 'Prosthetics'
      ? {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Prosthetics' as const,
          visitDate: new Date().toISOString().split('T')[0],
          subCategory: 'Single Crown',
          prosthFields: {} as Record<string, string | string[]>,
          status: 'Planned',
          priceOption: '300',
          customPrice: '',
          notes: '',
        }
      : {
          id: `${toothNumber}-${Date.now()}`,
          toothNumber,
          treatmentType: 'Periodontics' as const,
          visitDate: new Date().toISOString().split('T')[0],
          subCategory: 'Scaling & Root Planing',
          perioFields: {},
          status: 'Planned',
          priceOption: '100',
          customPrice: '',
          notes: '',
        };

    const existingTreatments = teethData[toothNumber] || [];
    setTeethData({ ...teethData, [toothNumber]: [...existingTreatments, newTreatment] });
    return newTreatment.id;
  };

  const handleTreatmentUpdate = (toothNumber: number, treatmentId: string, updates: Partial<ToothData>) => {
    const treatments = teethData[toothNumber] || [];
    const updatedTreatments = treatments.map(t =>
      t.id === treatmentId ? { ...t, ...updates } : t
    );
    setTeethData({ ...teethData, [toothNumber]: updatedTreatments });
  };

  const handleTreatmentRemove = (toothNumber: number, treatmentId: string) => {
    const treatments = teethData[toothNumber] || [];
    const updatedTreatments = treatments.filter(t => t.id !== treatmentId);
    setTeethData({ ...teethData, [toothNumber]: updatedTreatments });
    if (updatedTreatments.length === 0) {
      const updatedSavedTeeth = savedTeeth.filter(t => t !== toothNumber);
      setSavedTeeth(updatedSavedTeeth);
    }
    const dataToSave = {
      teethData: { ...teethData, [toothNumber]: updatedTreatments },
      savedTeeth: updatedTreatments.length === 0 ? savedTeeth.filter(t => t !== toothNumber) : savedTeeth,
      bridgeGroups,
    };
    localStorage.setItem('dentalTreatmentData', JSON.stringify(dataToSave));
    rebuildPayload();
    toast.success('Treatment removed');
  };

  const rebuildPayload = () => {
    const compositeTeeth: any[] = [];
    const implantTeeth: any[] = [];
    const rootCanalTeeth: any[] = [];
    const surgeryTeeth: any[] = [];
    const periodonticsTeeth: any[] = [];
    const orthodonticsTeeth: any[] = [];
    const pediatricTeeth: any[] = [];
    const prostheticsTeeth: any[] = [];
    let totalCost = 0;

    savedTeeth.forEach(toothNum => {
      const treatments = teethData[toothNum] || [];
      treatments.forEach(treatment => {
        const price = treatment.priceOption === 'custom'
          ? parseFloat(treatment.customPrice) || 0
          : parseFloat(treatment.priceOption);
        totalCost += price;

        if (treatment.treatmentType === 'Composite') {
          const d = treatment as CompositeToothData;
          compositeTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, material: d.material, class: d.class, surfaces: d.surfaces, depthFlags: d.depthFlags, status: d.status, price, notes: d.notes });
        } else if (treatment.treatmentType === 'Implant') {
          const d = treatment as ImplantToothData;
          implantTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, implantSystem: d.implantSystem, diameter: d.diameter, length: d.length, status: d.status, price, notes: d.notes });
        } else if (treatment.treatmentType === 'Root Canal') {
          const d = treatment as RootCanalToothData;
          rootCanalTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, subCategory: d.subCategory, canalCount: d.canalCount, status: d.status, price, notes: d.notes });
        } else if (treatment.treatmentType === 'Surgery') {
          const d = treatment as SurgeryToothData;
          surgeryTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, subCategory: d.subCategory, extractionType: d.extractionType, graftType: d.graftType, membraneType: d.membraneType, status: d.status, price, notes: d.notes });
        } else if (treatment.treatmentType === 'Orthodontics') {
          const d = treatment as OrthodonticsToothData;
          orthodonticsTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, subCategory: d.subCategory, orthoFields: d.orthoFields, status: d.status, price, notes: d.notes });
        } else if (treatment.treatmentType === 'Pediatric') {
          const d = treatment as PediatricToothData;
          pediatricTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, subCategory: d.subCategory, pedoFields: d.pedoFields, status: d.status, price, notes: d.notes });
        } else if (treatment.treatmentType === 'Prosthetics') {
          const d = treatment as ProstheticsToothData;
          prostheticsTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, subCategory: d.subCategory, prosthFields: d.prosthFields, status: d.status, price, notes: d.notes });
        } else {
          const d = treatment as PeriodonticsToothData;
          periodonticsTeeth.push({ toothNumber: toothNum, visitDate: d.visitDate, subCategory: d.subCategory, perioFields: d.perioFields, status: d.status, price, notes: d.notes });
        }
      });
    });

    const payload: any = { patient: { id: 'P-00123', name: 'John Doe' }, treatments: [] };
    if (compositeTeeth.length > 0) payload.treatments.push({ type: 'Composite', restorations: compositeTeeth });
    if (implantTeeth.length > 0) payload.treatments.push({ type: 'Implant', implants: implantTeeth });
    if (rootCanalTeeth.length > 0) payload.treatments.push({ type: 'Root Canal', rootCanals: rootCanalTeeth });
    if (surgeryTeeth.length > 0) payload.treatments.push({ type: 'Surgery', surgeries: surgeryTeeth });
    if (periodonticsTeeth.length > 0) payload.treatments.push({ type: 'Periodontics', periodontics: periodonticsTeeth });
    if (orthodonticsTeeth.length > 0) payload.treatments.push({ type: 'Orthodontics', orthodontics: orthodonticsTeeth });
    if (pediatricTeeth.length > 0) payload.treatments.push({ type: 'Pediatric', pediatrics: pediatricTeeth });
    if (prostheticsTeeth.length > 0) payload.treatments.push({ type: 'Prosthetics', prosthetics: prostheticsTeeth });
    payload.totalCost = totalCost;
    payload.timestamp = new Date().toISOString();
    setSavedPayload(payload);
  };

  const handleToothSave = (toothNumber: number) => {
    const updatedSavedTeeth = savedTeeth.includes(toothNumber)
      ? savedTeeth
      : [...savedTeeth, toothNumber];
    setSavedTeeth(updatedSavedTeeth);
    const dataToSave = { teethData, savedTeeth: updatedSavedTeeth, bridgeGroups };
    localStorage.setItem('dentalTreatmentData', JSON.stringify(dataToSave));
    rebuildPayload();
    toast.success(`Tooth ${toothNumber} details saved`);
  };

  const handleBridgeSave = (
    originToothNumber: number,
    existingBridgeGroupId: string | null,
    bridgeTeeth: { toothNumber: number; role: 'abutment' | 'pontic' }[],
    sharedFields: Record<string, string | string[]>,
    sharedMeta: { visitDate: string; subCategory: string; status: string; priceOption: string; customPrice: string; notes: string }
  ) => {
    const groupId = existingBridgeGroupId || `bridge-${Date.now()}`;
    const newTeethData = { ...teethData };
    let newSavedTeeth = [...savedTeeth];
    const groupTeethInfo: BridgeGroup['teeth'] = [];

    // If editing existing bridge, remove old records from teeth that are no longer in the bridge
    if (existingBridgeGroupId && bridgeGroups[existingBridgeGroupId]) {
      const oldGroup = bridgeGroups[existingBridgeGroupId];
      oldGroup.teeth.forEach(oldTooth => {
        const stillInBridge = bridgeTeeth.some(bt => bt.toothNumber === oldTooth.toothNumber);
        if (!stillInBridge) {
          // Remove bridge treatment from this tooth
          const toothTreatments = newTeethData[oldTooth.toothNumber] || [];
          const filtered = toothTreatments.filter(t => t.id !== oldTooth.treatmentId);
          if (filtered.length === 0) {
            delete newTeethData[oldTooth.toothNumber];
            newSavedTeeth = newSavedTeeth.filter(t => t !== oldTooth.toothNumber);
          } else {
            newTeethData[oldTooth.toothNumber] = filtered;
          }
        }
      });
    }

    // On the origin tooth, remove the original prosthetics treatment that was being edited
    // (the one created by handleAddNewTreatment before user switched to Bridge)
    if (!existingBridgeGroupId) {
      const originTreatments = newTeethData[originToothNumber] || [];
      // Find the non-bridge prosthetics treatment on the origin tooth (the one being edited)
      const originalProsth = originTreatments.find(t =>
        t.treatmentType === 'Prosthetics' && !(t as ProstheticsToothData).bridgeGroupId
      );
      if (originalProsth) {
        newTeethData[originToothNumber] = originTreatments.filter(t => t.id !== originalProsth.id);
      }
    }

    // Create/update treatment records for each bridge tooth
    // Price: full price on origin tooth, $0 on others
    bridgeTeeth.forEach(bt => {
      const existingTreatments = newTeethData[bt.toothNumber] || [];
      const existingBridgeTreatment = existingBridgeGroupId
        ? existingTreatments.find(t => t.treatmentType === 'Prosthetics' && (t as ProstheticsToothData).bridgeGroupId === existingBridgeGroupId)
        : null;

      const isOrigin = bt.toothNumber === originToothNumber;
      const treatmentId = existingBridgeTreatment?.id || `${bt.toothNumber}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

      const treatment: ProstheticsToothData = {
        id: treatmentId,
        toothNumber: bt.toothNumber,
        treatmentType: 'Prosthetics',
        visitDate: sharedMeta.visitDate,
        subCategory: 'Bridge',
        prosthFields: { ...sharedFields },
        bridgeGroupId: groupId,
        bridgeRole: bt.role,
        status: sharedMeta.status,
        priceOption: isOrigin ? sharedMeta.priceOption : '0',
        customPrice: isOrigin ? sharedMeta.customPrice : '',
        notes: sharedMeta.notes,
      };

      if (existingBridgeTreatment) {
        // Update existing
        newTeethData[bt.toothNumber] = existingTreatments.map(t =>
          t.id === existingBridgeTreatment.id ? treatment : t
        );
      } else {
        // Add new
        newTeethData[bt.toothNumber] = [...existingTreatments, treatment];
      }

      // Ensure tooth is in savedTeeth
      if (!newSavedTeeth.includes(bt.toothNumber)) {
        newSavedTeeth.push(bt.toothNumber);
      }

      groupTeethInfo.push({ toothNumber: bt.toothNumber, role: bt.role, treatmentId });
    });

    const newBridgeGroups = {
      ...bridgeGroups,
      [groupId]: { id: groupId, teeth: groupTeethInfo, createdAt: existingBridgeGroupId ? bridgeGroups[existingBridgeGroupId]?.createdAt || new Date().toISOString() : new Date().toISOString() },
    };

    setTeethData(newTeethData);
    setSavedTeeth(newSavedTeeth);
    setBridgeGroups(newBridgeGroups);

    const dataToSave = { teethData: newTeethData, savedTeeth: newSavedTeeth, bridgeGroups: newBridgeGroups };
    localStorage.setItem('dentalTreatmentData', JSON.stringify(dataToSave));
    rebuildPayload();

    const toothNumbers = bridgeTeeth.map(bt => bt.toothNumber).sort((a, b) => a - b).join(', ');
    toast.success(`Bridge saved (teeth ${toothNumbers})`);
  };

  const handleBridgeDelete = (bridgeGroupIdToDelete: string) => {
    const group = bridgeGroups[bridgeGroupIdToDelete];
    if (!group) return;

    const newTeethData = { ...teethData };
    let newSavedTeeth = [...savedTeeth];

    group.teeth.forEach(bt => {
      const toothTreatments = newTeethData[bt.toothNumber] || [];
      const filtered = toothTreatments.filter(t => t.id !== bt.treatmentId);
      if (filtered.length === 0) {
        delete newTeethData[bt.toothNumber];
        newSavedTeeth = newSavedTeeth.filter(t => t !== bt.toothNumber);
      } else {
        newTeethData[bt.toothNumber] = filtered;
      }
    });

    const newBridgeGroups = { ...bridgeGroups };
    delete newBridgeGroups[bridgeGroupIdToDelete];

    setTeethData(newTeethData);
    setSavedTeeth(newSavedTeeth);
    setBridgeGroups(newBridgeGroups);

    const dataToSave = { teethData: newTeethData, savedTeeth: newSavedTeeth, bridgeGroups: newBridgeGroups };
    localStorage.setItem('dentalTreatmentData', JSON.stringify(dataToSave));
    rebuildPayload();

    const toothNumbers = group.teeth.map(t => t.toothNumber).sort((a, b) => a - b).join(', ');
    toast.success(`Bridge removed (teeth ${toothNumbers})`);
  };

  const handleToothRemove = (toothNumber: number) => {
    setSelectedTeeth([]);
    const newData = { ...teethData };
    delete newData[toothNumber];
    setTeethData(newData);
    const updatedSavedTeeth = savedTeeth.filter(t => t !== toothNumber);
    setSavedTeeth(updatedSavedTeeth);
    const dataToSave = { teethData: newData, savedTeeth: updatedSavedTeeth, bridgeGroups };
    localStorage.setItem('dentalTreatmentData', JSON.stringify(dataToSave));
    if (updatedSavedTeeth.length > 0) {
      rebuildPayload();
    } else {
      setSavedPayload(null);
    }
    toast.success(`Tooth ${toothNumber} removed`);
  };

  const handleClearAll = () => {
    setSelectedTeeth([]);
    setTeethData({});
    setSavedTeeth([]);
    setSavedPayload(null);
    setBridgeGroups({});
    localStorage.removeItem('dentalTreatmentData');
    toast.success('All selections cleared');
  };

  // Determine what to render
  const renderContent = () => {
    // Non-home tabs always show their own screen
    if (activeTab === 'search') return <SearchScreen />;
    if (activeTab === 'notifications') return <NotificationsScreen />;
    if (activeTab === 'menu') {
      if (currentScreen === 'profile') {
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen('home')}
          />
        );
      }
      return (
        <MenuScreen
          onNavigate={(screen) => {
            if (screen === 'dashboard') {
              setActiveTab('home');
              setCurrentScreen('dashboard');
            } else if (screen === 'profile') {
              setCurrentScreen('profile');
            }
          }}
        />
      );
    }

    // Home tab - navigate through booking flow
    if (currentScreen === 'home') {
      return <Homepage onEnterDashboard={handleBookNow} />;
    }

    if (currentScreen === 'service-selection') {
      return (
        <ServiceSelection
          onBack={() => setCurrentScreen('home')}
          onContinue={handleServiceContinue}
        />
      );
    }

    if (currentScreen === 'staff-selection') {
      return (
        <StaffSelection
          selectedService={bookingService}
          onBack={() => setCurrentScreen('service-selection')}
          onContinue={handleStaffContinue}
        />
      );
    }

    if (currentScreen === 'datetime-selection') {
      return (
        <DateTimeSelection
          onBack={() => setCurrentScreen('staff-selection')}
          onContinue={handleDateTimeContinue}
        />
      );
    }

    if (currentScreen === 'review-pay') {
      return (
        <ReviewAndPay
          selectedService={bookingService}
          selectedStaff={bookingStaff}
          selectedDate={bookingDate}
          selectedTime={bookingTime}
          onBack={() => setCurrentScreen('datetime-selection')}
          onConfirm={handleBookingConfirmed}
        />
      );
    }

    // Dashboard
    return (
      <>
        <TreatmentDashboard
          selectedTeeth={selectedTeeth}
          savedTeeth={savedTeeth}
          activeTooth={selectedTeeth[0]}
          savedPayload={savedPayload}
          bridgeGroups={bridgeGroups}
          teethData={teethData}
          onToothToggle={handleToothToggle}
          onClearAll={handleClearAll}
          onBack={() => setCurrentScreen('home')}
        />

        {/* Tooth Detail Overlay */}
        {selectedTeeth.length > 0 && selectedTeeth[0] && teethData[selectedTeeth[0]] !== undefined && (
          <ToothDetailPage
            toothNumber={selectedTeeth[0]}
            treatments={teethData[selectedTeeth[0]] || []}
            isSaved={savedTeeth.includes(selectedTeeth[0])}
            onAddTreatment={handleAddTreatment}
            onTreatmentUpdate={handleTreatmentUpdate}
            onTreatmentRemove={handleTreatmentRemove}
            onRemoveAllTreatments={handleToothRemove}
            onClose={() => setSelectedTeeth([])}
            onSave={handleToothSave}
            bridgeGroups={bridgeGroups}
            savedTeeth={savedTeeth}
            onBridgeSave={handleBridgeSave}
            onBridgeDelete={handleBridgeDelete}
          />
        )}
      </>
    );
  };

  return (
    <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto min-h-screen bg-[#FAFAFA] relative shadow-2xl">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <Toaster />
    </div>
  );
}