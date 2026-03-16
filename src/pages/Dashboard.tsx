import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, Filter, Bell, User as UserIcon } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { motion } from 'framer-motion';

const CLIENT_SAMPLES = [
  { id: '1', codigo: '000001', nome: 'João da Silva', tipo: 'PF', telefone: '(83) 99888-7766', data: '16/03/2026', status: 'Pendente' },
  { id: '2', codigo: '000002', nome: 'Imobiliária Central LTDA', tipo: 'PJ', telefone: '(83) 3222-1100', data: '16/03/2026', status: 'Aprovado' },
  { id: '3', codigo: '000003', nome: 'Maria Oliveira', tipo: 'PF', telefone: '(83) 98765-4321', data: '15/03/2026', status: 'Em Análise' },
];

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link 
    to={path}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-500 relative group ${
      active ? 'text-white' : 'text-slate-500 hover:text-slate-200'
    }`}
  >
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl -z-10 shadow-[0_0_20px_rgba(14,165,233,0.1)]"
      />
    )}
    <Icon size={20} className={active ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
    <span className="font-bold tracking-tight">{label}</span>
  </Link>
);

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
    {[
      { label: 'Novos Cadastros', value: '42', color: 'text-primary', sub: '+12% esta semana' },
      { label: 'Pessoa Física', value: '1,280', color: 'text-blue-400', sub: '75% do total' },
      { label: 'Pessoa Jurídica', value: '342', color: 'text-purple-400', sub: '25% do total' },
      { label: 'Aguardando', value: '18', color: 'text-accent', sub: 'Prioridade alta' },
    ].map((stat, i) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <GlassCard className="p-6 border-white/5 hover:border-white/10 transition-all group">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
          <div className="flex items-end gap-3 mt-4">
            <p className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
          </div>
          <p className="text-[10px] text-slate-600 font-bold mt-2">{stat.sub}</p>
        </GlassCard>
      </motion.div>
    ))}
  </div>
);

const ClientList = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-black tracking-tight text-white">CadastrosRecentes</h2>
        <p className="text-slate-500 text-sm font-medium">Gerencie e analise as solicitações de registro.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative group flex-1 md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
          <input className="glass-input pl-12 py-3 text-sm font-medium pr-4" placeholder="Buscar por nome, CPF ou código..." />
        </div>
        <button className="h-12 w-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-slate-400 transition-all">
          <Filter size={20} />
        </button>
      </div>
    </div>

    <GlassCard className="p-0 overflow-hidden border-white/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">ID / Código</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Informações do Cliente</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Tipo</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Data</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Controles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {CLIENT_SAMPLES.map((client) => (
              <tr key={client.id} className="hover:bg-white/5 transition-all cursor-pointer group">
                <td className="px-8 py-6">
                  <span className="font-mono text-primary font-black text-sm tracking-tighter">#{client.codigo}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-100 group-hover:text-primary transition-colors">{client.nome}</span>
                    <span className="text-xs text-slate-500 font-medium">{client.telefone}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                    client.tipo === 'PF' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {client.tipo}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      client.status === 'Aprovado' ? 'bg-green-500' : client.status === 'Pendente' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-xs font-bold text-slate-300">{client.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-slate-500 font-bold text-sm tracking-tighter">{client.data}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                      <FileText size={18} />
                    </button>
                    <button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary text-xs font-black rounded-xl hover:text-white transition-all">
                      ANALISAR
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </div>
);

export const Dashboard: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Decorative center glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 p-8 flex flex-col fixed h-full bg-slate-900/20 backdrop-blur-3xl z-40">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)]">
            <Building2 className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase">Rfreire</h1>
            <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Mobiliária</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-3">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/admin" active={location.pathname === '/admin'} />
          <SidebarItem icon={Users} label="Cadastros" path="/admin/cadastros" active={location.pathname.includes('/cadastros')} />
          <SidebarItem icon={FileText} label="Documentos" path="/admin/documentos" active={location.pathname.includes('/documentos')} />
          <SidebarItem icon={Settings} label="Configurações" path="/admin/config" active={location.pathname.includes('/config')} />
        </nav>

        <div className="mt-auto space-y-4">
          <GlassCard className="!p-4 bg-white/5 border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                <UserIcon size={20} className="text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white truncate">Administrador</p>
                <p className="text-[10px] font-bold text-slate-500 truncate">admin@rfreire.com</p>
              </div>
            </div>
          </GlassCard>
          
          <button className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all font-black text-xs uppercase tracking-widest">
            <LogOut size={18} /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12 relative z-10">
        <header className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Painel Administrativo</p>
            <h2 className="text-2xl font-black text-white">Bem-vindo de volta!</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
              <Bell size={22} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(14,165,233,1)]" />
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<><Stats /><ClientList /></>} />
          <Route path="/cadastros" element={<ClientList />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center py-40 animate-pulse">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Settings className="text-slate-700" size={40} />
              </div>
              <p className="text-slate-600 font-black tracking-widest uppercase text-xs">Módulo em Desenvolvimento</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
};
