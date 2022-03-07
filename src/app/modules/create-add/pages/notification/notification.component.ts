import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '@app/@core/services/app.service';
import { ToasterService } from '@app/@shared/services/toastr.service';
import { NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import { take } from 'rxjs/operators';



interface APiData{
  type:string;
  isWeb:boolean

  data: {
    title:string;
    desc:string;
    file:string;
    time?:string
    date?:string;
    day?:string;
  }[]
}


interface Schedule {
  value: string;
  viewValue: string;
}

interface FileInterface {
  name?: string;
  file: File;
  fileResult: any;
  id:number
}
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  
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


  to:string =''
  from:string = ''
  type = '';
  company = 0;
  loading = false;
  createAdForm!: FormGroup;
  isWeb = true; //  1 = web - 0 mobile
  time = '';



  AdForm!: FormGroup;
  nowAdForm!: FormGroup;
  dailyAdForm!: FormGroup;
  customAdForm!: FormGroup;
  scheduleAdForm!: FormGroup;
  AllFiles: FileInterface[] = [];




  test!: FormGroup;


  schedules: Schedule[] = [
    {value: 'now', viewValue: 'الان'},
    {value: 'schedule', viewValue: 'مجدول'},
    {value: 'custom', viewValue: 'مخصص'},
    {value: 'daily', viewValue: 'يومي'},
    // {value: 'ss', viewValue: 'ss'}, //test
  ];
  select="now"
      // new
  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
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


    this.dailyAdForm = this.fb.group({
      days: this.fb.array([]),
      time: ['',[Validators.required]],
      from: ['',[Validators.required]],
      to: ['',[Validators.required]],
      isWeb: ['', []],
      ads: this.fb.array([])

    })
    this.customAdForm = this.fb.group({
      days: this.fb.array([]),
      time: ['',[Validators.required]],
      from: ['',[Validators.required]],
      to: ['',[Validators.required]],
      isWeb: ['', []],
      ads: this.fb.array([])
    })

    this.nowAdForm = this.fb.group({
      title: ['',[Validators.required]],
      desc: ['',[Validators.required]],
      file:['',],
      isWeb: ['', []],
    })

    this.scheduleAdForm = this.fb.group({
      date: ['',[Validators.required]],
      time: ['',[Validators.required]],
      title: ['',[Validators.required]],
      desc: ['',[Validators.required]],
      file:['',],
      isWeb: ['', []],
    })

///////////////////////////////////TEST
  this.test = this.fb.group({
    date: ['',[]],
    days: this.fb.array([]),
    ads: this.fb.array([]),
    time: ['',[]],
    from: ['',[]],
    to: ['',[]],
    isWeb: ['', []],
    title: ['',[Validators.required]],
    desc: ['',[Validators.required]],
    file:['',[Validators.required]],
  })
///////////////////////////////////TEST

  }

  getAdsTest() { return this.test.get('ads') as any;; }
  get testAds(){ return this.test.get('ads') as any; }

  createAdsTest(ads:any){
    this.testAds.clear()
    
    for(let i=0; i < ads.length ; i++) {

      this.testAds.push(
        this.fb.group({
          date: [this.datePipe.transform( ads[i].date, 'yyyy-MM-dd'), []],
          // to:  ['', []],
          day: [ads[i].day, []],
          title: ['',[Validators.required]],
          desc: ['', [Validators.required]],
          file: new FormControl('', [Validators.required]),
          fileSource: new FormControl('', [Validators.required])
        })
      )
    }

  }
///////////////////////////////////TEST


  get customAds(){return this.customAdForm.controls["ads"] as FormArray;}// conver name to custom ads
  get dailyAds(){return this.dailyAdForm.controls["ads"] as FormArray; }
  get customAdstest(){return this.customAdForm.controls["ads"] as any;}// conver name to custom ads

  get dailyAdsTest() { return this.dailyAdForm.get('ads') as any;; }


  get getsecondaryForm() {return this.AdForm.controls["secondaryForm"]}
  get schedule() {return this.AdForm.controls['schedule']}
  get secondaryForm() {return this.AdForm.controls['secondaryForm'] as FormGroup}
  set setsecondaryForm(form:FormGroup) {this.AdForm.controls["secondaryForm"] = new FormGroup(form.controls)}


  addForm(value: string):void{

    this.from = ''
    this.to = ''
    this.secondaryForm.reset()
    this.select= value
    this.AdForm.controls["secondaryForm"] =  new FormGroup({})
    this.AllFiles = [];

    switch (value) {

      case "now":
          this.AdForm.controls["secondaryForm"] = new FormGroup(this.nowAdForm.controls)
          break;
      case "schedule":
          this.AdForm.controls["secondaryForm"] = new FormGroup(this.scheduleAdForm.controls)
          break;
      case "custom":
          this.AdForm.controls["secondaryForm"] = new FormGroup(this.customAdForm.controls)
          for(let i = this.customAds.length-1; i >= 0; i--) {this.customAds.removeAt(i)} //reset formArray
          break;
      case "daily":
          this.AdForm.controls["secondaryForm"] = new FormGroup(this.dailyAdForm.controls)
          this.dailyAds.reset()
          for(let i = this.dailyAds.length-1; i >= 0; i--) {this.dailyAds.removeAt(i)}  //reset formArray
          break;
      default:
          this.AdForm.controls["secondaryForm"] = new FormGroup(this.test.controls)
          break;
  }
    // console.log(this.AdForm.controls['schedule'].touched)

  }


  createCustomAds(ads:any){
    this.customAds.clear()
    for(let i=0; i < ads.length ; i++) {
      this.customAds.push(
        this.fb.group({
          date: [this.datePipe.transform( ads[i].date, 'yyyy-MM-dd'), []],
          day: [ads[i].day, []],
          title: ['', [Validators.required]],
          desc: ['', [Validators.required]],
          file: new FormControl('', ),
          fileType: new FormControl('', ),
          fileSource: new FormControl('', )
        })
      )
    }

  }


  createAdsDaily(ads:any){
    this.dailyAds.clear()
    
    for(let i=0; i < ads.length ; i++) {

      // this.ads.push(this.AdsForm);
      this.dailyAds.push(
        this.fb.group({
          date: [this.datePipe.transform( ads[i].date, 'yyyy-MM-dd'), []],
          // to:  ['', []],
          day: [ads[i].day, []],
          title: ['',[Validators.required]],
          desc: ['', [Validators.required]],
          file: new FormControl('', ),
          fileType: new FormControl('', ),
          fileSource: new FormControl('', )
        })
      )
    }

  }



  fromTo(from?:any, to?:string) {

    this.to= (to!='0')?this.datePipe.transform(to, 'yyyy-MM-dd') as string:this.to
    this.from= (from!='0')?this.datePipe.transform(from, 'yyyy-MM-dd') as string:this.from


    let weekday = this.customAdForm.get('days')?.value


    let selectedDays: {date:string, day:string}[]=[]
    
    let from_to_days = this.getDaysArray(new Date(this.from),new Date(this.to))
    
    if(this.from && this.to && this.select=="custom") {

      from_to_days.forEach( (e:any, i:any) => {

        var d = new Date(e);

     

        
        // var dayName = weekday[d.getDay()];
        var dayName = this.weekday[d.getDay()]


        weekday.forEach((element:any, index:any) => {
          if(element == dayName) {
            // console.log(this.datePipe.transform(e, 'yyyy-MM-dd')) //2022-02-01
            // console.log(e)//Tue Feb 01 2022 02:00:00 GMT+0200 (Eastern European Standard Time)
            // console.log(element)//Tuesday
            selectedDays.push({"date":e, "day":element})

          }
        })

      })
      this.createCustomAds(selectedDays)


    }else if (this.from && this.to && this.select=="daily"){
      var date1 = new Date(this.from); 
      var date2 = new Date(this.to); 

      var Time = date2.getTime() - date1.getTime(); 
      var Days = Time / (1000 * 3600 * 24);

      from_to_days.forEach( (e:any, i:any) => {
        var d = new Date(e);
        var dayName = this.weekday[d.getDay()];
        selectedDays.push({"date":e, "day":dayName})
      })

      
      this.createAdsDaily(selectedDays)

    }
    // else if (this.from && this.to && this.select=="ss") {
    //   from_to_days.forEach( (e:any, i:any) => {
    //     var d = new Date(e);
    //     var dayName = this.weekday[d.getDay()];
    //     selectedDays.push({"date":e, "day":dayName})
    //   })
    //   this.createAdsTest(selectedDays)
    //   console.log(selectedDays)
    // }

  

  }

  // inputChanged(element: any) {
  //   console.log (element)
  // }

  getDaysArray(start:any, end:any) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
  };


 

  getCustomAds(): FormArray {return  this.customAdForm.get("ads") as FormArray}
  getDailyAds(): FormArray {return  this.dailyAdForm.get("ads") as FormArray}

  batchesCustomAds(ti:number): FormGroup {return this.getCustomAds().at(ti) as FormGroup}
  batchesDailyAds(ti:number): FormGroup {return this.getDailyAds().at(ti) as FormGroup}

  handleFileInput(event: any, index:number): void {
    const fileList = event.target.files;

    if (fileList.length > 0) {

      for (const file of fileList) {

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (e) => {
          console.log("loadin")
          this.toasterService.loading('جارى رفع الملفات...');
           this.AllFiles = [];
            this.AllFiles.push({fileResult: reader.result, file, name: file.name, id:index});
 

            let fileSource ={
              fileSource: reader.result,
              type: file.type 
            }
     
            if(this.select == "now" || "schedule" && this.secondaryForm.controls['file']) {
               this.secondaryForm.controls['file'].patchValue( reader.result) 
            } else if(this.select == "custom") {
              this.batchesCustomAds(index).controls['fileSource'].patchValue( reader.result)
              this.batchesCustomAds(index).controls['fileType'].patchValue( file.type)
              console.log(             this.customAdstest.controls                )
            } else if(this.select == "daily") {
              this.batchesDailyAds(index).controls['fileSource'].patchValue( reader.result)
              this.batchesDailyAds(index).controls['fileType'].patchValue( file.type)


            } 
          
    
        };
        reader.onloadend = (ee) => {
           this.toasterService.stopLoading();
        };
      }
    }
    console.log( this.dailyAdsTest.controls)
  }
  removeFile(index:  number, type:string ): void {
    if(type == 'daily'){
      this.batchesDailyAds(+index).controls['fileSource'].patchValue('')
    }  else if(type == 'custom') {
      this.batchesCustomAds(+index).controls['fileSource'].patchValue('')
    }
  }

  removeFile2(name: string | undefined): void {
    this.AllFiles = this.AllFiles.filter((image) => {
      return image.name !== name;
    });
    
  }


  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.customAdForm.get('days') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      this.fromTo(this.from,this.to)
    } else {
      let i: number = 0;
      this.fromTo(this.from,this.to)

      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          this.fromTo(this.from,this.to)
          return;
        }
        i++;
      });
    }
  }



  onSubmit(): void {
    const formData: FormData = new FormData();
    // console.log(this.AdForm.valid)
    console.log(this.secondaryForm.valid)

    // if (this.secondaryForm.valid) {
    //   alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    // }
    let data: APiData ={type:'',data:[],  isWeb:this.isWeb}
    let user = {
      company_id: this.company,
      type: this.type
    }
    data.type= this.select



    if(this.select== "now" ) {
      data.data.push({
        title:this.secondaryForm.controls.title.value,
        desc: this.secondaryForm.controls.desc.value,
        file: this.secondaryForm.controls.file.value,
      })
    } else if (this.select== "schedule") {
      data.data.push({
        title:this.secondaryForm.controls.title.value,
        desc: this.secondaryForm.controls.desc.value,
        file: this.secondaryForm.controls.file.value,
        date: this.secondaryForm.controls.date.value ,
        time: this.secondaryForm.controls.time.value
      })
     

    } else if (this.select== "custom" ||this.select== "daily" ) {
      let ads =[]
      ads = this.secondaryForm.controls.ads as any
      ads.controls.forEach((i:any) => {
        data.data.push({
          title:i.controls.title.value,
          desc: i.controls.desc.value,
          file: i.controls.fileSource.value,
          date: i.controls.date.value ,
          day:  i.controls.day.value,
          time:this.secondaryForm.controls.time.value
        })
      })
    }

    formData.append('type', this.select);
    formData.append('app', this.isWeb === true ? 'web' : 'mop');
     formData.append('data',JSON.stringify( data.data));
     console.log(Object.assign({}, data.data))
    formData.append('company_id',this.company + '');
    // formData.append('type', this.type);


    formData.forEach((item, index) => {
      console.log(index + '   ' + item);
    });
    this.loading = true;
    this.appService.CreateAdTest(formData).subscribe((res) => {
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



