import React from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  Gift,
  Check,
  Send,
  Volume2
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { AppNotification } from '../types';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    notifications,
    unreadCount,
    pushPermission,
    requestPushPermission,
    markAsRead,
    markAllAsRead,
    triggerTestPush
  } = useNotification();

  if (!isOpen) return null;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'order':
        return <Gift className="w-4 h-4 text-[#E06A55]" />;
      case 'shipping':
        return <Truck className="w-4 h-4 text-emerald-600" />;
      case 'abandoned_cart':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'promo':
        return <Sparkles className="w-4 h-4 text-[#38FFD0]" />;
      default:
        return <Bell className="w-4 h-4 text-[#0B1B3D]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#0B1B3D]" />
                <h2 className="text-base font-extrabold text-[#0B1B3D]">
                  Centro de Notificaciones Push
                </h2>
                {unreadCount > 0 && (
                  <span className="bg-[#E06A55] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} nuevas
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Browser Push Permission State & Action */}
            <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0B1B3D] flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#E06A55]" />
                  Estado de Push en Navegador:
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    pushPermission === 'granted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : pushPermission === 'denied'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {pushPermission === 'granted'
                    ? 'Activo ✓'
                    : pushPermission === 'denied'
                    ? 'Bloqueado'
                    : 'Pendiente'}
                </span>
              </div>

              <p className="text-[11px] text-slate-500">
                Recibe alertas en tiempo real sobre el grabado, salida de bodega y promociones secretas de Gifti Club.
              </p>

              <div className="flex gap-2 pt-1">
                {pushPermission !== 'granted' ? (
                  <button
                    onClick={requestPushPermission}
                    className="flex-1 bg-[#0B1B3D] hover:bg-[#1a346e] text-white text-xs font-bold py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Bell className="w-3.5 h-3.5 text-[#38FFD0]" />
                    <span>Activar Notificaciones Push</span>
                  </button>
                ) : (
                  <button
                    onClick={triggerTestPush}
                    className="flex-1 bg-[#E06A55] hover:bg-[#c95844] text-white text-xs font-bold py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Probar Notificación Push Ahora</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
              <span>Historial de Alertas</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[#E06A55] font-semibold hover:underline"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No tienes notificaciones pendientes.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                    notif.read
                      ? 'bg-white border-slate-200/80 text-slate-600'
                      : 'bg-orange-50/40 border-[#E06A55]/30 text-slate-900 shadow-xs'
                  }`}
                >
                  {!notif.read && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#E06A55]" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-baseline justify-between gap-1 mb-0.5">
                        <h4 className="text-xs font-bold text-[#0B1B3D] truncate">
                          {notif.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {notif.body}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1.5 block">
                        {notif.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer test trigger */}
          <div className="p-4 border-t border-slate-200 bg-[#F8F9FA]">
            <button
              onClick={triggerTestPush}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-[#0B1B3D] text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E06A55]" />
              <span>Simular Notificación de Envío en Tiempo Real</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
