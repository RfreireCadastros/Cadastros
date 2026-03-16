import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Building2, User, ArrowRight, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const [type, setType] = useState<'PF' | 'PJ'>('PF');
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/cadastro/${type.toLowerCase()}`);
  };

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-20 relative z-10">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
          Rfreire Cadastros
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
          Preencha seu cadastro ou fale com nosso assistente virtual para uma experiência simplificada.
        </p>
      </div>

      <GlassCard className="max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-8 text-center">Tipo de Cadastro</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setType('PF')}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
              type === 'PF' 
                ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <User size={32} className={type === 'PF' ? 'text-primary' : 'text-slate-400'} />
            <span className={`mt-3 font-medium ${type === 'PF' ? 'text-white' : 'text-slate-400'}`}>Pessoa Física</span>
          </button>

          <button
            onClick={() => setType('PJ')}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
              type === 'PJ' 
                ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <Building2 size={32} className={type === 'PJ' ? 'text-primary' : 'text-slate-400'} />
            <span className={`mt-3 font-medium ${type === 'PJ' ? 'text-white' : 'text-slate-400'}`}>Pessoa Jurídica</span>
          </button>
        </div>

        <button 
          onClick={handleStart}
          className="glass-button w-full flex items-center justify-center gap-2"
        >
          Preencher Cadastro <ArrowRight size={20} />
        </button>
      </GlassCard>

      {/* Floating WhatsApp Bot */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50">
        <MessageSquare size={32} />
      </button>
    </div>
  );
};
