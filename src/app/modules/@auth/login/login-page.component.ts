import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from '@shared/services/toastr.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {LoginDataObject} from '@core/@data/UserData';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loading = false;
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private toasterService: ToasterService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loginForm.controls.name.valueChanges.subscribe((res) => {
      this.loginForm.get('name')?.setValue(res?.trim(), {emitEvent: false});
    });
  }

  onSubmit(): void {
    this.loading = true;
    const payload: LoginDataObject = {
      name: this.loginForm.controls.name.value,
      password: this.loginForm.controls.password.value
    };
    console.log(payload);
    this.authService.Login(payload).subscribe(
      (res) => {
        console.log('Login ', res);
        location.reload();
      },
      (err) => {
        console.log(err);
        this.toasterService.showFail(err.error.error);
        this.loading = false;
      }
    );
  }
}
