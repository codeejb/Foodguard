import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Flame,
  Clock,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Calendar,
  Thermometer,
  Microscope,
  Info,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';

export const NotificationCenterModal: React.FC = () => {
  const {
    notifications,
    notificationPreferences,
    updateNotificationPreferences,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotification,
    clearAllNotifications,
    unreadNotificationsCount,
    criticalNotificationsCount,
    isNotificationModalOpen,
    setIsNotificationModalOpen,
    setSelectedBatchId,
    setActiveTab,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EXPIRATION' | 'SAFETY' | 'UNREAD'>('ALL');
  const [showPreferences, setShowPreferences] = useState<boolean>(false);

  if (!isNotificationModalOpen) return null;

  const filteredList = notifications.filter(n => {
    if (activeFilter === 'UNREAD') return !n.isRead;
    if (activeFilter === 'EXPIRATION') return n.type === 'EXPIRATION';
    if (activeFilter === 'SAFETY') return n.type.startsWith('SAFETY_') || n.type === 'COMPLAINT_CLUSTER';
    return true;
  });

  const handleInspectBatch = (batchId?: string) => {
    if (batchId) {
      setSelectedBatchId(batchId);
      setActiveTab('dashboard');
      setIsNotificationModalOpen(false);
    }
  };

  const getSeverityBadge = (sev: NotificationItem['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 text-[10px] font-extrabold bg-red-100 text-red-800 rounded-md border border-red-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            CRITICAL
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-md border border-amber-200">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-md border border-blue-200">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
            SYSTEM
          </span>
        );
    }
  };

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'EXPIRATION':
        return <Clock className="w-4 h-4 text-red-600" />;
      case 'SAFETY_TEMP':
        return <Thermometer className="w-4 h-4 text-amber-600" />;
      case 'SAFETY_MICROBIAL':
        return <Microscope className="w-4 h-4 text-purple-600" />;
      case 'SAFETY_RISK':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'COMPLAINT_CLUSTER':
        return <Flame className="w-4 h-4 text-orange-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="notification-center-modal"
        className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Bell className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900">Food Safety & Expiration Alerts</h3>
                {unreadNotificationsCount > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-600 text-white rounded-full">
                    {unreadNotificationsCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Live surveillance feed for shelf-life warnings and critical food safety deviations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                showPreferences ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Notification Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsNotificationModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Preferences Drawer */}
        {showPreferences && (
          <div className="bg-[#F9FBFC] p-4 border-b border-slate-200/80 space-y-3 animate-in slide-in-from-top-2 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                Notification Preferences
              </span>
              <button
                onClick={() => {
                  setShowPreferences(false);
                  setActiveTab('profile');
                  setIsNotificationModalOpen(false);
                }}
                className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                Full Profile Settings <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <span className="font-medium text-slate-700">Near Expiration Warnings</span>
                <input
                  type="checkbox"
                  checked={notificationPreferences.enableExpirationAlerts}
                  onChange={(e) => updateNotificationPreferences({ enableExpirationAlerts: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <span className="font-medium text-slate-700">Cold-Chain Temp Violations</span>
                <input
                  type="checkbox"
                  checked={notificationPreferences.enableTemperatureAlerts}
                  onChange={(e) => updateNotificationPreferences({ enableTemperatureAlerts: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <span className="font-medium text-slate-700">Microbial Lab Spikes</span>
                <input
                  type="checkbox"
                  checked={notificationPreferences.enableMicrobialAlerts}
                  onChange={(e) => updateNotificationPreferences({ enableMicrobialAlerts: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <span className="font-medium text-slate-700">Citizen Complaint Clusters</span>
                <input
                  type="checkbox"
                  checked={notificationPreferences.enableComplaintClusterAlerts}
                  onChange={(e) => updateNotificationPreferences({ enableComplaintClusterAlerts: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* Filter Pills & Bulk Action Bar */}
        <div className="px-6 py-3 bg-[#F9FBFC] border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                activeFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveFilter('EXPIRATION')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all flex items-center gap-1 ${
                activeFilter === 'EXPIRATION'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Expiration ({notifications.filter(n => n.type === 'EXPIRATION').length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('SAFETY')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all flex items-center gap-1 ${
                activeFilter === 'SAFETY'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Safety Anomalies ({notifications.filter(n => n.type.startsWith('SAFETY_') || n.type === 'COMPLAINT_CLUSTER').length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('UNREAD')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                activeFilter === 'UNREAD'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Unread ({unreadNotificationsCount})
            </button>
          </div>

          <div className="flex items-center gap-2">
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-200/60 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mark Read</span>
              </button>
            )}
            <button
              onClick={clearAllNotifications}
              className="text-xs font-bold text-slate-500 hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
              title="Clear all alerts"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Notification Scrollable List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredList.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-800">All Clear! No alerts matching current filter</h4>
              <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                Surveillance loggers and shelf-life tracking are operating smoothly across Delhi NCR nodes.
              </p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                  item.isRead
                    ? 'bg-white border-slate-200/80 hover:border-slate-300'
                    : 'bg-emerald-50/25 border-emerald-200/90 shadow-xs hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      {getIconForType(item.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className={`text-xs font-extrabold ${item.isRead ? 'text-slate-800' : 'text-slate-900'}`}>
                          {item.title}
                        </h4>
                        {getSeverityBadge(item.severity)}
                        {!item.isRead && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {item.message}
                      </p>

                      {/* Item Details Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1.5 text-[11px] font-medium text-slate-500">
                        {item.batchId && (
                          <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold">
                            {item.batchId}
                          </span>
                        )}
                        {item.warehouseName && (
                          <span>📍 {item.warehouseName}</span>
                        )}
                        {item.expiryDate && (
                          <span className="text-red-700 font-bold">📅 Expiry: {item.expiryDate}</span>
                        )}
                        <span>• {item.timestamp}</span>
                      </div>

                      {item.recommendedAction && (
                        <div className="mt-2 text-[11px] font-bold bg-amber-50/70 border border-amber-200/80 text-amber-900 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                          <span>Recommended Action: {item.recommendedAction}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions (Inspect / Clear) */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.batchId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspectBatch(item.batchId);
                        }}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <span>Audit</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(item.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Dismiss notification"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F9FBFC] border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Telemetry active: 19 Delhi Cold-Chain Nodes & OpenStreetMap Grid</span>
          </div>
          <button
            onClick={() => setIsNotificationModalOpen(false)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
