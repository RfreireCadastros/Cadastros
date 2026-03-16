import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, Save, User, MapPin, ShieldAlert, Home, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DocumentUploader } from '../components/ui/DocumentUploader';
import { motion } from 'framer-motion';

const pfSchema = z.object({
  tipo_cadastro: z.enum(['Locatário', 'Fiador']),
  nome: z.string().min(3, 'Nome muito curto'),
  sexo: z.string(),
  data_nascimento: z.string(),
  rg: z.string(),
  orgao_expedidor: z.string(),
  cpf: z.string().min(11, 'CPF inválido'),
  estado_civil: z.string(),
  grau_instrucao: z.string(),
  
  endereco: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  uf: z.string(),
  cep: z.string(),
  
  email: z.string().email('Email inválido'),
  telefone: z.string(),
  celular: z.string(),

  tipo_residencia: z.string(),
  valor_aluguel: z.string().optional(),
  tempo_residencia: z.string(),
  numero_dependentes: z.string()
});

type PFFormData = z.infer<typeof pfSchema>;

export const FormPF: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<PFFormData>({
    resolver: zodResolver(pfSchema),
    defaultValues: { tipo_cadastro: 'Locatário' }
  });

  const tipoResidencia = watch('tipo_residencia');

  const onSubmit = (data: PFFormData) => {
    console.log(data);
    alert('Cadastro enviado com sucesso!');
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen relative z-10 py-12 px-4 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-4"
        >
          <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center group-hover:border-white/20">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium">Voltar ao Início</span>
        </button>

        <header className="text-center md:text-left space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-gradient">Registro Pessoa Física</h1>
          <p className="text-slate-500 font-medium">Preencha as informações detalhadamente para análise.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* TIPO DE CADASTRO */}
          <GlassCard className="!p-4 bg-white/5">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mr-4">Finalidade:</span>
              <div className="flex gap-4">
                {['Locatário', 'Fiador'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group px-6 py-3 rounded-xl border border-white/5 hover:bg-white/5 transition-all">
                    <input type="radio" value={type} {...register('tipo_cadastro')} className="w-4 h-4 text-primary bg-transparent border-white/20 focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300 group-hover:text-white font-bold transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* DADOS PESSOAIS */}
          <GlassCard className="p-8 md:p-10">
            <SectionTitle icon={User} title="Dados Pessoais" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-2">
                <label className="glass-label">Nome Completo</label>
                <input {...register('nome')} className="glass-input" placeholder="Nome como no RG" />
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="glass-label">Sexo</label>
                <select {...register('sexo')} className="glass-input appearance-none">
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="glass-label">CPF</label>
                <input {...register('cpf')} className="glass-input" placeholder="000.000.000-00" />
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="glass-label">RG</label>
                <input {...register('rg')} className="glass-input" />
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="glass-label">Órgão Expedidor</label>
                <input {...register('orgao_expedidor')} className="glass-input" />
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="glass-label">Data de Nascimento</label>
                <input type="date" {...register('data_nascimento')} className="glass-input" />
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="glass-label">Estado Civil</label>
                <select {...register('estado_civil')} className="glass-input appearance-none">
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="União Estável">União Estável</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                </select>
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="glass-label">Grau de Instrução</label>
                <select {...register('grau_instrucao')} className="glass-input appearance-none">
                  <option value="1º Grau">1º Grau</option>
                  <option value="2º Grau">2º Grau</option>
                  <option value="Superior">Superior</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* ENDEREÇO */}
          <GlassCard className="p-8 md:p-10">
            <SectionTitle icon={MapPin} title="Endereço Residencial" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 space-y-2">
                <label className="glass-label">CEP</label>
                <input {...register('cep')} className="glass-input" placeholder="00000-000" />
              </div>
              <div className="md:col-span-9 space-y-2">
                <label className="glass-label">Endereço Completo</label>
                <input {...register('endereco')} className="glass-input" placeholder="Rua, Av, etc." />
              </div>
              <div className="md:col-span-5 space-y-2">
                <label className="glass-label">Bairro</label>
                <input {...register('bairro')} className="glass-input" />
              </div>
              <div className="md:col-span-5 space-y-2">
                <label className="glass-label">Cidade</label>
                <input {...register('cidade')} className="glass-input" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="glass-label">UF</label>
                <input {...register('uf')} className="glass-input" maxLength={2} />
              </div>
            </div>
          </GlassCard>

          {/* CONTATO */}
          <GlassCard className="p-8 md:p-10">
            <SectionTitle icon={Phone} title="Informações de Contato" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="glass-label">Email Principal</label>
                <input type="email" {...register('email')} className="glass-input" placeholder="exemplo@email.com" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">WhatsApp / Celular</label>
                <input {...register('celular')} className="glass-input" placeholder="(00) 00000-0000" />
              </div>
            </div>
          </GlassCard>

          {/* SITUAÇÃO RESIDENCIAL */}
          <GlassCard className="p-8 md:p-10">
            <SectionTitle icon={Home} title="Situação Residencial" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 space-y-2">
                <label className="glass-label">Tipo de Posse</label>
                <select {...register('tipo_residencia')} className="glass-input appearance-none">
                  <option value="Própria">Própria</option>
                  <option value="Alugada">Alugada</option>
                  <option value="Com os pais">Com os pais</option>
                  <option value="Financiada">Financiada</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              {tipoResidencia === 'Alugada' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="md:col-span-3 space-y-2"
                >
                  <label className="glass-label">Valor Aluguel (R$)</label>
                  <input {...register('valor_aluguel')} className="glass-input" placeholder="0.000,00" />
                </motion.div>
              )}
              <div className="md:col-span-3 space-y-2">
                <label className="glass-label">Tempo de Residência</label>
                <input {...register('tempo_residencia')} className="glass-input" placeholder="Ex: 5 anos" />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="glass-label">Nº Dependentes</label>
                <input type="number" {...register('numero_dependentes')} className="glass-input" />
              </div>
            </div>
          </GlassCard>

          {/* UPLOAD DOCUMENTOS */}
          <GlassCard className="p-8 md:p-10">
            <SectionTitle icon={ShieldAlert} title="Anexar Documentação" />
            <DocumentUploader />
          </GlassCard>

          <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 mt-12 border-t border-white/5">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="px-10 py-5 text-slate-500 font-bold hover:text-white transition-colors order-2 md:order-1"
            >
              Cancelar Registro
            </button>
            <button type="submit" className="glass-button min-w-[280px] order-1 md:order-2">
              <Save size={24} />
              Finalizar e Enviar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
