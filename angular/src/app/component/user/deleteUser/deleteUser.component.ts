import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User} from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteUserComponent } from './confirmationUserDeleteProduit.component';

@Component({
  selector: 'app--delete-user',
  templateUrl: './deleteUser.component.html',
  styleUrls: ['./main.scss']
})
export class DeleteUserComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => {
          console.log('User supprimé');
          this.loadUsers();
        });
      }
    });
  }
}