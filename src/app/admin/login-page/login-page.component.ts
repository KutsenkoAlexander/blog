import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(public auth: AuthService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.activateRoute.queryParams.subscribe((params: Params) => {
      if (params['logined']) {
        this.message = 'Please, enter login and password.';
      } else if (params['authFail']) {
        this.message = 'Session was expired. Login again.';
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, error => {
      this.submitted = false;
    });
  }
}
