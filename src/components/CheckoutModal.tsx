import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    items,
    subtotal,
    giftWrapTotal,
    shippingCost,
    total,
    clearCart,
    globalGiftWrap,
    globalGiftNote,
    recipientName
  } = useCart();

  const { currentUser, userProfile, updateAddress } = useAuth();
  const { sendPushNotification } = useNotification();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'oxxo' | 'mercadopago' | 'kueski'>('card');
  const [installments, setInstallments] = useState<'1' | '3' | '6' | '12'>('3');
  const [customerName, setCustomerName] = useState(userProfile?.displayName || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '55 1234 5678');

  // Address
  const [street, setStreet] = useState(userProfile?.savedAddress?.street || 'Av. Paseo de la Reforma 222');
  const [colonia, setColonia] = useState(userProfile?.savedAddress?.colonia || 'Juárez');
  const [city, setCity] = useState(userProfile?.savedAddress?.city || 'Cuauhtémoc');
  const [state, setState] = useState(userProfile?.savedAddress?.state || 'CDMX');
  const [postalCode, setPostalCode] = useState(userProfile?.savedAddress?.postalCode || '06600');

  // Card form state
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('•••');

  // Post-purchase upsell state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [expressAdded, setExpressAdded] = useState(false);

  if (!isOpen) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderId = `ORD-MX-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `GFT-FEDEX-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const newOrder: Order = {
        id: orderId,
        userId: currentUser?.uid || 'guest',
        customerName: customerName || 'Cliente Gifti',
        customerEmail: customerEmail || 'cliente@gifticlub.mx',
        customerPhone,
        shippingAddress: {
          street,
          colonia,
          city,
          state,
          postalCode
        },
        items: [...items],
        subtotal,
        giftWrapTotal,
        shippingCost: expressAdded ? shippingCost + 49 : shippingCost,
        total: expressAdded ? total + 49 : total,
        paymentMethod,
        status: 'confirmado',
        trackingNumber,
        oxxoBarcode: paymentMethod === 'oxxo' ? '9834 8192 4810 5928 1029' : undefined,
        createdAt: new Date().toISOString()
      };

      // Save order to Firestore if logged in
      if (currentUser) {
        try {
          const orderDocRef = doc(db, 'orders', orderId);
          await setDoc(orderDocRef, {
            ...newOrder,
            createdAt: new Date().toISOString()
          });

          // Save address to user profile
          await updateAddress(newOrder.shippingAddress);
        } catch (err) {
          console.warn('Could not save order in Firestore:', err);
        }
      }

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      // Send Push Notification
      await sendPushNotification(
        '🎉 ¡Tu pedido ha sido confirmado!',
        `¡Gracias por regalar emociones, ${customerName.split(' ')[0]}! Tu pedido ${orderId} está en preparación artesanal.`,
        '#orders',
        'order'
      );

      setOrderComplete(newOrder);
      setShowUpsell(true);
      await clearCart();
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddExpressUpsell = () => {
    setExpressAdded(true);
    setShowUpsell(false);
    sendPushNotification(
      '⚡ ¡Envío Express 24h Añadido!',
      'Tu paquete saldrá hoy mismo en el primer lote prioritario con DHL Express.',
      '#orders',
      'shipping'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {orderComplete ? (
          /* Order Confirmation View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#E06A55] uppercase tracking-wider">
                ¡Gracias por tu compra!
              </span>
              <h2 className="text-2xl font-black text-[#0B1B3D] mt-1">
                Tu regalo está en camino
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Hemos enviado la confirmación y detalles de seguimiento al correo{' '}
                <strong className="text-[#0B1B3D]">{orderComplete.customerEmail}</strong>.
              </p>
            </div>

            {/* Post-Purchase Upsell Box (Blueprint Feature) */}
            {showUpsell && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-dashed border-[#E06A55] rounded-2xl p-4 text-left space-y-3 animate-pulse">
                <div className="flex items-center justify-between">
                  <span className="bg-[#E06A55] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Oferta Exclusiva Post-Compra
                  </span>
                  <span className="text-xs font-black text-[#E06A55]">+ $49 MXN</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-xs text-[#E06A55]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1B3D]">
                      ¿Deseas Entrega Express Prioritaria 24 Horas?
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Grabamos tu regalo hoy mismo y lo despachamos en la primera camioneta prioritaria de FedEx.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleAddExpressUpsell}
                    className="flex-1 bg-[#E06A55] hover:bg-[#c95844] text-white text-xs font-bold py-2 rounded-xl transition-all shadow-xs"
                  >
                    ¡Sí, actualizar a 24 Horas! (+$49)
                  </button>
                  <button
                    onClick={() => setShowUpsell(false)}
                    className="px-3 text-xs text-slate-400 hover:text-slate-600"
                  >
                    No, gracias
                  </button>
                </div>
              </div>
            )}

            {/* Order Summary receipt */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 text-left space-y-3 border border-slate-200/80 text-xs">
              <div className="flex justify-between font-bold text-[#0B1B3D] pb-2 border-b border-slate-200">
                <span>Número de Pedido:</span>
                <span className="font-mono text-[#E06A55]">{orderComplete.id}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Guía de Rastreo:</span>
                <span className="font-mono font-bold text-[#0B1B3D]">{orderComplete.trackingNumber}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Método de Pago:</span>
                <span className="uppercase font-semibold">{orderComplete.paymentMethod}</span>
              </div>

              {/* If OXXO Pay */}
              {orderComplete.paymentMethod === 'oxxo' && (
                <div className="bg-white p-3 rounded-xl border border-red-200 text-center space-y-1 my-2">
                  <p className="font-bold text-red-600 text-xs">Ficha Digital OXXO Pay</p>
                  <p className="text-[11px] text-slate-600">Presenta este código en cualquier tienda OXXO de México:</p>
                  <p className="font-mono text-base font-black tracking-widest text-[#0B1B3D] bg-slate-100 py-1 rounded-md">
                    {orderComplete.oxxoBarcode}
                  </p>
                  <p className="text-[10px] text-slate-400">Vigencia: 48 horas para pagar en caja</p>
                </div>
              )}

              <div className="flex justify-between font-bold text-sm text-[#0B1B3D] pt-2 border-t border-slate-200">
                <span>Total Pagado:</span>
                <span className="text-[#E06A55]">${orderComplete.total.toFixed(2)} MXN</span>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderComplete(null);
                onClose();
              }}
              className="w-full bg-[#0B1B3D] text-white font-bold py-3 px-6 rounded-2xl hover:bg-slate-800 transition-all text-xs"
            >
              Cerrar y Seguir Explorando
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-[#0B1B3D]">
                  Checkout Seguro Gifti Club
                </h2>
                <p className="text-xs text-slate-500">
                  Resumen de compra y datos de envío para México
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Customer & Shipping */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. Datos de Entrega</span>
                </h3>

                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono móvil (WhatsApp de entrega)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Calle y número exterior / interior"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Colonia"
                      value={colonia}
                      onChange={(e) => setColonia(e.target.value)}
                      className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Código Postal (5 dígitos)"
                      maxLength={5}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Municipio / Alcaldía"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Estado"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full p-2.5 text-xs bg-[#F8F9FA] border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Mexican Payment Gateway Matrix */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center gap-1.5">
                  <span>2. Método de Pago (México)</span>
                </h3>

                <div className="space-y-2">
                  {/* Option 1: Card */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#0B1B3D] bg-slate-50 ring-1 ring-[#0B1B3D]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-0.5 text-[#0B1B3D]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#0B1B3D]">
                        <span>Tarjeta de Débito / Crédito</span>
                        <CreditCard className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Visa, Mastercard, American Express (Inmediato)
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Mercado Pago MSI */}
                  <label
                    onClick={() => setPaymentMethod('mercadopago')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'mercadopago'
                        ? 'border-[#0B1B3D] bg-slate-50 ring-1 ring-[#0B1B3D]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'mercadopago'}
                      onChange={() => setPaymentMethod('mercadopago')}
                      className="mt-0.5 text-[#0B1B3D]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#0B1B3D]">
                        <span>Mercado Pago con MSI</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                          Hasta 12 Meses
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        3, 6 y 12 Meses Sin Intereses con bancos participantes
                      </p>
                    </div>
                  </label>

                  {/* Option 3: OXXO Pay */}
                  <label
                    onClick={() => setPaymentMethod('oxxo')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'oxxo'
                        ? 'border-[#0B1B3D] bg-slate-50 ring-1 ring-[#0B1B3D]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'oxxo'}
                      onChange={() => setPaymentMethod('oxxo')}
                      className="mt-0.5 text-[#0B1B3D]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#0B1B3D]">
                        <span>Efectivo en OXXO (OXXO Pay)</span>
                        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                          Sin Tarjeta
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Genera tu código de barras y paga en cualquier caja OXXO
                      </p>
                    </div>
                  </label>

                  {/* Option 4: Kueski Pay / BNPL */}
                  <label
                    onClick={() => setPaymentMethod('kueski')}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'kueski'
                        ? 'border-[#0B1B3D] bg-slate-50 ring-1 ring-[#0B1B3D]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'kueski'}
                      onChange={() => setPaymentMethod('kueski')}
                      className="mt-0.5 text-[#0B1B3D]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#0B1B3D]">
                        <span>Kueski Pay / Aplazo (Quincenas)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Compra hoy, paga después
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Paga en quincenas fijas sin necesidad de tarjeta de crédito
                      </p>
                    </div>
                  </label>
                </div>

                {/* Subtotal review */}
                <div className="bg-[#F8F9FA] p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Artículos ({items.length}):</span>
                    <span>${subtotal.toFixed(2)} MXN</span>
                  </div>
                  {giftWrapTotal > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Envoltorio Gifti:</span>
                      <span>+${giftWrapTotal.toFixed(2)} MXN</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Envío:</span>
                    <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)} MXN`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0B1B3D] pt-1 border-t border-slate-200 text-sm">
                    <span>Total a pagar:</span>
                    <span className="text-[#E06A55]">${total.toFixed(2)} MXN</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Transacción encriptada con SSL 256 bits</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing || items.length === 0}
                className="w-full sm:w-auto bg-[#E06A55] hover:bg-[#c95844] text-white font-black py-3 px-8 rounded-2xl shadow-lg shadow-[#E06A55]/25 hover:shadow-xl hover:scale-[1.01] transition-all text-xs flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Procesando pago...</span>
                ) : (
                  <>
                    <span>Confirmar y Pagar ${total.toFixed(2)} MXN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
