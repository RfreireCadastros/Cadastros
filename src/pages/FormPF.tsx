import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  ArrowLeft, Save, User, ShieldAlert, Home, 
  Briefcase, Heart, Users, Banknote, 
  Info, ClipboardCheck
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

const pfSchema = z.object({
  // USO INTERNO
  tipo_cadastro: z.enum(['Inquilino', 'Fiador']),
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
  vencimento: z.string().default('Último dia útil'),
  destinacao: z.string().optional(),
  encargos_seguro: z.boolean().optional(),
  encargos_condominio: z.boolean().optional(),
  encargos_iptu: z.boolean().optional(),
  observacoes_locacao: z.string().optional(),

  // DADOS PESSOAIS
  nome: z.string().min(3, 'Obrigatório'),
  sexo: z.string().optional(),
  data_nascimento: z.string().optional(),
  identidade: z.string().optional(),
  orgao_expedidor: z.string().optional(),
  filiacao: z.string().optional(),
  cpf: z.string().min(11, 'Inválido'),
  naturalidade: z.string().optional(),
  nacionalidade: z.string().optional(),
  estado_civil: z.string().optional(),
  grau_instrucao: z.string().optional(),
  endereco_residencial: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  telefone: z.string().optional(),
  celular: z.string().optional(),
  email: z.string().optional(),
  tipo_residencia: z.string().optional(),
  residencia_valor: z.string().optional(),
  tempo_reside: z.string().optional(),
  num_dependentes: z.string().optional(),

  // DADOS DO CÔNJUGE
  conjuge_nome: z.string().optional(),
  conjuge_identidade: z.string().optional(),
  conjuge_orgao: z.string().optional(),
  conjuge_nascimento: z.string().optional(),
  conjuge_filiacao: z.string().optional(),
  conjuge_cpf: z.string().optional(),
  conjuge_naturalidade: z.string().optional(),
  conjuge_nacionalidade: z.string().optional(),
  conjuge_profissao: z.string().optional(),
  conjuge_atividade: z.string().optional(),
  conjuge_empresa: z.string().optional(),
  conjuge_cargo: z.string().optional(),
  conjuge_admissao: z.string().optional(),
  conjuge_endereco: z.string().optional(),
  conjuge_bairro: z.string().optional(),
  conjuge_cidade: z.string().optional(),
  conjuge_uf: z.string().optional(),
  conjuge_cep: z.string().optional(),
  conjuge_telefone: z.string().optional(),
  conjuge_ramal: z.string().optional(),
  conjuge_celular: z.string().optional(),
  conjuge_rendas: z.string().optional(),
  conjuge_outras_rendas: z.string().optional(),
  conjuge_outras_origem: z.string().optional(),

  // DADOS PROFISSIONAIS
  profissao: z.string().optional(),
  atividade_autonomo: z.string().optional(),
  empresa: z.string().optional(),
  empresa_cnpj: z.string().optional(),
  cargo: z.string().optional(),
  admissao: z.string().optional(),
  endereco_comercial: z.string().optional(),
  bairro_comercial: z.string().optional(),
  cidade_comercial: z.string().optional(),
  uf_comercial: z.string().optional(),
  cep_comercial: z.string().optional(),
  telefone_rh: z.string().optional(),
  comercial_ramal: z.string().optional(),
  comercial_fax: z.string().optional(),
  comercial_email: z.string().optional(),
  renda: z.string().optional(),
  outras_rendas: z.string().optional(),
  origem_outras: z.string().optional(),
});

type PFFormData = z.infer<typeof pfSchema>;

export const FormPF: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PFFormData>({
    resolver: zodResolver(pfSchema),
    defaultValues: {
      tipo_cadastro: 'Inquilino',
      reajuste: 'Anual',
      vencimento: 'Último dia útil',
      estado_civil: 'Solteiro'
    }
  });

  const estadoCivil = watch('estado_civil');
  const showConjuge = estadoCivil === 'Casado' || estadoCivil === 'U. Estável';

  const onSubmit = (data: PFFormData) => {
    console.log(data);
    alert('Cadastro PF finalizado com sucesso!');
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
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Cadastro Inquilino <span className="text-primary">/</span> Fiador</h1>
            <p className="text-slate-500 text-xs font-bold mt-1 tracking-tight">Pessoa Física - Formulário Detalhado</p>
          </div>
          <button 
            form="form-pf"
            className="h-[48px] px-8 bg-primary hover:bg-primary-dark text-white font-black rounded-xl flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(14,165,233,0.3)] active:scale-95 text-[11px] uppercase tracking-widest"
          >
            <Save size={18} /> Finalizar Registro
          </button>
        </header>

        <form id="form-pf" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* 1. USO INTERNO */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={ShieldAlert} title="Para Uso Interno" />
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <InputGroup label="Tipo de Cadastro" className="lg:col-span-2">
                <select className="glass-input-sm appearance-none" {...register('tipo_cadastro')}>
                  <option value="Inquilino">Inquilino</option>
                  <option value="Fiador">Fiador</option>
                </select>
              </InputGroup>
              <InputGroup label="Cód. Pretendente">
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
              <InputGroup label="Atendente" className="lg:col-span-2">
                <input className="glass-input-sm" {...register('atendente_responsavel')} />
              </InputGroup>
              <InputGroup label="Entregue por" className="lg:col-span-2">
                <input className="glass-input-sm" {...register('ficha_entregue_por')} />
              </InputGroup>
              <InputGroup label="Data Entrega">
                <input type="text" placeholder="  /  /  " className="glass-input-sm" {...register('data_entrega')} />
              </InputGroup>
            </div>
          </GlassCard>

          {/* 2. DADOS DA LOCAÇÃO */}
          <GlassCard className="p-6 md:p-8 border-primary/10">
            <SectionTitle icon={Home} title="Dados da Locação (Caso Inquilino)" />
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3">
              <InputGroup label="Endereço do Imóvel" className="lg:col-span-10">
                <input className="glass-input-sm" {...register('endereco_imovel')} />
              </InputGroup>
              <InputGroup label="Cód. Imóvel" className="lg:col-span-2">
                <input className="glass-input-sm" {...register('cod_imovel')} />
              </InputGroup>
              <InputGroup label="Início do Contrato" className="lg:col-span-3">
                <input className="glass-input-sm" placeholder="  /  /  " {...register('inicio_contrato')} />
              </InputGroup>
              <InputGroup label="Prazo (Meses)" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('prazo_contrato')} />
              </InputGroup>
              <InputGroup label="Valor Aluguel R$" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('valor_aluguel')} />
              </InputGroup>
              <InputGroup label="Reajuste" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('reajuste')} />
              </InputGroup>
              <InputGroup label="Vencimento" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('vencimento')} />
              </InputGroup>
              <InputGroup label="Destinação" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('destinacao')} />
              </InputGroup>
              <div className="lg:col-span-6 flex items-center gap-4 h-[34px] bg-white/5 px-4 rounded-lg border border-white/5">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mr-2">Encargos:</span>
                <label className="flex items-center gap-2 cursor-pointer grayscale hover:grayscale-0 transition-all">
                  <input type="checkbox" className="w-3 h-3 rounded bg-slate-800 border-white/10 text-primary focus:ring-primary" {...register('encargos_seguro')} />
                  <span className="text-[9px] font-bold text-slate-400">Seguro</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer grayscale hover:grayscale-0 transition-all">
                  <input type="checkbox" className="w-3 h-3 rounded bg-slate-800 border-white/10 text-primary focus:ring-primary" {...register('encargos_condominio')} />
                  <span className="text-[9px] font-bold text-slate-400">Condomínio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer grayscale hover:grayscale-0 transition-all">
                  <input type="checkbox" className="w-3 h-3 rounded bg-slate-800 border-white/10 text-primary focus:ring-primary" {...register('encargos_iptu')} />
                  <span className="text-[9px] font-bold text-slate-400">IPTU</span>
                </label>
              </div>
              <InputGroup label="Observações" className="lg:col-span-12">
                <input className="glass-input-sm" {...register('observacoes_locacao')} />
              </InputGroup>
            </div>
          </GlassCard>

          {/* 3. DADOS PESSOAIS */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={User} title="Dados Pessoais" />
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3">
              <InputGroup label="Nome Completo" className="lg:col-span-6">
                <input className="glass-input-sm" {...register('nome')} />
                {errors.nome && <p className="text-[8px] text-accent mt-0.5">{errors.nome.message}</p>}
              </InputGroup>
              <InputGroup label="Sexo" className="lg:col-span-3">
                <select className="glass-input-sm appearance-none" {...register('sexo')}>
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </InputGroup>
              <InputGroup label="Data Nascimento" className="lg:col-span-3">
                <input type="text" placeholder="  /  /  " className="glass-input-sm" {...register('data_nascimento')} />
              </InputGroup>

              <InputGroup label="Identidade (RG)" className="lg:col-span-5">
                <input className="glass-input-sm" {...register('identidade')} />
              </InputGroup>
              <InputGroup label="Órgão Expedidor" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('orgao_expedidor')} />
              </InputGroup>
              <InputGroup label="CPF" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('cpf')} />
                {errors.cpf && <p className="text-[8px] text-accent mt-0.5">{errors.cpf.message}</p>}
              </InputGroup>

              <InputGroup label="Filiação (Pai e Mãe)" className="lg:col-span-12">
                <input className="glass-input-sm" {...register('filiacao')} />
              </InputGroup>

              <InputGroup label="Naturalidade/UF" className="lg:col-span-6">
                <input className="glass-input-sm" {...register('naturalidade')} />
              </InputGroup>
              <InputGroup label="Nacionalidade" className="lg:col-span-6">
                <input className="glass-input-sm" {...register('nacionalidade')} />
              </InputGroup>

              <InputGroup label="Estado Civil" className="lg:col-span-12 flex flex-wrap gap-4 items-center bg-white/5 px-2 rounded-lg border border-white/5 h-auto py-2">
                <label className="glass-label mb-0 border-r border-white/10 pr-4 mr-2">Estado Civil:</label>
                {['Solteiro', 'Casado', 'Divorciado', 'U. Estável', 'Viúvo', 'Separado Jud.'].map(status => (
                  <label key={status} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" value={status} {...register('estado_civil')} className="w-2.5 h-2.5 text-primary" />
                    <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{status}</span>
                  </label>
                ))}
              </InputGroup>
              
              <InputGroup label="Grau Instrução" className="lg:col-span-12 flex flex-wrap gap-4 items-center bg-white/5 px-2 rounded-lg border border-white/5 h-auto py-2">
                <label className="glass-label mb-0 border-r border-white/10 pr-4 mr-2">Grau Instrução:</label>
                {['1º G', '2º G', 'Sup.', 'Outros'].map(g => (
                  <label key={g} className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" value={g} {...register('grau_instrucao')} className="w-2.5 h-2.5 text-primary" />
                    <span className="text-[9px] font-bold text-slate-400">{g}</span>
                  </label>
                ))}
              </InputGroup>

              <InputGroup label="Endereço Residencial" className="lg:col-span-12">
                <input className="glass-input-sm" {...register('endereco_residencial')} />
              </InputGroup>
              <InputGroup label="Bairro" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('bairro')} />
              </InputGroup>
              <InputGroup label="Cidade" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('cidade')} />
              </InputGroup>
              <InputGroup label="UF" className="lg:col-span-1">
                <input className="glass-input-sm text-center uppercase" maxLength={2} {...register('uf')} />
              </InputGroup>
              <InputGroup label="CEP" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('cep')} />
              </InputGroup>

              <InputGroup label="Telefone Fixo" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('telefone')} />
              </InputGroup>
              <InputGroup label="Celular" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('celular')} />
              </InputGroup>
              <InputGroup label="E-mail" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('email')} />
              </InputGroup>

              <InputGroup label="Residência" className="lg:col-span-12 flex flex-wrap gap-4 items-center bg-white/5 px-2 rounded-lg border border-white/5 h-auto py-2">
                <label className="glass-label mb-0 border-r border-white/10 pr-4 mr-2">Situação:</label>
                {['Própria', 'Financiada', 'Alugada', 'Com Pais', 'Com Parentes'].map(r => (
                  <label key={r} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" value={r} {...register('tipo_residencia')} className="w-2.5 h-2.5 text-primary" />
                    <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{r}</span>
                  </label>
                ))}
              </InputGroup>
              <InputGroup label="Tempo Reside" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('tempo_reside')} />
              </InputGroup>
              <InputGroup label="Nº Dependentes" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('num_dependentes')} />
              </InputGroup>
            </div>
          </GlassCard>

          {/* 4. DADOS DO CÔNJUGE */}
          {showConjuge && (
            <GlassCard className="p-6 md:p-8">
              <SectionTitle icon={Heart} title="Dados do Cônjuge" />
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3">
                <InputGroup label="Nome Completo" className="lg:col-span-12">
                  <input className="glass-input-sm" {...register('conjuge_nome')} />
                </InputGroup>
                <InputGroup label="Identidade" className="lg:col-span-4">
                  <input className="glass-input-sm" {...register('conjuge_identidade')} />
                </InputGroup>
                <InputGroup label="Órgão Expedidor" className="lg:col-span-3">
                  <input className="glass-input-sm" {...register('conjuge_orgao')} />
                </InputGroup>
                <InputGroup label="Data Nascimento" className="lg:col-span-5">
                  <input className="glass-input-sm" placeholder="  /  /  " {...register('conjuge_nascimento')} />
                </InputGroup>
                <InputGroup label="Filiação" className="lg:col-span-12">
                  <input className="glass-input-sm" {...register('conjuge_filiacao')} />
                </InputGroup>
                <InputGroup label="CPF" className="lg:col-span-4">
                  <input className="glass-input-sm" {...register('conjuge_cpf')} />
                </InputGroup>
                <InputGroup label="Naturalidade/UF" className="lg:col-span-4">
                  <input className="glass-input-sm" {...register('conjuge_naturalidade')} />
                </InputGroup>
                <InputGroup label="Nacionalidade" className="lg:col-span-4">
                  <input className="glass-input-sm" {...register('conjuge_nacionalidade')} />
                </InputGroup>
                <InputGroup label="Profissão" className="lg:col-span-6">
                  <input className="glass-input-sm" {...register('conjuge_profissao')} />
                </InputGroup>
                <InputGroup label="Atividade (Autônomo)" className="lg:col-span-6">
                  <input className="glass-input-sm" {...register('conjuge_atividade')} />
                </InputGroup>
                <InputGroup label="Empresa onde trabalha" className="lg:col-span-12">
                  <input className="glass-input-sm" {...register('conjuge_empresa')} />
                </InputGroup>
                <InputGroup label="Cargo/Função" className="lg:col-span-8">
                  <input className="glass-input-sm" {...register('conjuge_cargo')} />
                </InputGroup>
                <InputGroup label="Admissão" className="lg:col-span-4">
                  <input className="glass-input-sm" placeholder="  /  /  " {...register('conjuge_admissao')} />
                </InputGroup>
                <InputGroup label="Endereço" className="lg:col-span-12">
                  <input className="glass-input-sm" {...register('conjuge_endereco')} />
                </InputGroup>
                <InputGroup label="Bairro" className="lg:col-span-4">
                  <input className="glass-input-sm" {...register('conjuge_bairro')} />
                </InputGroup>
                <InputGroup label="Cidade" className="lg:col-span-4">
                  <input className="glass-input-sm" {...register('conjuge_cidade')} />
                </InputGroup>
                <InputGroup label="UF" className="lg:col-span-1">
                  <input className="glass-input-sm text-center uppercase" maxLength={2} {...register('conjuge_uf')} />
                </InputGroup>
                <InputGroup label="CEP" className="lg:col-span-3">
                  <input className="glass-input-sm" {...register('conjuge_cep')} />
                </InputGroup>
                <InputGroup label="Telefone" className="lg:col-span-3">
                  <input className="glass-input-sm" {...register('conjuge_telefone')} />
                </InputGroup>
                <InputGroup label="Ramal" className="lg:col-span-2">
                  <input className="glass-input-sm" {...register('conjuge_ramal')} />
                </InputGroup>
                <InputGroup label="Celular" className="lg:col-span-3">
                  <input className="glass-input-sm" {...register('conjuge_celular')} />
                </InputGroup>
                <InputGroup label="Renda Mensal R$" className="lg:col-span-4">
                  <input className="glass-input-sm" {...register('conjuge_rendas')} />
                </InputGroup>
              </div>
            </GlassCard>
          )}

          {/* 5. DADOS PROFISSIONAIS */}
          <GlassCard className="p-6 md:p-8 border-white/10">
            <SectionTitle icon={Briefcase} title="Dados Profissionais" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              <InputGroup label="Profissão" className="lg:col-span-6">
                <input className="glass-input-sm" {...register('profissao')} />
              </InputGroup>
              <InputGroup label="Atividade (Se Autônomo)" className="lg:col-span-6">
                <input className="glass-input-sm" {...register('atividade_autonomo')} />
              </InputGroup>
              <InputGroup label="Empresa onde trabalha" className="lg:col-span-8">
                <input className="glass-input-sm" {...register('empresa')} />
              </InputGroup>
              <InputGroup label="CNPJ" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('empresa_cnpj')} />
              </InputGroup>
              <InputGroup label="Cargo/Função" className="lg:col-span-8">
                <input className="glass-input-sm" {...register('cargo')} />
              </InputGroup>
              <InputGroup label="Admissão" className="lg:col-span-4">
                <input className="glass-input-sm" placeholder="  /  /  " {...register('admissao')} />
              </InputGroup>
              <InputGroup label="Endereço Comercial" className="lg:col-span-12">
                <input className="glass-input-sm" {...register('endereco_comercial')} />
              </InputGroup>
              <InputGroup label="Bairro" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('bairro_comercial')} />
              </InputGroup>
              <InputGroup label="Cidade" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('cidade_comercial')} />
              </InputGroup>
              <InputGroup label="UF" className="lg:col-span-1">
                <input className="glass-input-sm text-center uppercase" maxLength={2} {...register('uf_comercial')} />
              </InputGroup>
              <InputGroup label="CEP" className="lg:col-span-3">
                <input className="glass-input-sm" {...register('cep_comercial')} />
              </InputGroup>
              <InputGroup label="Telefone (RH)" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('telefone_rh')} />
              </InputGroup>
              <InputGroup label="Ramal" className="lg:col-span-2">
                <input className="glass-input-sm" {...register('comercial_ramal')} />
              </InputGroup>
              <InputGroup label="E-mail" className="lg:col-span-6">
                <input className="glass-input-sm" {...register('comercial_email')} />
              </InputGroup>
              <InputGroup label="Renda R$" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('renda')} />
              </InputGroup>
              <InputGroup label="Outras Rendas R$" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('outras_rendas')} />
              </InputGroup>
              <InputGroup label="Origem Outras Rendas" className="lg:col-span-4">
                <input className="glass-input-sm" {...register('origem_outras')} />
              </InputGroup>
            </div>
          </GlassCard>

          {/* 6. REFERÊNCIAS */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={Users} title="Referências (Pessoais, Comerciais, Imobiliárias e Bancárias)" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pessoais */}
              <div className="space-y-3">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Referências Pessoais (Parentes)</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input className="glass-input-sm md:col-span-1" placeholder="Nome" />
                    <input className="glass-input-sm md:col-span-1" placeholder="Relac." />
                    <input className="glass-input-sm md:col-span-1" placeholder="Telefone" />
                  </div>
                ))}
              </div>
              {/* Comerciais */}
              <div className="space-y-3">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Referências Comerciais</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input className="glass-input-sm" placeholder="Nome da Empresa" />
                    <input className="glass-input-sm" placeholder="Telefone" />
                  </div>
                ))}
              </div>
              {/* Bancárias */}
              <div className="lg:col-span-2 space-y-3 pt-4 border-t border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Informações Bancárias</p>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3">
                  <InputGroup label="Banco" className="lg:col-span-4">
                    <input className="glass-input-sm" />
                  </InputGroup>
                  <InputGroup label="Agência" className="lg:col-span-2">
                    <input className="glass-input-sm" />
                  </InputGroup>
                  <InputGroup label="Conta" className="lg:col-span-3">
                    <input className="glass-input-sm" />
                  </InputGroup>
                  <InputGroup label="Tel. Gerente" className="lg:col-span-3">
                    <input className="glass-input-sm" />
                  </InputGroup>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* 7. BENS */}
          <GlassCard className="p-6 md:p-8">
            <SectionTitle icon={Banknote} title="Bens (Imóveis e Veículos)" />
            <div className="space-y-8">
              {/* Imóveis */}
              <div className="space-y-3 border-l-2 border-primary/20 pl-4">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Imóveis</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-10 gap-2 items-end">
                    <div className="lg:col-span-5 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Endereço</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-1 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Matr.</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Valor R$</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Avaliação RF</label>
                      <input className="glass-input-sm placeholder:text-primary/20" placeholder="Interno" disabled />
                    </div>
                  </div>
                ))}
              </div>

              {/* Veículos */}
              <div className="space-y-3 border-l-2 border-accent/20 pl-4">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Veículos</p>
                {[1, 2].map(i => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-end">
                    <div className="lg:col-span-4 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Marca/Modelo</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-1 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Ano</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Placa</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-1 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Fin.?</label>
                      <select className="glass-input-sm"><option>Não</option><option>Sim</option></select>
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Financeira</label>
                      <input className="glass-input-sm" />
                    </div>
                    <div className="lg:col-span-2 space-y-1">
                      <label className="text-[8px] font-bold text-slate-600 uppercase ml-1">Valor R$</label>
                      <input className="glass-input-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* 8. DOCUMENTOS NECESSÁRIOS */}
          <GlassCard className="p-6 md:p-8 bg-primary/5 border-primary/20">
            <SectionTitle icon={ClipboardCheck} title="Documentos e Finalização" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Info size={14} className="text-primary" /> Checklist de Documentos
                </h4>
                <ul className="text-[11px] text-slate-400 space-y-2 leading-relaxed font-bold">
                  <li>• Cópia de Identidade e CPF (Frente e Verso)</li>
                  <li>• Se casado, cópia de Identidade e CPF do cônjuge</li>
                  <li>• Comprovante de endereço atualizado</li>
                  <li>• Comprovante de renda dos 03 últimos meses</li>
                  <li>• Registro do imóvel do fiador sem ônus e atualizado</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <DocumentUploader />
              </div>
            </div>
          </GlassCard>
          
          <div className="flex justify-end pt-8">
            <button 
              type="submit"
              className="px-16 py-6 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-[0_15px_40px_rgba(14,165,233,0.4)] hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-[0.3em] group"
            >
              <span className="flex items-center gap-3">
                Finalizar Cadastro Completo <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
