import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, Plus, Filter } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

// Dummy list for visual demonstration
const CLIENT_SAMPLES = [
  { id: '1', codigo: '000001', nome: 'João da Silva', tipo: 'PF', telefone: '(83) 99888-7766', data: '16/03/2026' },
  { id: '2', codigo: '000002', nome: 'Imobiliária Central LTDA', tipo: 'PJ', telefone: '(83) 3222-1100', data: '16/03/2026' },
  { id: '3', codigo: '000003', nome: 'Maria Oliveira', tipo: 'PF', telefone: '(83) 98765-4321', data: '15/03/2026' },
];

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link 
    to={path}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const ClientList = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h2 className="text-2xl font-bold">Cadastros Realizados</h2>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input className="glass-input pl-10 py-2 text-sm" placeholder="Buscar por nome ou código..." />
        </div>
        <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-slate-300">
          <Filter size={20} />
        </button>
      </div>
    </div>

    <GlassCard className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Código</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Nome</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Tipo</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Telefone</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Data</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {CLIENT_SAMPLES.map((client) => (
              <tr key={client.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-mono text-primary font-bold">{client.codigo}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{client.nome}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    client.tipo === 'PF' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {client.tipo}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">{client.telefone}</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{client.data}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 hover:text-white transition-colors mr-3 text-sm">Visualizar</button>
                  <button className="text-slate-500 hover:text-red-400 transition-colors text-sm">PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </div>
);

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {[
      { label: 'Total Cadastros', value: '1,234', color: 'primary' },
      { label: 'Pessoa Física', value: '850', color: 'blue-500' },
      { label: 'Pessoa Jurídica', value: '384', color: 'purple-500' },
    ].map((stat) => (
      <GlassCard key={stat.label} className="flex flex-col justify-center">
        <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
        <p className={`text-4xl font-bold mt-2 text-${stat.color}`}>{stat.value}</p>
      </GlassCard>
    ))}
  </div>
);

export const Dashboard: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-950/50 backdrop-blur-3xl">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col fixed h-full bg-slate-900/40 z-20">
        <div className="text-2xl font-bold mb-12 text-primary tracking-tighter">RF ADMIN</div>
        
        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/admin" active={location.pathname === '/admin'} />
          <SidebarItem icon={Users} label="Cadastros" path="/admin/cadastros" active={location.pathname.includes('/cadastros')} />
          <SidebarItem icon={FileText} label="Documentos" path="/admin/documentos" active={location.pathname.includes('/documentos')} />
          <SidebarItem icon={Settings} label="Configurações" path="/admin/config" active={location.pathname.includes('/config')} />
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all mt-auto font-medium">
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 relative z-10">
        <Routes>
          <Route path="/" element={<><Stats /><ClientList /></>} />
          <Route path="/cadastros" element={<ClientList />} />
          <Route path="*" element={<div className="text-center py-20 text-slate-500">Página em construção...</div>} />
        </Routes>
      </main>
    </div>
  );
};
