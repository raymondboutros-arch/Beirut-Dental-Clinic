import { Bell, CalendarCheck, FileText, AlertTriangle, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'appointment' | 'treatment' | 'alert' | 'reminder';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    description: 'Raymond Boutros - General Checkup tomorrow at 10:00 AM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'treatment',
    title: 'Treatment Plan Updated',
    description: 'Composite filling for Tooth #14 has been marked as completed',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'alert',
    title: 'Medical Alert Reminder',
    description: 'Patient Raymond Boutros has Penicillin allergy - verify prescriptions',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Follow-up Required',
    description: 'Tooth #26 implant - 6 month follow-up due next week',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'appointment',
    title: 'Appointment Confirmed',
    description: 'New patient Sarah M. confirmed for Feb 28 at 2:00 PM',
    time: '3 days ago',
    read: true,
  },
  {
    id: '6',
    type: 'treatment',
    title: 'X-Ray Results Ready',
    description: 'Panoramic X-ray results for Raymond Boutros are available',
    time: '4 days ago',
    read: true,
  },
];

function getIcon(type: string) {
  switch (type) {
    case 'appointment':
      return <CalendarCheck className="w-5 h-5 text-[#1E6E97]" />;
    case 'treatment':
      return <FileText className="w-5 h-5 text-[#2D9F6F]" />;
    case 'alert':
      return <AlertTriangle className="w-5 h-5 text-[#E5683D]" />;
    case 'reminder':
      return <Bell className="w-5 h-5 text-[#8B6CC1]" />;
    default:
      return <Bell className="w-5 h-5 text-[#8AA4B1]" />;
  }
}

function getBgColor(type: string) {
  switch (type) {
    case 'appointment':
      return 'bg-[#E8F4F8]';
    case 'treatment':
      return 'bg-[#E8F5EF]';
    case 'alert':
      return 'bg-[#FEF0EB]';
    case 'reminder':
      return 'bg-[#F0EBF8]';
    default:
      return 'bg-gray-100';
  }
}

export function NotificationsScreen() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-[100px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-5 pt-5 pb-4">
        <div className="max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-medium text-[19px] text-[#1C1C1C]">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-[#6A7279] mt-0.5">
                {unreadCount} unread
              </p>
            )}
          </div>
          <button className="text-sm text-[#1E6E97] font-medium hover:opacity-80 transition-opacity">
            Mark all read
          </button>
        </div>
      </div>

      <div className="px-5 py-4 max-w-[430px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white border rounded-[14px] p-4 flex gap-3 transition-colors ${
                notification.read
                  ? 'border-[#D9DEE2]'
                  : 'border-[#1E6E97]/30 shadow-sm'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(
                  notification.type
                )}`}
              >
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`font-medium text-[#1C1C1C] ${
                      !notification.read ? '' : 'opacity-70'
                    }`}
                  >
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-[#1E6E97] flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-sm text-[#6A7279] mt-1 line-clamp-2">
                  {notification.description}
                </p>
                <p className="text-xs text-[#8AA4B1] mt-2">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
