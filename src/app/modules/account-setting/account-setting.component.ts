import {Component, OnInit} from '@angular/core';
import {AppService} from '@core/services/app.service';
import {AuthService} from '@core/services/auth.service';
import {UserProfile} from '@core/@data/UserData';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from '@shared/services/toastr.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ErrorHandlingService} from '@shared/services/error-handling.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit {
  loading = true;
  userProfile: UserProfile | null = null;
  searchText = '';
  formLoading = false;
  ResetPasswordForm!: FormGroup;
  hide = true;
  isResetPassword = false;

  constructor(
    private appService: AppService,
    private toasterService: ToasterService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private errorHandler: ErrorHandlingService
  ) {
  }

  ngOnInit(): void {
    this.ResetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.ResetPasswordForm.controls.password.valueChanges.subscribe((res) => {
      this.ResetPasswordForm.markAllAsTouched();
    });
    this.authService.AdsProfile().subscribe((res) => {
      console.log(res);
      this.userProfile = res?.data as UserProfile;
      this.loading = false;
    });
  }

  onSubmit(): void {
    this.formLoading = true;
    console.log();
    const password = this.ResetPasswordForm.controls.password.value;
    this.authService.EditPassword(password).subscribe((res) => {
      console.log(res);
      this.formLoading = false;
      this.toasterService.showSuccess('تم تغيير كلمة المرور بنجاح');
      this.isResetPassword = false;
      this.ResetPasswordForm.reset();
      this.ResetPasswordForm.markAsUntouched();
    }, (error) => {
      console.log(error);
      this.errorHandler.HandelAuthErrors(error.error.errors, error.status, error.message);
    });
  }

  ResetPasswordToggle(): void {
    this.isResetPassword = !this.isResetPassword;
    this.ResetPasswordForm.reset();
    this.ResetPasswordForm.markAsUntouched();
  }
}
