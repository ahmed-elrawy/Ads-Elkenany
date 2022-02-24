import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from '@shared/services/toastr.service';
import {Router} from '@angular/router';
import {ErrorHandlingService} from '@shared/services/error-handling.service';
import {LoginDataObject} from '@core/@data/UserData';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {
  loading = false;
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private toasterService: ToasterService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private errorHandler: ErrorHandlingService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loginForm.controls.email.valueChanges.subscribe((res) => {
      this.loginForm.get('email')?.setValue(res?.trim(), {emitEvent: false});
    });
  }

  onSubmit(): void {
    this.loading = true;
    const payload: LoginDataObject = {
      name: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
    // this.teacherAuthService.Login(payload).subscribe(
    //   (res) => {
    //     this.location.back();
    //   },
    //   (err) => {
    //     this.errorHandler.HandelAuthErrors(err.error.errors, err.status, err.message);
    //     this.loading = false;
    //   }
    // );
  }
}
