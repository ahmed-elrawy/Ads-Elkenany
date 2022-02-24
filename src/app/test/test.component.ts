import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
      to?:string
      from?:string

      AdForm!: FormGroup;
      AdsForm!: FormGroup;
      nowAdForm!: FormGroup;
      dailyAdForm!: FormGroup;
      customAdForm!: FormGroup;
      scheduleAdForm!: FormGroup;
      AllFiles: ImageInterface[] = [];


      schedules: Schedule[] = [
        {value: '1', viewValue: 'الان'},
        {value: '2', viewValue: 'مجدول'},
        {value: '3', viewValue: 'مخصص'},
        {value: '4', viewValue: 'يومي'},
      ];
      select="1"
      // new
  
  
    constructor(
        private fb: FormBuilder,
        public datePipe: DatePipe,
      ) {
    }
    
    ngOnInit(): void {
  
  
      this.AdForm = this.fb.group({
        schedule: ['',[]],
        secondaryForm: this.fb.group({})
      })
  
      this.dailyAdForm = this.fb.group({
        title: ['',[]],
        desc: ['',[]]
      })
      this.customAdForm = this.fb.group({
        date: ['',[]],
        time: ['',[]],
        from: ['',[]],
        to: ['',[]],
        ads: this.fb.array([])
      })
      
      this.AdsForm = this.fb.group({
        title: ['', []],
        desc: ['', []]
      });
      this.nowAdForm = this.fb.group({
        title: ['',[]],
        desc: ['',[]]
      })


      this.scheduleAdForm = this.fb.group({
        date: ['',[]],
        time: ['',[]],
        title: ['',[]],
        desc: ['',[]]
      })


      this.customAdForm.get('from')?.valueChanges.subscribe(val => {
      
        this.from=this.datePipe.transform(val, 'yyyy-MM-dd') ||"";
      });

      this.customAdForm.get('to')?.valueChanges.subscribe(val => {
        this.to= this.datePipe.transform(val, 'yyyy-MM-dd') ||""

      });

    }

    get ads() {
      return this.customAdForm.controls["ads"] as FormArray;
    }

    createAds(ads:number){
      this.ads.clear()
      for(let i=0; i < ads ; i++) {
        this.ads.push(this.AdsForm);
      }
    }


    get getsecondaryForm() {
      return this.AdForm.controls["secondaryForm"]
    }
    set setsecondaryForm(form:FormGroup) {
      this.AdForm.controls["secondaryForm"] = new FormGroup(form.controls)
    }
  
  
    addForm(value: string):void{
      this.select= value
      // this.AdForm.controls["secondaryForm"] =  new FormGroup({})
      switch (value) {

        case "1":
            this.AdForm.controls["secondaryForm"] = new FormGroup(this.nowAdForm.controls)
            break;
        case "2":
            this.AdForm.controls["secondaryForm"] = new FormGroup(this.scheduleAdForm.controls)
            break;
        case "3":
            this.AdForm.controls["secondaryForm"] = new FormGroup(this.customAdForm.controls)
            break;
        default:
            this.AdForm.controls["secondaryForm"] = new FormGroup(this.nowAdForm.controls)
            break;
    }
      console.log(this.AdForm.controls['schedule'].touched)
  
    }

    fromTo(value:any) {
    //   let second= this.customAdForm.get('to')?.valueChanges.subscribe(val => {
    //     this.to= val
  
    //   });

    //  let frist= this.customAdForm.get('from')?.valueChanges.subscribe(val => {
    //     this.from= val

    //   });


      let dateTo =this.datePipe.transform(this.customAdForm.get('from')?.value, 'yyyy-MM-dd');
      let dateFrom =this.datePipe.transform(this.customAdForm.get('to')?.value, 'yyyy-MM-dd');
    

      if(this.from && this.to) {
        var date1 = new Date(this.from); 
        var date2 = new Date(this.to); 
        var Time = date2.getTime() - date1.getTime(); 
        var Days = Time / (1000 * 3600 * 24);
  
        this.createAds(Days)
      }
    }

    inputChanged(element: any) {
      console.log (element)
    }



    handleFileInput(event: any, index:number): void {
      
      const fileList = event.target.files;
      if (fileList.length > 0) {
        for (const file of fileList) {
          // console.log(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            // this.toasterService.loading('جارى رفع الملفات...');
            // this.AllFiles = [];

            const checkRoleExistence = (index:number) => this.AllFiles.some( ({id}) => id == index)

            if(checkRoleExistence(index) ==false) {
              console.log(false);
              this.AllFiles.push({fileResult: reader.result, file, name: file.name, id:index});
              console.log(this.AllFiles)


            }else {
              console.log(true);

            }
          };
          reader.onloadend = (ee) => {
            // this.toasterService.stopLoading();
          };
        }

        console.log(this.AllFiles)
      }
    }

    onSubmit(): void {
      console.log(this.AdForm)
    }


  }