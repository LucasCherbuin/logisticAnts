import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteUserComponent } from './confirmationDeleteUser.component';

@Component({
  selector: 'app-gestion-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ConfirmationDeleteUserComponent],
  templateUrl: '../../pages/secretaire/gestion/gestionUser.component.html',
  styleUrls: ['../../../main.scss']
})
export class GestionUserComponent implements OnInit {
  user: (Omit<User, 'role'> & { role: 'LOGISTICIEN' | 'SECRETAIRE' }) = {
    id: 0,
    pseudo: '',
    email: '',
    password: '',
    role: 'LOGISTICIEN',
  };
  users: User[] = [];
  filterfcvar = new FormControl('');
  filteredUser$!: Observable<User[]>;
  currentUser: User | null = null;
  currentIndex = -1;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.filteredUser$ = this.filterfcvar.valueChanges.pipe(
      startWith(''),
      switchMap(value => value
        ? this.userService.searchUsers(value)
        : this.userService.getUsers()
      ),
      map(users => users.filter(
        (user) => ['LOGISTICIEN', 'SECRETAIRE'].includes(
          (typeof user.role === 'string' ? user.role : user.role?.label)?.toUpperCase()
        )
      ))
    );
  }

  getRoleLabel(user: User): string {
    const label = typeof user.role === 'string' ? user.role : user.role?.label ?? '';
    return label.toLowerCase();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data.filter(
          (user) => ['LOGISTICIEN', 'SECRETAIRE'].includes(
            (typeof user.role === 'string' ? user.role : user.role?.label)?.toUpperCase()
          )
        );
      },
      error: (error: any) => { console.error('Error fetching users:', error); }
    });
  }

  setCurrentAntrag(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteUserComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => {
          console.log('User supprimé');
          this.loadUsers();
        });
      }
    });
  }
}