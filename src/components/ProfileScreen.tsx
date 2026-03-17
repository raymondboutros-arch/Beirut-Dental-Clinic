import { ArrowLeft, Mail, Phone, MapPin, Award, Clock, Edit3, Camera } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileScreenProps {
  onBack: () => void;
}

const doctorProfile = {
  name: 'Dr. Jean Pierre Kalouche',
  role: 'Prosthodontist & Implantologist',
  clinic: 'Beirut Dental Clinic',
  email: 'jp.kalouche@beirutdental.com',
  phone: '+961 3 456 789',
  location: 'Mar Roukoz, Beirut, Lebanon',
  experience: '15+ years',
  license: 'LDA-20458',
  avatar: 'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWJhbmVzZSUyMG1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzIwMTkxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  specializations: ['Prosthodontics', 'Implantology', 'Cosmetic Dentistry'],
  languages: ['English', 'Arabic', 'French'],
};

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-[100px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-4 py-4 sticky top-0 z-10">
        <div className="relative flex items-center justify-center max-w-[430px] mx-auto">
          <button
            onClick={onBack}
            className="absolute left-0 p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#1C1C1C]" />
          </button>
          <h1 className="font-medium text-[19px] text-[#1C1C1C]">Profile</h1>
          <button
            className="absolute right-0 p-2 -mr-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Edit profile"
          >
            <Edit3 className="w-5 h-5 text-[#1E6E97]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6 max-w-[430px] mx-auto space-y-4">
        {/* Avatar & Name Card */}
        <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24">
              {doctorProfile.avatar ? (
                <ImageWithFallback
                  src={doctorProfile.avatar}
                  alt={doctorProfile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <AvatarFallback className="bg-[#1E6E97] text-white text-2xl">
                  DR
                </AvatarFallback>
              )}
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1E6E97] rounded-full flex items-center justify-center border-2 border-white">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <h2 className="font-semibold text-[18px] text-[#1C1C1C]">{doctorProfile.name}</h2>
          <p className="text-sm text-[#6A7279] mt-1">{doctorProfile.role}</p>
          <p className="text-xs text-[#8AA4B1] mt-0.5">{doctorProfile.clinic}</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white border border-[#D9DEE2] rounded-[16px] overflow-hidden">
          <h3 className="font-semibold text-xs text-[#8AA4B1] uppercase tracking-wider px-4 pt-4 pb-2">
            Contact Information
          </h3>
          <div className="divide-y divide-[#D9DEE2]">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <Mail className="w-[16px] h-[16px] text-[#1E6E97]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#8AA4B1]">Email</p>
                <p className="text-sm font-medium text-[#1C1C1C] truncate">{doctorProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <Phone className="w-[16px] h-[16px] text-[#1E6E97]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#8AA4B1]">Phone</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{doctorProfile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-[16px] h-[16px] text-[#1E6E97]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#8AA4B1]">Location</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{doctorProfile.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white border border-[#D9DEE2] rounded-[16px] overflow-hidden">
          <h3 className="font-semibold text-xs text-[#8AA4B1] uppercase tracking-wider px-4 pt-4 pb-2">
            Professional Details
          </h3>
          <div className="divide-y divide-[#D9DEE2]">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <Clock className="w-[16px] h-[16px] text-[#1E6E97]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#8AA4B1]">Experience</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{doctorProfile.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                <Award className="w-[16px] h-[16px] text-[#1E6E97]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#8AA4B1]">License Number</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{doctorProfile.license}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
          <h3 className="font-semibold text-xs text-[#8AA4B1] uppercase tracking-wider mb-3">
            Specializations
          </h3>
          <div className="flex flex-wrap gap-2">
            {doctorProfile.specializations.map((spec) => (
              <span
                key={spec}
                className="bg-[#E8F4F8] text-[#1E6E97] text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white border border-[#D9DEE2] rounded-[16px] p-4">
          <h3 className="font-semibold text-xs text-[#8AA4B1] uppercase tracking-wider mb-3">
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {doctorProfile.languages.map((lang) => (
              <span
                key={lang}
                className="bg-[#F0F3F5] text-[#6A7279] text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
