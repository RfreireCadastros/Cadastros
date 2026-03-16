import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, Save, User, MapPin, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DocumentUploader } from '../components/ui/DocumentUploader';

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
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
      <Icon size={20} className="text-primary" />
      <h3 className="text-lg font-bold uppercase tracking-wider text-slate-200">{title}</h3>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10 relative z-10 max-w-5xl">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
        <ArrowLeft size={20} /> Início
      </button>

      <GlassCard>
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
          Cadastro de Pessoa Física
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* TIPO DE CADASTRO */}
          <div className="flex gap-8 justify-center p-4 bg-white/5 rounded-xl border border-white/10">
            {['Locatário', 'Fiador'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" value={type} {...register('tipo_cadastro')} className="w-4 h-4 text-primary bg-transparent border-white/20" />
                <span className="text-slate-300 group-hover:text-white transition-colors">{type}</span>
              </label>
            ))}
          </div>

          {/* DADOS PESSOAIS */}
          <section>
            <SectionTitle icon={User} title="Dados Pessoais" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="glass-label">Nome Completo</label>
                <input {...register('nome')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">Sexo</label>
                <select {...register('sexo')} className="glass-input">
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="glass-label">CPF</label>
                <input {...register('cpf')} className="glass-input" placeholder="000.000.000-00" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">RG</label>
                <input {...register('rg')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">Órgão Expedidor</label>
                <input {...register('orgao_expedidor')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">Data de Nascimento</label>
                <input type="date" {...register('data_nascimento')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">Estado Civil</label>
                <select {...register('estado_civil')} className="glass-input">
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="União Estável">União Estável</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="glass-label">Grau de Instrução</label>
                <select {...register('grau_instrucao')} className="glass-input">
                  <option value="1º Grau">1º Grau</option>
                  <option value="2º Grau">2º Grau</option>
                  <option value="Superior">Superior</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </section>

          {/* ENDEREÇO */}
          <section>
            <SectionTitle icon={MapPin} title="Endereço Residencial" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="glass-label">Endereço</label>
                <input {...register('endereco')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">Bairro</label>
                <input {...register('bairro')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">Cidade</label>
                <input {...register('cidade')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">UF</label>
                <input {...register('uf')} className="glass-input" maxLength={2} />
              </div>
              <div className="space-y-2">
                <label className="glass-label">CEP</label>
                <input {...register('cep')} className="glass-input" placeholder="00000-000" />
              </div>
            </div>
          </section>

          {/* SITUAÇÃO RESIDENCIAL */}
          <section>
            <SectionTitle icon={ShieldAlert} title="Situação Residencial" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="glass-label">Tipo</label>
                <select {...register('tipo_residencia')} className="glass-input">
                  <option value="Própria">Própria</option>
                  <option value="Alugada">Alugada</option>
                  <option value="Com os pais">Com os pais</option>
                  <option value="Financiada">Financiada</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              {tipoResidencia === 'Alugada' && (
                <div className="space-y-2 animate-fade-in">
                  <label className="glass-label">Valor Aluguel</label>
                  <input {...register('valor_aluguel')} className="glass-input" placeholder="R$ 0,00" />
                </div>
              )}
              <div className="space-y-2">
                <label className="glass-label">Tempo Residência</label>
                <input {...register('tempo_residencia')} className="glass-input" />
              </div>
              <div className="space-y-2">
                <label className="glass-label">Nº Dependentes</label>
                <input type="number" {...register('numero_dependentes')} className="glass-input" />
              </div>
            </div>
          </section>

          {/* UPLOAD DOCUMENTOS */}
          <section>
            <SectionTitle icon={ShieldAlert} title="Documentação" />
            <DocumentUploader />
          </section>

          <div className="pt-8 border-t border-white/10 flex gap-4">
            <button type="submit" className="glass-button flex-1 flex items-center justify-center gap-2">
              <Save size={20} /> Finalizar Cadastro
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
