import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { AppNotification } from '../types';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  pushPermission: NotificationPermission | 'default';
  requestPushPermission: () => Promise<boolean>;
  sendPushNotification: (title: string, body: string, actionUrl?: string, type?: AppNotification['type']) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  triggerTestPush: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-welcome',
      title: '¡Bienvenido a Gifti Club! 🎁',
      body: 'Utiliza el código GIFTI10 para un 10% de descuento en tu primer regalo personalizado.',
      type: 'welcome',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    },
    {
      id: 'notif-shipping',
      title: '🚚 Envío Gratis a partir de $1,200 MXN',
      body: 'Agrega tus regalos favoritos a la bolsa y desbloquea entrega express sin costo a todo México.',
      type: 'shipping',
      date: 'Hace 10 min',
      read: false,
    }
  ]);

  const [pushPermission, setPushPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushPermission(Notification.permission);
    }
  }, []);

  // Listen to Firestore notifications if user is logged in
  useEffect(() => {
    if (!currentUser) return;

    try {
      const notifsRef = collection(db, 'users', currentUser.uid, 'notifications');
      const unsubscribe = onSnapshot(notifsRef, (snapshot) => {
        if (!snapshot.empty) {
          const cloudNotifs: AppNotification[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            cloudNotifs.push({
              id: docSnap.id,
              title: data.title || '',
              body: data.body || '',
              type: data.type || 'promo',
              date: data.createdAt ? new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Reciente',
              read: !!data.read,
              actionUrl: data.actionUrl
            });
          });
          setNotifications(prev => {
            // merge cloud notifications
            const ids = new Set(cloudNotifs.map(n => n.id));
            const filteredLocal = prev.filter(n => !ids.has(n.id));
            return [...cloudNotifs, ...filteredLocal];
          });
        }
      }, (error) => {
        console.warn('Notifications onSnapshot error:', error);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Could not attach notifications listener:', err);
    }
  }, [currentUser]);

  const requestPushPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Tu navegador no soporta Notificaciones Push.');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPushPermission(permission);
      if (permission === 'granted') {
        new Notification('¡Notificaciones Activadas! 🔔', {
          body: 'Te avisaremos en tiempo real sobre el estado de tus regalos, envíos y sorpresas.',
          icon: '/favicon.ico'
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error requesting push permission:', error);
      return false;
    }
  };

  const sendPushNotification = async (
    title: string,
    body: string,
    actionUrl?: string,
    type: AppNotification['type'] = 'order'
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      body,
      type,
      date: 'Ahora mismo',
      read: false,
      actionUrl
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Dispatch native browser notification if granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=128&q=80',
          badge: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=64&q=80',
        });
      } catch (e) {
        console.warn('Failed to fire native notification:', e);
      }
    }

    // Sync to Firestore if user logged in
    if (currentUser) {
      try {
        const notifDocRef = doc(db, 'users', currentUser.uid, 'notifications', newNotif.id);
        await setDoc(notifDocRef, {
          id: newNotif.id,
          userId: currentUser.uid,
          title,
          body,
          type,
          read: false,
          actionUrl: actionUrl || '',
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Could not persist notification in Firestore:', err);
      }
    }
  };

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );

    if (currentUser) {
      try {
        const notifDocRef = doc(db, 'users', currentUser.uid, 'notifications', notificationId);
        await updateDoc(notifDocRef, { read: true });
      } catch (err) {
        // quiet ignore for mock or non-persisted notifs
      }
    }
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const triggerTestPush = async () => {
    if (pushPermission !== 'granted') {
      const granted = await requestPushPermission();
      if (!granted) return;
    }

    await sendPushNotification(
      '✨ ¡Tu pedido Gifti Club está en camino!',
      'Tu regalo personalizado con empaque prémium ha salido del taller de arte. Guía: MX-GIFTI-8892',
      '#orders',
      'shipping'
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        pushPermission,
        requestPushPermission,
        sendPushNotification,
        markAsRead,
        markAllAsRead,
        triggerTestPush
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
