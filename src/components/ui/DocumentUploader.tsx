import React, { useState } from 'react';
import { FileUp, Trash2, Plus, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Document {
  id: string;
  file: File | null;
  legend: string;
}

export const DocumentUploader: React.FC = () => {
  const [docs, setDocs] = useState<Document[]>([{ id: crypto.randomUUID(), file: null, legend: '' }]);

  const addDoc = () => {
    setDocs([...docs, { id: crypto.randomUUID(), file: null, legend: '' }]);
  };

  const removeDoc = (id: string) => {
    setDocs(docs.filter(d => d.id !== id));
  };

  const updateDoc = (id: string, updates: Partial<Document>) => {
    setDocs(docs.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const onFileChange = (id: string, file: File | null) => {
    if (file) {
      updateDoc(id, { file });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Anexos e Certidões</h3>
          <p className="text-slate-500 text-sm font-medium">Arquivos suportados: PDF, JPG, PNG (máx 10MB)</p>
        </div>
        <button 
          type="button"
          onClick={addDoc}
          className="flex items-center gap-2 text-sm bg-primary/20 text-primary border border-primary/20 px-5 py-2.5 rounded-2xl hover:bg-primary/30 transition-all font-bold"
        >
          <Plus size={20} /> Adicionar Campo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {docs.map((doc, index) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 bg-white/5 rounded-3xl border border-white/5 relative group hover:border-white/10 transition-all flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 border border-white/5">
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Documento</span>
                </div>
                {docs.length > 1 && (
                  <button type="button" onClick={() => removeDoc(doc.id)} className="text-slate-600 hover:text-accent p-2 hover:bg-white/5 rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="relative">
                {!doc.file ? (
                  <label className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-white/5 rounded-2xl hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all group/upload">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover/upload:scale-110 group-hover/upload:bg-primary/10 transition-all">
                      <FileUp className="text-slate-500 group-hover/upload:text-primary" size={32} />
                    </div>
                    <span className="text-sm font-bold text-slate-400 group-hover/upload:text-slate-200">Clique ou arraste o arquivo</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,image/*" 
                      onChange={(e) => onFileChange(doc.id, e.target.files?.[0] || null)}
                    />
                  </label>
                ) : (
                  <div className="flex items-center gap-4 p-5 bg-primary/10 border border-primary/20 rounded-2xl relative overflow-hidden group/file">
                    <div className="absolute top-0 right-0 p-2">
                      <CheckCircle2 size={16} className="text-primary" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                      {doc.file.type === 'application/pdf' ? <FileText size={24} /> : <ImageIcon size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{doc.file.name}</p>
                      <p className="text-[10px] font-bold text-slate-500">{(doc.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button type="button" onClick={() => updateDoc(doc.id, { file: null })} className="text-slate-500 hover:text-accent p-2 hover:bg-white/5 rounded-xl">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Descrição do Anexo</p>
                <input 
                  type="text" 
                  placeholder="Ex: Identidade Frente, CPF, Comprovante de Renda..."
                  className="glass-input !py-3.5 text-sm"
                  value={doc.legend}
                  onChange={(e) => updateDoc(doc.id, { legend: e.target.value })}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
