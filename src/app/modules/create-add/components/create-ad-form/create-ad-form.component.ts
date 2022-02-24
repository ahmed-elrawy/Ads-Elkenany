import {Component, OnInit} from '@angular/core';
import {AppService} from '@core/services/app.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ToasterService} from '@shared/services/toastr.service';

interface ImageInterface {
  name?: string;
  file: File;
  fileResult: any;
}

@Component({
  selector: 'app-popup-notification',
  templateUrl: './create-ad-form.component.html',
  styleUrls: ['./create-ad-form.component.scss']
})
export class CreateAdFormComponent implements OnInit {
  type = '';
  company = 0;
  loading = false;
  createAdForm!: FormGroup;
  AllFiles: ImageInterface[] = [];
  AllParams: object = {};

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    public datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      console.log(params);
      this.company = params?.company;
      this.type = params?.type;
      this.AllParams = params;
      console.log(this.AllParams);
      const formData: FormData = new FormData();
      for (const [key, value] of Object.entries(this.AllParams)) {
        formData.append(key, value);
      }
      formData.forEach((item, index) => {
        console.log(index + '   ' + item);
      });
    });
    this.createAdForm = this.fb.group({
      title: ['', []],
      link: ['', []],
      company_id: [this.company],
      end_date: [''],
    });
  }

  handleFileInput(event: any): void {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      for (const file of fileList) {
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.toasterService.loading('جارى رفع الملفات...');
          this.AllFiles = [];
          this.AllFiles.push({fileResult: reader.result, file, name: file.name});
        };
        reader.onloadend = (ee) => {
          this.toasterService.stopLoading();
        };
      }
    }
  }

  removeImage(name: string | undefined): void {
    this.AllFiles = this.AllFiles.filter((image) => {
      return image.name !== name;
    });
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(this.AllParams)) {
      console.log('key ', key, '  - value ', value);
      formData.append(key, value);
    }
    if (this.AllFiles.length > 0) {
      formData.append('image', this.AllFiles[0].file, this.AllFiles[0].name);
    }
    console.log('this.AllFiles  ', this.AllFiles);
    console.log(this.createAdForm.value);
    formData.append('title', this.createAdForm.controls.title.value);
    formData.append('link', this.createAdForm.controls.link.value);
    let newDate = this.createAdForm.controls.end_date.value;
    newDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    formData.append('end_date', newDate);
    formData.forEach((item, index) => {
      console.log(index + '   ' + item);
    });
    this.loading = true;
    this.appService.CreateAd(formData).subscribe((res) => {
      console.log(res);
      this.loading = false;
      this.toasterService.showSuccess('تم إنشاء الإعلان بنجاح');
      this.router.navigate(['/my-account'], {
        queryParams: {company_id: this.company, is_outside: true}
      }).then();
    }, (error) => {
      console.log(error);
      this.loading = false;
      this.toasterService.showFail(error.error.error);
    });
  }
}
