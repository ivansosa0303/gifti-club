import React from 'react';
import { Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FreeShippingBar: React.FC = () => {
  const { freeShippingProgress, subtotal } = useCart();
  const { percentage, isQualified, message } = freeShippingProgress;

  return (
    <div className="bg-[#0B1B3D] text-white py-2 px-4 border-b border-[#0B1B3D]/30 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        {/* Main message */}
        <div className="flex items-center gap-2 font-medium">
          {isQualified ? (
            <span className="flex items-center gap-1.5 text-[#38FFD0] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#38FFD0] animate-bounce" />
              {message}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-200">
              <Truck className="w-4 h-4 text-[#E06A55]" />
              {message}
            </span>
          )}
          <span className="hidden md:inline-block text-slate-400 text-[11px]">
            | Envío seguro con DHL y FedEx a todo México
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <div className="flex-1 bg-white/15 h-2 rounded-full overflow-hidden p-0.5 relative">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isQualified
                  ? 'bg-gradient-to-r from-[#38FFD0] to-emerald-400'
                  : 'bg-gradient-to-r from-[#E06A55] to-orange-400'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="font-bold text-[11px] min-w-[36px] text-right text-slate-200">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};
