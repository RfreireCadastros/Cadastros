import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  ArrowLeft, Save, Building2, ShieldAlert, Home, 
  Users, Banknote, 
  Info, ClipboardCheck, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DocumentUploader } from '../components/ui/DocumentUploader';

const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
    <div className="p-2 bg-primary/10 rounded-lg text-primary">
      <Icon size={20} />
    </div>
    <h3 className="text-base font-black uppercase tracking-[0.2em] text-white">{title}</h3>
  </div>
);

const InputGroup = ({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) => (
  <div className={`space-y-1 ${className}`}>
    <label className="glass-label">{label}</label>
    {children}
  </div>
);

const pjSchema = z.object({
  // USO INTERNO
  tipo_cadastro: z.enum(['Locatário', 'Fiador']).default('Locatário'),
  cod_pretendente: z.string().optional(),
  cod_contrato: z.string().optional(),
  contrato_sistema: z.string().optional(),
  cod_inquilino: z.string().optional(),
  atendente_responsavel: z.string().optional(),
  ficha_entregue_por: z.string().optional(),
  data_entrega: z.string().optional(),

  // DADOS DA LOCAÇÃO
  endereco_imovel: z.string().optional(),
  cod_imovel: z.string().optional(),
  inicio_contrato: z.string().optional(),
  prazo_contrato: z.string().optional(),
  valor_aluguel: z.string().optional(),
  reajuste: z.string().default('Anual'),
  destinacao: z.string().optional(),
  encargos_seguro: z.boolean().optional(),
  encargos_condominio: z.boolean().optional(),
  encargos_iptu: z.boolean().optional(),
  observacoes_locacao: z.string().optional(),

  // DADOS DA EMPRESA
  razao_social: z.string().min(3, 'Obrigatório'),
  nome_fantasia: z.string().optional(),
  cnpj: z.string().min(14, 'Inválido'),
  empresa_endereco: z.string().optional(),
  empresa_bairro: z.string().optional(),
  empresa_cidade: z.string().optional(),
  empresa_uf: z.string().optional(),
  empresa_cep: z.string().optional(),
  empresa_contato: z.string().optional(),
  empresa_telefone: z.string().optional(),
  empresa_fax: z.string().optional(),
  empresa_contato_fortaleza: z.string().optional(),
  empresa_fortaleza_tel: z.string().optional(),
  empresa_fortaleza_fax: z.string().optional(),
  empresa_fortaleza_email: z.string().optional(),
  empresa_renda: z.string().optional(),
  empresa_outras_rendas: z.string().optional(),
  empresa_origem_rendas: z.string().optional(),
  empresa_predio_tipo: z.string().optional(),
  empresa_predio_valor: z.string().optional(),

  // REPRESENTANTE 01
  rep1_nome: z.string().optional(),
  rep1_sexo: z.string().optional(),
  rep1_nascimento: z.string().optional(),
  rep1_identidade: z.string().optional(),
  rep1_orgao: z.string().optional(),
  rep1_filiacao: z.string().optional(),
  rep1_cpf: z.string().optional(),
  rep1_naturalidade: z.string().optional(),
  rep1_nacionalidade: z.string().optional(),
  rep1_estado_civil: z.string().optional(),
  rep1_endereco: z.string().optional(),
  rep1_bairro: z.string().optional(),
  rep1_cidade: z.string().optional(),
  rep1_uf: z.string().optional(),
  rep1_cep: z.string().optional(),
  rep1_telefone: z.string().optional(),
  rep1_celular: z.string().optional(),
  rep1_email: z.string().optional(),
  rep1_profissao: z.string().optional(),
  rep1_cargo: z.string().optional(),
  rep1_ligacao: z.string().optional(),

  // REPRESENTANTE 02
  rep2_nome: z.string().optional(),
  rep2_sexo: z.string().optional(),
  rep2_nascimento: z.string().optional(),
  rep2_identidade: z.string().optional(),
  rep2_orgao: z.string().optional(),
  rep2_filiacao: z.string().optional(),
  rep2_cpf: z.string().optional(),
  rep2_naturalidade: z.string().optional(),
  rep2_nacionalidade: z.string().optional(),
  rep2_estado_civil: z.string().optional(),
  rep2_endereco: z.string().optional(),
  rep2_bairro: z.string().optional(),
  rep2_cidade: z.string().optional(),
  rep2_uf: z.string().optional(),
  rep2_cep: z.string().optional(),
  rep2_telefone: z.string().optional(),
  rep2_celular: z.string().optional(),
  rep2_email: z.string().optional(),
  rep2_profissao: z.string().optional(),
  rep2_cargo: z.string().optional(),
  rep2_ligacao: z.string().optional(),

  // COMPLEMENTO
  fiador_nome_1: z.string().optional(),
  fiador_nome_2: z.string().optional(),
  relacao_fiador: z.string().optional(),
});

type PJFormData = z.infer<typeof pjSchema>;

export const FormPJ: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<PJFormData>({
    resolver: zodResolver(pjSchema),
    defaultValues: {
      tipo_cadastro: 'Locatário',
      reajuste: 'Anual'
    }
  });

  const handleCepLookup = async (cep: string, prefix: 'empresa_' | 'rep1_' | 'rep2_') => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue(`${prefix}endereco` as any, data.logradouro);
          setValue(`${prefix}bairro` as any, data.bairro);
          setValue(`${prefix}cidade` as any, data.localidade);
          setValue(`${prefix}uf` as any, data.uf);
        }
      } catch (error) {
        console.error('Error fetching CEP:', error);
      }
    }
  };

  const onSubmit = (data: PJFormData) => {
    console.log(data);
    alert('Cadastro PJ finalizado com sucesso!');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 animate-fade-in relative">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 z-50"></div>
      
      <div className="max-w-6xl mx-auto pb-20">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest mb-4 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Início
            </button>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Cadastro Empresa <span className="text-primary">/</span> Pessoa Jurídica</h1>
            <p className="text-slate-500 text-xs font-bold mt-1 tracking-tight">Formulário Detalhado Corporate</p>
          </div>
          <button 
            form="form-pj"
            className="h-[48px] px-8 bg-primary hover:bg-primary-dark text-white font-black rounded-xl flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(14,165,233,0.3)] active:scale-95 text-[11px] uppercase tracking-widest"
          >
            <Save size={18} /> Finalizar Registro
          </button>
        </header>

        <form id="form-pj" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* 1. USO INTERNO */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={ShieldAlert} title="Para Uso Interno" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <InputGroup label="Tipo de Cadastro">
                <select className="glass-input-sm appearance-none" {...register('tipo_cadastro')}>
                  <option value="Locatário">Locatário</option>
                  <option value="Fiador">Fiador</option>
                </select>
              </InputGroup>
              <InputGroup label="Cód. do Pretendente">
                <input className="glass-input-sm" {...register('cod_pretendente')} />
              </InputGroup>
              <InputGroup label="Cód. Contrato">
                <input className="glass-input-sm" {...register('cod_contrato')} />
              </InputGroup>
              <InputGroup label="Contrato Sistema">
                <input className="glass-input-sm" {...register('contrato_sistema')} />
              </InputGroup>
              <InputGroup label="Cód. Inquilino">
                <input className="glass-input-sm" {...register('cod_inquilino')} />
              </InputGroup>
              <InputGroup label="Atendente Responsável" className="md:col-span-2">
                <input className="glass-input-sm" {...register('atendente_responsavel')} />
              </InputGroup>
              <InputGroup label="Ficha entregue por" className="md:col-span-2">
                <input className="glass-input-sm" {...register('ficha_entregue_por')} />
              </InputGroup>
              <InputGroup label="Data Entrega">
                <input type="text" placeholder="  /  /  " className="glass-input-sm" {...register('data_entrega')} />
              </InputGroup>
            </div>
          </GlassCard>

          {/* 2. DADOS DA LOCAÇÃO */}
          <GlassCard className="p-6 md:p-8 border-primary/10">
            <SectionTitle icon={Home} title="Dados da Locação" />
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3">
              <InputGroup label="Endereço do Imóvel" className="lg:col-span-10">
                <input className="glass-input-sm" {...register('endereco_imovel')} />
              </InputGroup>
              <InputGroup label="Cód. Imóvel" className="lg:col-span-2">
                <input className="glass-input-sm" {...register('cod_imovel')} />
              </InputGroup>
              <InputGroup label="Início do contrato" className="lg:col-span-4">
                <input className="glass-input-sm" placeholder="  /  /  " {...register('inicio_contrato')} />
              </InputGroup>
              <InputGroup label="Prazo (Meses)" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('prazo_contrato')} />
              </InputGroup>
              <InputGroup label="Aluguel R$" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('valor_aluguel')} />
              </InputGroup>
              <InputGroup label="Reajuste" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('reajuste')} />
              </InputGroup>
              <InputGroup label="Destinação" className="lg:col-span-8">
                <input className="glass-input-sm" {...register('destinacao')} />
              </InputGroup>
              <div className="lg:col-span-12 flex items-center gap-6 h-[34px] bg-white/5 px-4 rounded-lg border border-white/5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2">Encargos:</span>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-800 border-white/10 text-primary focus:ring-primary" {...register('encargos_seguro')} />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">Seguro Contra Incêndio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-800 border-white/10 text-primary focus:ring-primary" {...register('encargos_condominio')} />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">Condomínio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-800 border-white/10 text-primary focus:ring-primary" {...register('encargos_iptu')} />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">IPTU</span>
                </label>
              </div>
              <InputGroup label="Observações" className="lg:col-span-12">
                <input className="glass-input-sm" {...register('observacoes_locacao')} />
              </InputGroup>
            </div>
          </GlassCard>

          {/* 3. DADOS DA EMPRESA */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={Building2} title="Dados da Empresa" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <InputGroup label="Razão Social" className="md:col-span-12">
                <input className="glass-input-sm" {...register('razao_social')} />
              </InputGroup>
              <InputGroup label="Nome Fantasia" className="md:col-span-8">
                <input className="glass-input-sm" {...register('nome_fantasia')} />
              </InputGroup>
              <InputGroup label="CNPJ (MF)" className="md:col-span-4">
                <input className="glass-input-sm" {...register('cnpj')} />
              </InputGroup>
              <InputGroup label="CEP" className="md:col-span-3">
                <input 
                  className="glass-input-sm" 
                  {...register('empresa_cep')} 
                  onBlur={(e) => handleCepLookup(e.target.value, 'empresa_')}
                  placeholder="00000-000"
                />
              </InputGroup>
              <InputGroup label="Endereço" className="md:col-span-9">
                <input className="glass-input-sm" {...register('empresa_endereco')} />
              </InputGroup>
              <InputGroup label="Bairro" className="md:col-span-4">
                <input className="glass-input-sm" {...register('empresa_bairro')} />
              </InputGroup>
              <InputGroup label="Cidade" className="md:col-span-4">
                <input className="glass-input-sm" {...register('empresa_cidade')} />
              </InputGroup>
              <InputGroup label="UF" className="md:col-span-4">
                <input className="glass-input-sm text-center uppercase" maxLength={2} {...register('empresa_uf')} />
              </InputGroup>
              <InputGroup label="Pessoa de Contato" className="md:col-span-6">
                <input className="glass-input-sm" {...register('empresa_contato')} />
              </InputGroup>
              <InputGroup label="Telefone" className="md:col-span-3">
                <input className="glass-input-sm" {...register('empresa_telefone')} />
              </InputGroup>
              <InputGroup label="Fax" className="md:col-span-3">
                <input className="glass-input-sm" {...register('empresa_fax')} />
              </InputGroup>
              <InputGroup label="Pessoa de contato (Fortaleza)" className="md:col-span-3">
                <input className="glass-input-sm" {...register('empresa_contato_fortaleza')} />
              </InputGroup>
              <InputGroup label="Telefone" className="md:col-span-3">
                <input className="glass-input-sm" {...register('empresa_fortaleza_tel')} />
              </InputGroup>
              <InputGroup label="Fax" className="md:col-span-2">
                <input className="glass-input-sm" {...register('empresa_fortaleza_fax')} />
              </InputGroup>
              <InputGroup label="E-mail" className="md:col-span-4">
                <input className="glass-input-sm" {...register('empresa_fortaleza_email')} />
              </InputGroup>
              <InputGroup label="Renda da Empresa R$" className="md:col-span-4">
                <input className="glass-input-sm" {...register('empresa_renda')} />
              </InputGroup>
              <InputGroup label="Outras Rendas R$" className="md:col-span-4">
                <input className="glass-input-sm" {...register('empresa_outras_rendas')} />
              </InputGroup>
              <InputGroup label="Origem" className="md:col-span-4">
                <input className="glass-input-sm" {...register('empresa_origem_rendas')} />
              </InputGroup>
              <InputGroup label="Prédio da Empresa" className="md:col-span-12 flex items-center gap-8 bg-white/5 px-4 rounded-lg border border-white/5 min-h-[34px] py-2">
                <div className="flex gap-4">
                  {['Próprio', 'Alugado'].map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" value={t} {...register('empresa_predio_tipo')} className="w-3.5 h-3.5 text-primary bg-slate-800" />
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{t}</span>
                    </label>
                  ))}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4 border-l border-white/10">R$:</span>
                  <input className="glass-input-sm max-w-[150px]" {...register('empresa_predio_valor')} />
                </div>
              </InputGroup>
            </div>
          </GlassCard>

          {/* 4. REPRESENTANTE LEGAL 01 */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={User} title="Dados do Representante Legal (01)" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <InputGroup label="Nome Completo" className="md:col-span-12">
                <input className="glass-input-sm" {...register('rep1_nome')} />
              </InputGroup>
              <InputGroup label="Sexo" className="md:col-span-4 flex items-center gap-6 bg-white/5 px-4 rounded-lg border border-white/5 h-[34px]">
                {['Masculino', 'Feminino'].map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" value={s} {...register('rep1_sexo')} className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{s}</span>
                  </label>
                ))}
              </InputGroup>
              <InputGroup label="Identidade" className="md:col-span-3">
                <input className="glass-input-sm" {...register('rep1_identidade')} />
              </InputGroup>
              <InputGroup label="Órgão Expedidor" className="md:col-span-2">
                <input className="glass-input-sm" {...register('rep1_orgao')} />
              </InputGroup>
              <InputGroup label="Data Nascimento" className="md:col-span-3">
                <input className="glass-input-sm" placeholder="  /  /  " {...register('rep1_nascimento')} />
              </InputGroup>
              <InputGroup label="Filiação" className="md:col-span-12">
                <input className="glass-input-sm" {...register('rep1_filiacao')} />
              </InputGroup>
              <InputGroup label="CPF" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep1_cpf')} />
              </InputGroup>
              <InputGroup label="Naturalidade/UF" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep1_naturalidade')} />
              </InputGroup>
              <InputGroup label="Nacionalidade" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep1_nacionalidade')} />
              </InputGroup>
              <InputGroup label="Estado Civil" className="md:col-span-12 flex flex-wrap gap-4 items-center bg-white/5 px-4 rounded-lg border border-white/5 h-auto py-2 min-h-[34px]">
                {['Solteiro', 'Casado', 'Divorciado', 'Separado Judicialmente', 'Viúvo', 'União Estável'].map(e => (
                  <label key={e} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" value={e} {...register('rep1_estado_civil')} className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{e}</span>
                  </label>
                ))}
              </InputGroup>
              <InputGroup label="CEP" className="md:col-span-3">
                <input 
                  className="glass-input-sm" 
                  {...register('rep1_cep')} 
                  onBlur={(e) => handleCepLookup(e.target.value, 'rep1_')}
                  placeholder="00000-000"
                />
              </InputGroup>
              <InputGroup label="Endereço Residencial" className="md:col-span-9">
                <input className="glass-input-sm" {...register('rep1_endereco')} />
              </InputGroup>
              <InputGroup label="Bairro" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep1_bairro')} />
              </InputGroup>
              <InputGroup label="Cidade" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep1_cidade')} />
              </InputGroup>
              <InputGroup label="UF" className="md:col-span-4">
                <input className="glass-input-sm text-center uppercase" maxLength={2} {...register('rep1_uf')} />
              </InputGroup>
              <InputGroup label="Telefone" className="md:col-span-3">
                <input className="glass-input-sm" {...register('rep1_telefone')} />
              </InputGroup>
              <InputGroup label="Celular" className="md:col-span-3">
                <input className="glass-input-sm" {...register('rep1_celular')} />
              </InputGroup>
              <InputGroup label="E-mail" className="md:col-span-6">
                <input className="glass-input-sm" {...register('rep1_email')} />
              </InputGroup>
              <InputGroup label="Profissão" className="md:col-span-6">
                <input className="glass-input-sm" {...register('rep1_profissao')} />
              </InputGroup>
              <InputGroup label="Cargo/ Função" className="md:col-span-6">
                <input className="glass-input-sm" {...register('rep1_cargo')} />
              </InputGroup>
              <InputGroup label="Ligação com a empresa" className="md:col-span-12 flex items-center gap-8 bg-white/5 px-4 rounded-lg border border-white/5 h-[34px]">
                {['Sócio', 'Procurador'].map(l => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" value={l} {...register('rep1_ligacao')} className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{l}</span>
                  </label>
                ))}
              </InputGroup>
            </div>
          </GlassCard>

          {/* 5. REPRESENTANTE LEGAL 02 */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={User} title="Dados do Representante Legal (02)" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <InputGroup label="Nome Completo" className="md:col-span-12">
                <input className="glass-input-sm" {...register('rep2_nome')} />
              </InputGroup>
              <InputGroup label="Sexo" className="md:col-span-4 flex items-center gap-6 bg-white/5 px-4 rounded-lg border border-white/5 h-[34px]">
                {['Masculino', 'Feminino'].map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" value={s} {...register('rep2_sexo')} className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{s}</span>
                  </label>
                ))}
              </InputGroup>
              <InputGroup label="Identidade" className="md:col-span-3">
                <input className="glass-input-sm" {...register('rep2_identidade')} />
              </InputGroup>
              <InputGroup label="Órgão Expedidor" className="md:col-span-2">
                <input className="glass-input-sm" {...register('rep2_orgao')} />
              </InputGroup>
              <InputGroup label="Data Nascimento" className="md:col-span-3">
                <input className="glass-input-sm" placeholder="  /  /  " {...register('rep2_nascimento')} />
              </InputGroup>
              <InputGroup label="Filiação" className="md:col-span-12">
                <input className="glass-input-sm" {...register('rep2_filiacao')} />
              </InputGroup>
              <InputGroup label="CPF" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep2_cpf')} />
              </InputGroup>
              <InputGroup label="Naturalidade/UF" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep2_naturalidade')} />
              </InputGroup>
              <InputGroup label="Nacionalidade" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep2_nacionalidade')} />
              </InputGroup>
              <InputGroup label="Estado Civil" className="md:col-span-12 flex flex-wrap gap-4 items-center bg-white/5 px-4 rounded-lg border border-white/5 h-auto py-2 min-h-[34px]">
                {['Solteiro', 'Casado', 'Divorciado', 'Separado Judicialmente', 'Viúvo', 'União Estável'].map(e => (
                  <label key={e} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" value={e} {...register('rep2_estado_civil')} className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{e}</span>
                  </label>
                ))}
              </InputGroup>
              <InputGroup label="CEP" className="md:col-span-3">
                <input 
                  className="glass-input-sm" 
                  {...register('rep2_cep')} 
                  onBlur={(e) => handleCepLookup(e.target.value, 'rep2_')}
                  placeholder="00000-000"
                />
              </InputGroup>
              <InputGroup label="Endereço Residencial" className="md:col-span-9">
                <input className="glass-input-sm" {...register('rep2_endereco')} />
              </InputGroup>
              <InputGroup label="Bairro" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep2_bairro')} />
              </InputGroup>
              <InputGroup label="Cidade" className="md:col-span-4">
                <input className="glass-input-sm" {...register('rep2_cidade')} />
              </InputGroup>
              <InputGroup label="UF" className="md:col-span-4">
                <input className="glass-input-sm text-center uppercase" maxLength={2} {...register('rep2_uf')} />
              </InputGroup>
              <InputGroup label="Telefone" className="md:col-span-3">
                <input className="glass-input-sm" {...register('rep2_telefone')} />
              </InputGroup>
              <InputGroup label="Celular" className="md:col-span-3">
                <input className="glass-input-sm" {...register('rep2_celular')} />
              </InputGroup>
              <InputGroup label="E-mail" className="md:col-span-6">
                <input className="glass-input-sm" {...register('rep2_email')} />
              </InputGroup>
              <InputGroup label="Profissão" className="md:col-span-6">
                <input className="glass-input-sm" {...register('rep2_profissao')} />
              </InputGroup>
              <InputGroup label="Cargo/ Função" className="md:col-span-6">
                <input className="glass-input-sm" {...register('rep2_cargo')} />
              </InputGroup>
              <InputGroup label="Ligação com a empresa" className="md:col-span-12 flex items-center gap-8 bg-white/5 px-4 rounded-lg border border-white/5 h-[34px]">
                {['Sócio', 'Procurador'].map(l => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" value={l} {...register('rep2_ligacao')} className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{l}</span>
                  </label>
                ))}
              </InputGroup>
            </div>
          </GlassCard>

          {/* 6. REFERÊNCIAS */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={Users} title="Referências (Pessoais, Comerciais, Imobiliárias e Bancárias)" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Pessoais</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input className="glass-input-sm md:col-span-1" placeholder="Nome" />
                    <input className="glass-input-sm md:col-span-1" placeholder="Relação" />
                    <input className="glass-input-sm md:col-span-1" placeholder="Telefone" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Comerciais</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input className="glass-input-sm" placeholder="Nome da Empresa" />
                    <input className="glass-input-sm" placeholder="Telefone" />
                  </div>
                ))}
              </div>
              <div className="space-y-3 lg:col-span-2 mt-4 pt-4 border-t border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Imobiliárias</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input className="glass-input-sm" placeholder="Nome" />
                    <input className="glass-input-sm" placeholder="Telefone" />
                  </div>
                ))}
              </div>
              <div className="lg:col-span-2 space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Bancárias / Conta Corrente</p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-6 flex gap-4 bg-white/5 px-4 rounded-lg border border-white/5 h-[34px] items-center">
                    {['Comum', 'Cheque Especial', 'Não tem'].map(b => (
                      <label key={b} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" value={b} className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{b}</span>
                      </label>
                    ))}
                  </div>
                  <InputGroup label="Banco" className="md:col-span-6">
                    <input className="glass-input-sm" />
                  </InputGroup>
                  <InputGroup label="Agência" className="md:col-span-4">
                    <input className="glass-input-sm" />
                  </InputGroup>
                  <InputGroup label="Conta" className="md:col-span-4">
                    <input className="glass-input-sm" />
                  </InputGroup>
                  <InputGroup label="Gerente" className="md:col-span-4">
                    <input className="glass-input-sm" />
                  </InputGroup>
                  <div className="md:col-span-12 flex flex-wrap gap-4 items-center bg-white/5 px-4 rounded-lg border border-white/5 py-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cartão/Limite:</span>
                    {['Credicard R$', 'Visa R$', 'American Express R$'].map(c => (
                      <div key={c} className="flex items-center gap-2 bg-slate-900/50 px-2 py-1 rounded">
                        <label className="text-[10px] font-bold text-slate-400">{c}</label>
                        <input className="glass-input-sm !h-[24px] !px-2 max-w-[80px]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* 7. BENS */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={Banknote} title="Bens (Imóveis e Veículos)" />
            <div className="space-y-8">
              <div className="space-y-3 border-l-2 border-primary/20 pl-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Imóveis</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-end">
                    <div className="lg:col-span-5 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Endereço</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Matrícula/Cartório</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Valor R$</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-3 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Avaliação RF (Uso Interno)</label>
                      <input className="glass-input-sm !bg-primary/5" disabled />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-l-2 border-accent/20 pl-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Veículos</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-end">
                    <div className="lg:col-span-4 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Marca/Modelo</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-1 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Ano</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Placa</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-1 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Fin.?</label>
                      <select className="glass-input-sm"><option>Não</option><option>Sim</option></select>
                    </div>
                    <div className="lg:col-span-4 space-y-1">
                      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Financeira / Valor</label>
                      <div className="flex gap-1">
                        <input className="glass-input-sm flex-[2]" placeholder="Nome" />
                        <input className="glass-input-sm flex-[1]" placeholder="R$" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* 8. COMPLEMENTO E FINALIZAÇÃO */}
          <GlassCard className="p-6 md:p-8 bg-primary/5 border-primary/20">
            <SectionTitle icon={ClipboardCheck} title="Documentos e Finalização" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <InputGroup label="Nome do (a) Fiador (a) - 01">
                  <input className="glass-input-sm" {...register('fiador_nome_1')} />
                </InputGroup>
                <InputGroup label="Nome do (a) Fiador (a) - 02">
                  <input className="glass-input-sm" {...register('fiador_nome_2')} />
                </InputGroup>
                <InputGroup label="Relação do Fiador com o Pretendente">
                  <input className="glass-input-sm" {...register('relacao_fiador')} />
                </InputGroup>
                <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-white/5">
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic">
                    Para os devidos fins de direito, responsabilizo-me pela veracidade das informações ora prestadas, ficando as fontes por mim fornecidas autorizadas a trocar informações a meu respeito. Em caso de não-confirmação destes dados, estarei incorrendo nos artigos 171 e 299 do Código Penal.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <DocumentUploader />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info size={16} className="text-primary" /> Documentos Necessários (PJ)
                </h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-tighter">Inquilino:</span>
                    <ul className="text-[11px] text-slate-400 space-y-1 mt-1 font-bold">
                      <li>1. Cartão do CNPJ atualizado</li>
                      <li>2. Contrato Social e último aditivo</li>
                      <li>3. Balanço Patrimonial e IRPJ (último exercício)</li>
                      <li>4. Cópia de Identidade e CPF dos representantes</li>
                      <li>5. Se for o caso, procuração com direitos para locação</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-accent uppercase tracking-tighter">Fiador:</span>
                    <ul className="text-[11px] text-slate-400 space-y-1 mt-1 font-bold">
                      <li>1. Cópia de Identidade e CPF (e do cônjuge se houver)</li>
                      <li>2. Comprovante de endereço e de renda (IRPF/DECORE)</li>
                      <li>3. Registro do imóvel do fiador (atualizado nos últimos 90 dias)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-accent" /> Observações Importantes
                </h4>
                <ol className="text-[11px] text-slate-400 space-y-2 font-bold list-decimal pl-4">
                  <li>O preenchimento desta proposta não implica em compromisso pela Administradora ou proprietário.</li>
                  <li>A devolução deve ser feita em até 48h com todos os documentos solicitados acima.</li>
                  <li>Solicitamos preencher todos os campos em letra de forma e sem rasuras.</li>
                  <li>As chaves serão entregues após a devolução do contrato assinado com firmas reconhecidas.</li>
                  <li>Caso a locação não se concretize, a documentação ficará disponível por 15 dias.</li>
                  <li>O sucesso da análise depende da quantidade de informações fornecidas.</li>
                </ol>
              </div>
            </div>
          </GlassCard>
          
          <div className="flex justify-end pt-8">
            <button 
              type="submit"
              className="px-16 py-6 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-[0_15px_40px_rgba(14,165,233,0.4)] hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-[0.3em] group"
            >
              <span className="flex items-center gap-3">
                Finalizar Cadastro <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
