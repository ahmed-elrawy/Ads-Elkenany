import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '@app/@core/services/app.service';
import { ToasterService } from '@app/@shared/services/toastr.service';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import { take } from 'rxjs/operators';



interface APiData{
  type:string;
  data: {
    title:string;
    desc:string;
    image:string;
    time?:string
    date?:string;
    day?:string;
  }[]
}


interface Schedule {
  value: string;
  viewValue: string;
}

interface ImageInterface {
  name?: string;
  file: File;
  fileResult: any;
  id:number
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  // new
  to:string =''
  from:string = ''

  AdForm!: FormGroup;
  AdsForm!: FormGroup;
  nowAdForm!: FormGroup;
  dailyAdForm!: FormGroup;
  customAdForm!: FormGroup;
  scheduleAdForm!: FormGroup;
  AllFiles: ImageInterface[] = [];


  company = 0;
  type = '';
  loading = false;
  
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


  schedules: Schedule[] = [
    {value: 'now', viewValue: 'الان'},
    {value: 'schedule', viewValue: 'مجدول'},
    {value: 'custom', viewValue: 'مخصص'},
    {value: 'daily', viewValue: 'يومي'},
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
      date: ['',[]],
      days: this.fb.array([]),
      time: ['',[]],
      from: ['',[]],
      to: ['',[]],
      ads: this.fb.array([])

    })
    this.customAdForm = this.fb.group({
      date: ['',[]],
      days: this.fb.array([]),
      time: ['',[]],
      from: ['',[]],
      to: ['',[]],
      ads: this.fb.array([])
    })

    this.nowAdForm = this.fb.group({
      title: ['',[]],
      desc: ['',[]],
      image:['',[]]
    })

    this.scheduleAdForm = this.fb.group({
      date: ['',[]],
      time: ['',[]],
      title: ['',[]],
      desc: ['',[]],
      image:['',[]]
    })

    // this.customAdForm.get('from')?.valueChanges.subscribe(val => {
    //   this.from=this.datePipe.transform(val, 'yyyy-MM-dd') ||"";
    // });
    // this.customAdForm.get('to')?.valueChanges.subscribe(val => {
    //   this.to= this.datePipe.transform(val, 'yyyy-MM-dd') ||""
    // });

  }
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
          this.AdForm.controls["secondaryForm"] = new FormGroup(this.nowAdForm.controls)
          break;
  }
    // console.log(this.AdForm.controls['schedule'].touched)

  }


  createCustomAds(ads:any){
    this.customAds.clear()
    for(let i=0; i < ads.length ; i++) {
      // this.ads.push(this.AdsForm);
      this.customAds.push(
        this.fb.group({
          date: [this.datePipe.transform( ads[i].date, 'yyyy-MM-dd'), []],
          day: [ads[i].day, []],
          title: ['', []],
          desc: ['', []],
          file: new FormControl('', [Validators.required]),
          fileSource: new FormControl('', [Validators.required])
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
          title: ['', []],
          desc: ['', []],
          file: new FormControl('', [Validators.required]),
          fileSource: new FormControl('', [Validators.required])
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
console.log(selectedDays)
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
        this.toasterService.loading('جارى رفع الملفات...');
          // this.AllFiles = [];
          const checkRoleExistence = (index:number) => this.AllFiles.some( ({id}) => id == index)

          if(checkRoleExistence(index) ==false) {
            console.log(false);
            this.AllFiles.push({fileResult: reader.result, file, name: file.name, id:index});

            if(this.select == "now" || "schedule" && this.secondaryForm.controls['image']) {
               this.secondaryForm.controls['image'].patchValue( reader.result) 
            } else if(this.select == "custom") {
               this.batchesCustomAds(index).controls['fileSource'].patchValue( reader.result)
            } else {
              this.batchesDailyAds(index).controls['fileSource'].patchValue( reader.result)

            }
          
          }else {
            console.log(true);
          }
        };
        reader.onloadend = (ee) => {
           this.toasterService.stopLoading();
        };
      }
    }
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
    let data: APiData ={type:'',data:[]}
    let user = {
      company_id: this.company,
      type: this.type
    }
    console.log(this.secondaryForm.controls)
    data.type= this.select


    if(this.select== "now" ) {
      data.data.push({
  
        title:this.secondaryForm.controls.title.value,
        desc:this.secondaryForm.controls.desc.value,
        image:this.secondaryForm.controls.image.value,
  
      })
    } else if (this.select== "schedule") {
      data.data.push({
  
        title:this.secondaryForm.controls.title.value,
        desc:this.secondaryForm.controls.desc.value,
        image:this.secondaryForm.controls.image.value,
        date: this.secondaryForm.controls.date.value ,
        time:this.secondaryForm.controls.time.value,

      })
    } else if (this.select== "custom" ||this.select== "daily" ) {
      let ads =[]
      ads = this.secondaryForm.controls.ads as any
      ads.controls.forEach((i:any) => {
        // console.log(i.controls)
        data.data.push({
    
          title:i.controls.title.value,
          desc:i.controls.desc.value,
          image:i.controls.fileSource.value,
          date: i.controls.date.value ,
          day: i.controls.day.value,
          time:this.secondaryForm.controls.time.value
     
        })
      })

    }

    this.loading = true;
    console.log(data)


    // for(let i=0; i< this.customAdstest.controls.length ;i++) {
    //   data.push({
    //     type:"dd",
    //     title:this.customAdstest.controls[i].controls.title.value,
    //     desc:this.customAdstest.controls[i].controls.desc.value,
    //     image:"dd",
    //     time:this.customAdstest.controls[i].controls.date.value,
    //     date:this.customAdstest.controls[i].controls.date.value,
    //     day:this.customAdstest.controls[i].controls.day.value
    //   })
    //   console.log(this.customAdstest.controls[i].controls)
    //   console.log(data)
    // }

    // console.log(this.schedule.value)
    // console.log(this.secondaryForm.controls)
    // console.log(this.secondaryForm.controls.time.value)
    // console.log(this.secondaryForm.controls.ads.value)

    // const formData: FormData = new FormData();

    // formData.append('type', this.AdForm.controls['schedule'].value);

    // let data:{
    //   title: string,
    //   desc: string ,
    //   image?: ImageInterface
    //   time: string,
    //   data:{[key: string]:string}
    // } = {
    //   title: '',
    //   desc:'',
    //   time: this.secondaryForm.controls.time.value,
    //   data: this.secondaryForm.controls.ads.value
    // }


    // console.log(data)
  }

}