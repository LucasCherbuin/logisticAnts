import {OnInit, Component} from '@angular/core';
import { AdminDashboardService } from '../../services/adminDashboard.service';

@Component({
  selector: 'app-dashboard-global',
  templateUrl: './dashboard-global.component.html'
})
export class DashboardGlobalComponent implements OnInit {

  dashboard: any;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.adminDashboardService.getDashboard().subscribe(data => {
      this.dashboard = data;
    });
  }
}