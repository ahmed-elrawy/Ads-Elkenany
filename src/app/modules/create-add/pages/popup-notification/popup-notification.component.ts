import {Component, OnInit} from '@angular/core';
import {AppService} from '@core/services/app.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ToasterService} from '@shared/services/toastr.service';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';

interface ImageInterface {
  name?: string;
  file: File;
  fileResult: any;
}

@Component({
  selector: 'app-popup-notification',
  templateUrl: './popup-notification.component.html',
  styleUrls: ['./popup-notification.component.scss']
})
export class PopupNotificationComponent implements OnInit {
  type = '';
  company = 0;
  loading = false;
  createAdForm!: FormGroup;
  AllFiles: ImageInterface[] = [];
  isWeb = true; //  1 = web - 0 mobile
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  time = '';


  // new
  AdForm!: FormGroup;


  nowAdForm!: FormGroup;
  dailyAdForm!: FormGroup;
  customAdForm!: FormGroup;
  scheduleAdForm!: FormGroup;

  // new

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
    this.route.queryParams.pipe(
      take(1),
    ).subscribe((params: Params) => {
      console.log(params);
      this.company = params?.company;
      this.type = params?.type;
    });

    this.AdForm = this.fb.group({
      schedule: ['',[]],
      secondaryForm: this.fb.group({})
    })

    this.nowAdForm = this.fb.group({
      address: ['',[]],
      desc: ['',[]]
    })

    

    this.createAdForm = this.fb.group({
      title: ['', []],
      desc: ['', []],
      link: ['', []],
      send_date: ['', []],
      isWeb: ['', []],
      company_id: [this.company],
      end_date: [''],
    });

    this.addForm()
  }

  get secondaryForm() {
    return this.AdForm.controls["secondaryForm"]
  }

  addForm():void{
  
    this.AdForm.controls["secondaryForm"] = new FormGroup(this.createAdForm.controls)
    console.log(this.AdForm.controls)

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
    console.log(this.createAdForm.value);
    const formData: FormData = new FormData();
    if (this.AllFiles.length > 0) {
      formData.append('image', this.AllFiles[0].file, this.AllFiles[0].name);
    }
    formData.append('title', this.createAdForm.controls.title.value);
    formData.append('link', this.createAdForm.controls.link.value);
    formData.append('desc', this.createAdForm.controls.desc.value);
    let newDate = this.createAdForm.controls.end_date.value;
    newDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    formData.append('end_date', newDate);
    formData.append('company_id', this.company + '');
    formData.append('type', this.type);
    if (this.type === 'notification') {
      formData.append('app', this.createAdForm.controls.isWeb?.value === 1 ? 'web' : 'mop');
      formData.append('time', this.createAdForm.controls.send_date?.value);
    }
    formData.forEach((item, index) => {
      console.log(index + '   ' + item);
    });
    this.loading = true;
    this.appService.CreateAd(formData).subscribe((res) => {
      console.log(res);
      this.loading = false;
      this.toasterService.showSuccess('تم انشاء الاعلان بنجاح');
      this.router.navigate(['/my-account'], {
        queryParams: {company_id: this.company, is_outside: true}
      }).then();
    }, (error) => {
      console.log(error);
      this.loading = false;
      this.toasterService.showFail(error.error.error);
      // this.errorHandler.HandelAuthErrors(error.error.errors, error.status, error.message);
    });
  }
}
