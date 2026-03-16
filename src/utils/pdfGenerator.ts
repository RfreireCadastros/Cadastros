import { jsPDF } from 'jspdf';

export const generateClientPDF = (clientData: any) => {
  const doc = new jsPDF();
  const margin = 20;
  let y = 30;

  // Header
  doc.setFontSize(22);
  doc.setTextColor(14, 165, 233); // Primary color
  doc.text('Ficha de Cadastro Imobiliário', margin, y);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // Slate color
  doc.text(`Código: ${clientData.codigo || 'N/A'}`, 150, y);
  
  y += 15;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, 190, y);
  
  y += 15;
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('DADOS PRINCIPAIS', margin, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nome/Razão Social: ${clientData.nome}`, margin, y);
  y += 7;
  doc.text(`CPF/CNPJ: ${clientData.cpf_cnpj || 'N/A'}`, margin, y);
  y += 7;
  doc.text(`Tipo: ${clientData.tipo}`, margin, y);
  y += 7;
  doc.text(`Email: ${clientData.email || 'N/A'}`, margin, y);
  y += 7;
  doc.text(`Telefone: ${clientData.telefone || 'N/A'}`, margin, y);

  if (clientData.documentos && clientData.documentos.length > 0) {
    y += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('DOCUMENTOS ENVIADOS', margin, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    clientData.documentos.forEach((d: any, i: number) => {
      doc.text(`${i + 1}. ${d.legenda} (${d.file_name})`, margin, y);
      y += 7;
    });
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Documento gerado automaticamente pelo sistema Rfreire Cadastros', margin, 280);

  doc.save(`cadastro_${clientData.codigo || 'novo'}.pdf`);
};
