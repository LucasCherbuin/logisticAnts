import { Injectable } from '@angular/core';
import { CommandeService } from './commande.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface FactureInfo {
  entreprise: string;
  adresse: string;
  ville: string;
  NPA: string;
}

export interface FactureItem {
  nom: string;
  quantite: number;
  prix: number;
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  constructor(private commandeService: CommandeService) {}

  generateBillPDF(commandeId: number, facture: FactureInfo, items: FactureItem[]): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Facture", 14, 15);

    doc.setFontSize(12);
    doc.text(`Entreprise : ${facture.entreprise}`, 14, 25);
    doc.text(`Adresse : ${facture.adresse}`, 14, 32);
    doc.text(`Ville : ${facture.ville}`, 14, 39);
    doc.text(`NPA : ${facture.NPA}`, 14, 46);

    const headers = [['Article', 'Quantité', 'Prix']];
    const data = items.map(item => [
      item.nom,
      item.quantite,
      item.prix + '.-'
    ]);

    autoTable(doc, { head: headers, body: data, startY: 55 });

    doc.save('facture.pdf');

    const pdfBytes = doc.output('arraybuffer');
    this.commandeService.updatedFacture(commandeId, pdfBytes).subscribe({
      error: err => console.error('Erreur upload facture', err)
    });
  }
}