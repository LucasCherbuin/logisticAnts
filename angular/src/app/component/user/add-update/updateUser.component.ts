import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./main.scss']
})
export class UpdateUserComponent implements OnInit {

  user: User = {
    id: 0, 
    pseudo: '',
    email: '',
    password: '',
    roleId: 0, 
  };

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
  }

  onSubmit(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response) => {
        console.log('User mis à jour', response);
      },
      error: (error) => {
        console.error('Erreur update', error);
      }
    });
  }
}