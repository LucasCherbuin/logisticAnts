import { OnInit } from "@angular/core";
import { FournisseurService } from "../services/fournisseur.service";
import { Fournisseur } from "../models/fournisseur.model";

export class FournisseurComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];

  constructor(private fournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (data: Fournisseur[]) => {
        this.fournisseurs = data;
      },
      (error: any) => {
        console.error("Error fetching fournisseurs:", error);
      },
    );
  }
}
