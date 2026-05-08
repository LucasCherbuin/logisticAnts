import {OnInit, Component} from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-dashboard-produits',
  templateUrl: './dashboard-produits.component.html'
})
export class DashboardProduitsComponent implements OnInit {

  produits: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe(data => {
      this.produits = data.produits;
    });
  }
}