import React, { useState } from 'react';
import { FileUp, Trash2, Plus, FileText, Image as ImageIcon } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Upload de Documentos (PDF ou Imagem)</h3>
        <button 
          type="button"
          onClick={addDoc}
          className="flex items-center gap-2 text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all"
        >
          <Plus size={16} /> Adicionar outro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc, index) => (
          <div key={doc.id} className="p-4 bg-white/5 rounded-xl border border-white/10 relative animate-fade-in flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Documento {index + 1}</span>
              {docs.length > 1 && (
                <button type="button" onClick={() => removeDoc(doc.id)} className="text-slate-500 hover:text-red-400">
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {!doc.file ? (
              <label className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
                <FileUp className="text-slate-400 mb-2" size={32} />
                <span className="text-sm text-slate-400">Clique para selecionar</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,image/*" 
                  onChange={(e) => onFileChange(doc.id, e.target.files?.[0] || null)}
                />
              </label>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                {doc.file.type === 'application/pdf' ? <FileText className="text-primary" /> : <ImageIcon className="text-primary" />}
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium truncate">{doc.file.name}</p>
                  <p className="text-xs text-slate-400">{(doc.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button type="button" onClick={() => updateDoc(doc.id, { file: null })} className="text-red-400 hover:bg-red-400/10 p-1 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            <input 
              type="text" 
              placeholder="Legenda do documento (Ex: RG, CNH, Comprovante...)"
              className="glass-input text-sm py-2"
              value={doc.legend}
              onChange={(e) => updateDoc(doc.id, { legend: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
