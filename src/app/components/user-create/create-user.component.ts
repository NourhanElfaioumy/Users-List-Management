import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as alertify from 'alertifyjs'
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetUersById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.usersForm.setValue({
          id: this.editdata.id, name: this.editdata.name, email: this.editdata.email,
          phone: this.editdata.phone, status: this.editdata.status
        });
      });
    }
  }

  usersForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    status: this.builder.control('', Validators.required),
  });

  SaveUsers() {
    if (this.usersForm.valid) {
      const Editid = this.usersForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateUsers(Editid, this.usersForm.getRawValue()).subscribe(response => {
          this.closepopup();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
        });
      } else {
        this.api.CreateUsers(this.usersForm.value).subscribe(response => {
          this.closepopup();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Saved successfully',
            showConfirmButton: false,
            timer: 1500
          })
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}
