import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  };

  return (
    <div className="container mx-auto px-4 py-10 relative z-10 max-w-4xl">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={20} /> Voltar para o início
      </button>

      <GlassCard>
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
          Cadastro Pessoa Jurídica
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="glass-label">Razão Social</label>
              <input {...register('razao_social')} className="glass-input" placeholder="Nome oficial da empresa" />
              {errors.razao_social && <span className="text-red-400 text-xs">{errors.razao_social.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="glass-label">Nome Fantasia</label>
              <input {...register('nome_fantasia')} className="glass-input" />
            </div>

            <div className="space-y-2">
              <label className="glass-label">CNPJ</label>
              <input {...register('cnpj')} className="glass-input" placeholder="00.000.000/0000-00" />
              {errors.cnpj && <span className="text-red-400 text-xs">{errors.cnpj.message}</span>}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Representantes Legais</h3>
              <button 
                type="button"
                onClick={() => append({ nome: '', cpf: '', cargo: '' })}
                className="flex items-center gap-2 text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all"
              >
                <Plus size={16} /> Adicionar
              </button>
            </div>

            {fields.map((field: any, index: number) => (
              <div key={field.id} className="p-4 bg-white/5 rounded-xl border border-white/10 relative animate-fade-in">
                {fields.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 ml-1">Nome</label>
                    <input {...register(`representantes.${index}.nome` as const)} className="glass-input text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 ml-1">CPF</label>
                    <input {...register(`representantes.${index}.cpf` as const)} className="glass-input text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 ml-1">Cargo</label>
                    <input {...register(`representantes.${index}.cargo` as const)} className="glass-input text-sm" />
                  </div>
                </div>
              </div>
            ))}
            {errors.representantes && <span className="text-red-400 text-xs">{errors.representantes.root?.message}</span>}
          </div>

          <div className="pt-8 border-t border-white/10">
            <button type="submit" className="glass-button w-full flex items-center justify-center gap-2">
              <Save size={20} /> Salvar Cadastro PJ
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
