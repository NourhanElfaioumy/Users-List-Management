import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit(): void {

    this.initialLoginForm()
  }

  form!: FormGroup;
  error: string = '';
  userType: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {}

  initialLoginForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    debugger
    if (this.form && this.form.valid) {

      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      if (username !== null && password !== null) {
        this.http.get < any > ('http://localhost:3000/usersCredentials', {
            params: {
              username,
              password
            }
          })
          .subscribe(
            (user) => {
              if (user.length === 1) {
                // Determine if the user is an admin based on your criteria
                const isAdmin = user[0].isAdmin === 'true';

                if (isAdmin) {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.router.navigate(['/users']);
                  localStorage.setItem('isAdmin', 'true');

                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.router.navigate(['/users']);
                  localStorage.setItem('isAdmin', 'false');

                }
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Fail to Login',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            },
            (error) => {
              console.error(error);
              this.error = 'An error occurred during login';
            }
          );
      }
    }
  }


}
