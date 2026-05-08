import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommandeService } from "../services/commande.service";
import { Commande } from "../models/commande.model";

@Component({
  selector: "app-commande",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./commande.component.html",
  styleUrls: ["./commande.component.scss"],
})
export class CommandeComponent implements OnInit {
  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe({
      next: (data: Commande[]) => {
        this.commandes = data;
      },
      error: (error: any) => {
        console.error("Error fetching commandes:", error);
      },
    });
  }
}
