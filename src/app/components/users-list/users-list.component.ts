import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  Users
} from '../../models/usersmodel';
import {
  CreateUserComponent
} from '../user-create/create-user.component';
import {
  UsersService
} from '../../services/users.service';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import Swal from 'sweetalert2';
import {
  TranslateService
} from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: UsersService, private translate: TranslateService, private router: Router) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  usersdata!: Users[];
  datasource: any;
  displayColums: string[] = ["Id", "Name", "Email", "Phone", "Status", "Action"];
  showItems: boolean = false;
  isAdminValue = localStorage.getItem('isAdmin');


  ngOnInit(): void {
    this.LoadUsers();
    if (this.isAdminValue === 'true') {
      this.showItems = true;
    } else {
      this.showItems = false;
    }

  }

  // Open Dialog Pop-up which it's code exist in CreateUserComponent
  Openpopup(id: any) {
    const _popup = this.dialog.open(CreateUserComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadUsers();
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  // Get All Existing Users
  LoadUsers() {
    this.api.GetAllUsers().subscribe(response => {
      this.usersdata = response;
      this.datasource = new MatTableDataSource < Users > (this.usersdata);
      this.datasource.paginator = this._paginator;
      this.datasource.sort = this._sort;
    });
  }

  // Edit Selected User from table & Json file
  EditUser(id: any) {
    this.Openpopup(id);
  }

  // Remove User from table & Json file

  RemoveUser(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.RemoveUsersById(id).subscribe(() => {
          this.LoadUsers();
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          )
        });
      }
    })
  }

  //Filter Data in the table

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  //LogOut

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('isAdmin');
  }
}
