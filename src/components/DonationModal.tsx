import { useState } from 'react';
import { X, Copy, Check, Bitcoin } from 'lucide-react';
import { CryptoCurrency, WalletInfo } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Record permet de mapper les clés (btc, xmr) vers l'objet WalletInfo
const wallets: Record<CryptoCurrency, WalletInfo> = {
  btc: { 
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 
    color: '#00ff9d', 
    name: 'Bitcoin' 
  },
  xmr: { 
    address: '44AFFq5kSiGBoZ4NMDwYtN18...8dJy2bKO', 
    color: '#f97316', 
    name: 'Monero' 
  }
};

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [crypto, setCrypto] = useState<CryptoCurrency>('btc');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(wallets[crypto].address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 top-0 left-0 w-full h-full z-50 flex items-center justify-center"
         style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
      
      <div className="relative w-[90%] max-w-[500px] p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
           style={{ background: 'rgba(30, 41, 59, 0.7)' }}>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Soutenir Flux <span className="animate-pulse text-[var(--primary-accent)]">_</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition hover:rotate-90">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-400 mb-6 text-sm">
          Contribuez à l'anonymat. Restez indétectables. Les serveurs ont besoin de fuel.
        </p>

        <div className="flex gap-3 mb-6 bg-black/20 p-1.5 rounded-xl">
          {(Object.keys(wallets) as CryptoCurrency[]).map((type) => (
            <button
              key={type}
              onClick={() => setCrypto(type)}
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${crypto === type ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
             {type === 'btc' ? <Bitcoin size={18}/> : 'Ⓜ'} {type.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 mb-6 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-gray-500">Adresse du portefeuille</span>
          
          <div 
            onClick={handleCopy}
            className="flex justify-between items-center bg-white/5 p-3 rounded-lg cursor-pointer hover:bg-white/10 hover:border-[var(--primary-accent)] border border-transparent transition group relative"
          >
            <code className="font-mono text-sm truncate mr-4" style={{ color: wallets[crypto].color }}>
              {wallets[crypto].address}
            </code>
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-400 group-hover:text-white" />}
            
            {copied && (
              <div className="absolute -top-8 right-0 bg-[var(--primary-accent)] text-black text-xs font-bold px-2 py-1 rounded">
                Copié !
              </div>
            )}
          </div>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">🔒 Transaction chiffrée</p>
        </div>

        <button className="w-full py-4 rounded-xl font-bold text-black transition transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]"
                style={{ background: 'linear-gradient(135deg, var(--primary-accent), #059669)' }}>
          Confirmer le transfert
        </button>
      </div>
    </div>
  );
}