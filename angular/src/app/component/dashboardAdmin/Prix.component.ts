import { OnInit, Component } from '@angular/core';
import { AdminDashboardService } from '../../services/adminDashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../pages/admin/prix.component.html',
  styleUrls: ['../../../main.scss'],
})
export class PrixComponent implements OnInit {
  remboursement: number = 0;
  achat: number = 0;
  prixTotal: number = 0;
  date: Date = new Date();

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.adminDashboardService.getAllPrix().subscribe((data: any) => {
      this.remboursement = data.remboursement;
      this.achat = data.achat;
      this.prixTotal = this.remboursement + this.achat;
      this.date = data.date;
    });
  }
}