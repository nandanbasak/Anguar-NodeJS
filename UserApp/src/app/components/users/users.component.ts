import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] | null = null;
  searchText = '';

  get filteredUsers() {
    if (!this.searchText) return this.users;
    return this.users?.filter((user: User) =>
      user.name?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }
}
