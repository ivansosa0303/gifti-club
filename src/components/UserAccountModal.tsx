import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  LogOut,
  Package,
  MapPin,
  ShieldCheck,
  Sparkles,
  Cloud,
  CheckCircle,
  Truck,
  ExternalLink
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    userProfile,
    signInWithGoogle,
    signInAsGuest,
    signOut,
    updateAddress
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'address'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Address edit state
  const [street, setStreet] = useState('');
  const [colonia, setColonia] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    if (userProfile?.savedAddress) {
      setStreet(userProfile.savedAddress.street || '');
      setColonia(userProfile.savedAddress.colonia || '');
      setCity(userProfile.savedAddress.city || '');
      setState(userProfile.savedAddress.state || '');
      setPostalCode(userProfile.savedAddress.postalCode || '');
    }
  }, [userProfile]);

  useEffect(() => {
    if (currentUser && activeTab === 'orders') {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const ordersRef = collection(db, 'orders');
          const q = query(ordersRef, where('userId', '==', currentUser.uid));
          const snapshot = await getDocs(q);
          const list: Order[] = [];
          snapshot.forEach(doc => {
            list.push(doc.data() as Order);
          });
          setOrders(list);
        } catch (e) {
          console.warn('Error fetching orders:', e);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [currentUser, activeTab]);

  if (!isOpen) return null;

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAddress({
      street,
      colonia,
      city,
      state,
      postalCode
    });
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0B1B3D]">
                Mi Cuenta Gifti Club
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                <Cloud className="w-3 h-3" />
                <span>Sincronización en la nube activa</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!currentUser ? (
            /* Logged Out View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-[#E06A55]">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0B1B3D]">
                  Accede a tu cuenta Gifti Club
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Guarda tus direcciones de entrega en México, sincroniza tu bolsa en tiempo real y rastrea tus regalos personalizados.
                </p>
              </div>

              <div className="space-y-3 max-w-xs mx-auto">
                <button
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold py-3 px-4 rounded-2xl shadow-xs hover:shadow-md transition-all text-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Iniciar con Google</span>
                </button>

                <button
                  onClick={signInAsGuest}
                  className="w-full bg-[#F8F9FA] hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-2xl transition-all text-xs"
                >
                  Continuar en Modo Invitado
                </button>
              </div>
            </div>
          ) : (
            /* Logged In View */
            <div className="space-y-5">
              {/* User banner */}
              <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || ''}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#E06A55]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center text-lg font-bold">
                      {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'G'}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1B3D]">
                      {currentUser.displayName || 'Cliente Gifti Club'}
                    </h3>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      ✓ Autenticado seguro
                    </span>
                  </div>
                </div>

                <button
                  onClick={signOut}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 text-xs">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-all ${
                    activeTab === 'profile'
                      ? 'border-[#0B1B3D] text-[#0B1B3D]'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Resumen
                </button>
                <button
                  onClick={() => setActiveTab('address')}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-all ${
                    activeTab === 'address'
                      ? 'border-[#0B1B3D] text-[#0B1B3D]'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Dirección de Envío
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-all ${
                    activeTab === 'orders'
                      ? 'border-[#0B1B3D] text-[#0B1B3D]'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Mis Pedidos ({orders.length})
                </button>
              </div>

              {/* Tab 1: Profile Summary */}
              {activeTab === 'profile' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <p className="text-slate-500 text-[11px]">ID de Usuario Seguro (Firebase):</p>
                    <p className="font-mono text-xs font-bold text-slate-700 mt-0.5 truncate">
                      {currentUser.uid}
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-[11px]">Sincronización en Tiempo Real:</p>
                      <p className="text-xs font-bold text-emerald-600">Conectado a Firestore Cloud</p>
                    </div>
                    <Cloud className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              )}

              {/* Tab 2: Saved Address */}
              {activeTab === 'address' && (
                <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Calle y número:
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Calle y número exterior / interior"
                      className="w-full p-2 bg-[#F8F9FA] border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Colonia:</label>
                      <input
                        type="text"
                        required
                        value={colonia}
                        onChange={(e) => setColonia(e.target.value)}
                        className="w-full p-2 bg-[#F8F9FA] border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Código Postal:</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full p-2 bg-[#F8F9FA] border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Municipio / Alcaldía:</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 bg-[#F8F9FA] border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Estado:</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2 bg-[#F8F9FA] border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B1B3D] text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-all text-xs"
                  >
                    {addressSaved ? '✓ ¡Dirección Guardada en la Nube!' : 'Guardar Dirección de Entrega'}
                  </button>
                </form>
              )}

              {/* Tab 3: Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-3 text-xs max-h-64 overflow-y-auto">
                  {loadingOrders ? (
                    <p className="text-center py-6 text-slate-400">Cargando pedidos en la nube...</p>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p>Aún no tienes pedidos registrados.</p>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="p-3 bg-[#F8F9FA] border border-slate-200 rounded-xl space-y-1.5">
                        <div className="flex justify-between font-bold text-[#0B1B3D]">
                          <span>Pedido {order.id}</span>
                          <span className="text-[#E06A55]">${order.total} MXN</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-[11px]">
                          <span>Guía FedEx: {order.trackingNumber}</span>
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
