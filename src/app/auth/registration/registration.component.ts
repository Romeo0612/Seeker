import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatChipsModule } from '@angular/material/chips';

import { AuthService } from 'app/service/auth.service';
import { ApiService } from 'app/service/search.service';
import { SnackbarService } from 'app/service/dialog.service';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatChipsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  Seeker: any = true
  Company: any
  category: any;

  data: any
  constructor(private router: Router, private http: HttpClient, public authService: AuthService, private auth: ApiService, private fb: FormBuilder, private route: ActivatedRoute, private snackbarService: SnackbarService) {
    this.route.params.subscribe((xyz: any) => {
      let data = xyz['id']
      if (data == "Company") {
        this.Seeker = false;
        this.Company = true
      }
    })
    this.data = localStorage.getItem('cateory')
    if (this.data == 'Company') {
      this.category == 'Company'
    } else {
      this.category = 'Seeker'
    }
  }
  noSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value && (control.value as string).trim().length === 0) {
        return { 'noSpaceAtStartEnd': true };
      }
      if (control.value && (control.value as string).trim() !== control.value) {
        return { 'noSpaceAtStartEnd': true };
      }
      return null;
    };
  }
  noSpacesAtStartOrEnd(control: any) {
    if (control.value && (control.value[0] === ' ' || control.value[control.value.length - 1] === ' ')) {
      return { 'hasSpaces': true };
    }
    return null;
  }

  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    {


      const enteredDate = new Date(control.value);
      const today = new Date();
      const differenceInMilliseconds = Math.abs(today.getTime() - enteredDate.getTime());
      const differenceInYears = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));


      if (differenceInYears >= 18) {
        return null;
      } else {
        return { underage: true };
      }
    }
  }
  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputValue: string = control.value;
      if (inputValue && inputValue.trim().length < minLength) {
        return { 'minLength': { requiredLength: minLength, actualLength: inputValue.trim().length } };
      }
      return null;
    };
  }

  regis = new FormGroup({


    firstName: new FormControl("", [Validators.required, this.noSpacesAtStartOrEnd, Validators.pattern(/^[A-Za-z.]+( [A-Za-z.]+)*$/)]),
    lastName: new FormControl("", [Validators.required, this.noSpacesAtStartOrEnd, Validators.pattern(/^[A-Za-z.]+( [A-Za-z.]+)*$/)]),
    address: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), Validators.required]),
    password: new FormControl("", [this.noSpacesAtStartOrEnd, Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)]),
    role: new FormControl("Seeker"),
    phone: new FormControl("", [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]),
    dateofbirth: new FormControl("", [Validators.required, this.ageValidator]),
    education: new FormControl("", Validators.required),
    profile_pic: new FormControl(""),
    resume: new FormControl("")
  });

  // employee = new FormGroup({
  //   Name: new FormControl("", Validators.required),
  //   CompanyName: new FormControl("", Validators.required),
  //   email: new FormControl("", [Validators.email]),
  //   password: new FormControl("", [Validators.minLength(6),Validators.required]),
  //   phone: new FormControl("",Validators.required),
  // });
  trigger: boolean = false
  trigger1: boolean = true
  employee = this.fb.group({
    Name: ['', [Validators.required, this.minLengthValidator(3), this.noSpacesAtStartOrEnd, Validators.pattern(/^[A-Za-z.]+( [A-Za-z.]+)*$/)]],
    CompanyName: ['', [Validators.required, this.minLengthValidator(3), this.noSpacesAtStartOrEnd, Validators.pattern(/^[A-Za-z.]+( [A-Za-z.]+)*$/)]],
    email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), Validators.required, this.noSpacesAtStartOrEnd]],
    role: ["Company"],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/), this.noSpacesAtStartOrEnd]],
    phone: ["", [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
    street: ["", [Validators.required, this.noSpacesAtStartOrEnd]],
    area: ["", [Validators.required, this.noSpacesAtStartOrEnd]],
    pincode: ["", [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    districtname: ["", [Validators.required, this.noSpacesAtStartOrEnd]],
    statename: ["", [Validators.required, this.noSpacesAtStartOrEnd]],
    Company_banner: [""],
    Company_logo: [""],

    // ,
    // products:['']
  })
  uscpass: any
  check() {
    var password = document.getElementById("confirmPassword") as HTMLInputElement;
    this.uscpass = password.value;
    if (this.uscpass !== '' && this.employee.valid) {
      if (this.uscpass == this.functions.password.value) {
        this.trigger = true
        this.trigger1 = false
      }
    }
  }
  val: boolean = true
  my(event: any) {

    console.log(event.target.value);
    let value = event.target.value
    if (event.target.value.length == 6) {
      this.auth.GetByID("pincode", "pincode", value).subscribe((xyz: any) => {
        let data = xyz[0]
        console.log(xyz);

        this.employee.controls['districtname'].setValue(data.districtname)
        this.employee.controls['statename'].setValue(data.statename)
      })
    }

  }
  func5(role: string) {
    let userType: string;

    if (role === "Seeker") {
      userType = "Seeker";
    } else if (role === "Company") {
      userType = "Company";
    } else {
      // Handle the case where role is neither "seeker" nor "employer"
      console.error("Invalid role:", role);
      return; // Do not proceed further
    }

    localStorage.setItem("userType", userType);
    this.router.navigateByUrl('auth/login');
    console.log(this.regis.getRawValue());
    let value = this.regis.getRawValue()
    var phone: string = JSON.stringify(value.phone)
    value.phone = phone


    //  this.http.post("http://127.0.0.1:8080/auth/seekers-info",)
    this.auth.save('seekers_info', value).subscribe({
      next: (data: any) => {
        console.log(data.message);
        this.router.navigate(['/auth/login']);
        this.snackbarService.showErrorMessage('Registration complete successfully as Seeker ');

      }, error(err) {
        console.log(err);
        alert(err.message);

      }
    });
  }
  loginWithGoogle() {
    this.authService.GoogleAuth();
  }


  func() {
  }

  get first() {
    return this.regis.get('firstName');
  }
  get last() {
    return this.regis.get('lastName');
  }
  get emil() {
    return this.regis.get('email');
  }
  get emil1() {
    return this.employee.get('email');
  }
  get passwd() {
    return this.regis.get('password');
  }
  get phone() {
    return this.regis.get('phone');
  }
  get dob() {
    return this.regis.get('dateofbirth');
  }

  get rolee() {
    return this.regis.get('role')
  }
  get functions() {
    return this.employee.controls
  }
  get functions1() {
    return this.regis.controls
  }
  get add() {
    return this.regis.get('address');
  }
  submitForm(role: string) {
    let userType: string;

    if (role === "Seeker") {
      userType = "Seeker";
    } else if (role === "Company") {
      userType = "Company";
    } else {
      // Handle the case where role is neither "seeker" nor "employer"
      console.error("Invalid role:", role);
      return; // Do not proceed further
    }

    localStorage.setItem("userType", userType);
    this.router.navigateByUrl('auth/login');
    let value = this.employee.getRawValue()
    var phone: string = JSON.stringify(value.phone)
    value.phone = phone
    // this.http.post("http://127.0.0.1:8080/auth/seekers-info",value)
    this.auth.save('companies', value).subscribe({
      next: (data: any) => {
        console.log(data.message);
        this.router.navigate(['/auth/login']);
        this.snackbarService.showErrorMessage('Registration complete successfully as Employer ');


      }, error(err) {
        console.log(err);
        alert(err.message);

      }
    });
  }

  func3(role: string) {
    let userType: string;

    if (role === "Seeker") {
      userType = "Seeker";
    } else if (role === "Company") {
      userType = "Company";
    } else {
      // Handle the case where role is neither "seeker" nor "employer"
      console.error("Invalid role:", role);
      return; // Do not proceed further
    }

    localStorage.setItem("userType", userType);
    this.router.navigateByUrl('auth/login');
  }
}
