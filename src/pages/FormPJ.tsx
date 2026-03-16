import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, Save, Plus, Trash2, Building2, Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const pjSchema = z.object({
  razao_social: z.string().min(3, 'Razão social obrigatória'),
  nome_fantasia: z.string().optional(),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  representantes: z.array(z.object({
    nome: z.string().min(3, 'Nome obrigatório'),
    cpf: z.string().min(11, 'CPF inválido'),
    cargo: z.string().min(2, 'Cargo obrigatório')
  })).min(1, 'Adicione pelo menos um representante')
});

type PJFormData = z.infer<typeof pjSchema>;

export const FormPJ: React.FC = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors } } = useForm<PJFormData>({
    resolver: zodResolver(pjSchema),
    defaultValues: {
      representantes: [{ nome: '', cpf: '', cargo: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'representantes'
  });

  const onSubmit = (data: PJFormData) => {
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
        className="max-w-4xl mx-auto space-y-8"
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
          <h1 className="text-4xl md:text-5xl font-black text-gradient">Registro Empresa</h1>
          <p className="text-slate-500 font-medium">Cadastre os dados da sua organização.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <GlassCard className="p-8 md:p-10">
            <SectionTitle icon={Building2} title="Dados da Empresa" />
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="glass-label">Razão Social</label>
                <input {...register('razao_social')} className="glass-input" placeholder="Razão Social como no CNPJ" />
                {errors.razao_social && <span className="text-red-400 text-xs ml-1">{errors.razao_social.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="glass-label">Nome Fantasia</label>
                  <input {...register('nome_fantasia')} className="glass-input" placeholder="Nome Comercial" />
                </div>

                <div className="space-y-2">
                  <label className="glass-label">CNPJ</label>
                  <input {...register('cnpj')} className="glass-input" placeholder="00.000.000/0000-00" />
                  {errors.cnpj && <span className="text-red-400 text-xs ml-1">{errors.cnpj.message}</span>}
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <SectionTitle icon={Users} title="Sócios e Representantes" />
              <button 
                type="button"
                onClick={() => append({ nome: '', cpf: '', cargo: '' })}
                className="flex items-center gap-2 text-sm bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/30 transition-all font-bold"
              >
                <Plus size={18} /> Adicionar
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field: any, index: number) => (
                <motion.div 
                  key={field.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-6 relative group border-white/5 hover:border-white/10 transition-all">
                    {fields.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-4 right-4 text-slate-500 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Nome Completo</label>
                        <input {...register(`representantes.${index}.nome` as const)} className="glass-input !py-3 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">CPF</label>
                        <input {...register(`representantes.${index}.cpf` as const)} className="glass-input !py-3 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Cargo</label>
                        <input {...register(`representantes.${index}.cargo` as const)} className="glass-input !py-3 text-sm" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
              {errors.representantes && <span className="text-red-400 text-sm ml-1">{errors.representantes.root?.message}</span>}
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-end gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="px-8 py-4 text-slate-400 font-bold hover:text-white transition-colors order-2 md:order-1"
            >
              Cancelar
            </button>
            <button type="submit" className="glass-button w-full md:w-auto order-1 md:order-2">
              <Save size={22} />
              Finalizar Cadastro PJ
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
