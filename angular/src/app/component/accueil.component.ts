import { inject, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/register.service';

@Component({
    selector: 'app-accueil',
    templateUrl: '../pages/accueil.component.html',
    styleUrls: ['../../main.scss'],
    standalone: true,
    imports: [CommonModule]  
})
export class AccueilComponent  {

    public connectedUser = inject(RegisterService);
}