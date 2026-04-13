import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { startWith, Observable} from 'rxjs';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./main.scss']
})

export class UserComponent implements OnInit {

    users: User[] = [];
    searchTerm: string = '';
    filteredUser$!: Observable<User[]>;
    constructor(private userService: UserService) {}

    ngOnInit(): void {
            this.filteredUser$ = this.filterfcvar.valueChanges.pipe(
                startWith(''),
                map(text => this.search(text || ''))
            );
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

    onSearch(text: string): User[] {
        const term = text.toLowerCase();

        return this.users.filter(user =>
            user.pseudo.toLowerCase().includes(term) ||
            user.roleId().includes(term)
        );
    }
}  
