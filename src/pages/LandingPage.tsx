import React, { useState } from 'react';
import { User, Building2, ChevronRight, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';

export const LandingPage: React.FC = () => {
  const [type, setType] = useState<'PF' | 'PJ'>('PF');
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(type === 'PF' ? '/register/pf' : '/register/pj');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center space-y-12 relative z-10"
      >
        <header className="space-y-4">
          <motion.h1 
            className="text-6xl md:text-8xl font-black tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-gradient">Rfreire</span> <br className="md:hidden" />
            <span className="text-primary">Cadastros</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sua porta de entrada para uma gestão imobiliária inteligente e simplificada.
          </motion.p>
        </header>

        <div className="space-y-8">
          <h2 className="text-sm uppercase tracking-[0.4em] text-slate-500 font-bold">
            Como deseja se identificar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { id: 'PF', label: 'Pessoa Física', sub: 'Locatários e Fiadores', icon: User },
              { id: 'PJ', label: 'Pessoa Jurídica', sub: 'Empresas e Sócios', icon: Building2 }
            ].map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setType(item.id as 'PF' | 'PJ')}
                className="h-full"
              >
                <GlassCard 
                  className={`h-full cursor-pointer transition-all duration-500 border-2 relative overflow-hidden group p-8 ${
                    type === item.id 
                      ? 'border-primary shadow-[0_0_40px_rgba(14,165,233,0.2)] bg-white/10' 
                      : 'border-white/5 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className="space-y-6 flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      type === item.id ? 'bg-primary text-white shadow-lg' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'
                    }`}>
                      <item.icon size={40} />
                    </div>
                    <div className="text-center">
                      <h3 className={`text-2xl font-bold mb-2 transition-colors ${type === item.id ? 'text-white' : 'text-slate-400'}`}>
                        {item.label}
                      </h3>
                      <p className="text-slate-500 font-medium">{item.sub}</p>
                    </div>
                  </div>
                  {type === item.id && (
                    <motion.div 
                      layoutId="indicator"
                      className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(14,165,233,1)]"
                    />
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button 
            onClick={handleStart}
            className="glass-button min-w-[320px] h-16 text-lg group shadow-2xl relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Iniciar Registro
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* WhatsApp FAB */}
      <motion.button
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:brightness-110 transition-all z-50 group"
      >
        <MessageSquare size={32} />
        <div className="absolute right-24 bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 pointer-events-none shadow-2xl">
          Dúvidas? Fale conosco!
        </div>
      </motion.button>
    </div>
  );
};
