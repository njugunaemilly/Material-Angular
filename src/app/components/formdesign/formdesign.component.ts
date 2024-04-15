import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formdesign',
  templateUrl: './formdesign.component.html',
  styleUrl: './formdesign.component.scss',
})
export class FormdesignComponent implements OnInit {
  countryList = ['Canada', 'India', 'Kenya', 'South Korea', 'Singapore'];
  termList = ['15 Days', '30 Days', '45 Days', '60 Days'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm.setValue({
      name: '',
      email: '',
      phone: '',
      country: '',
      term: '',
      address: '',
      dob: new Date(),
      gender: '',
      status: true
    });
  }

  customerForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    email: this.fb.control(
      '',
      Validators.compose([Validators.required, Validators.required])
    ),
    phone: this.fb.control('', Validators.required),
    country: this.fb.control('', Validators.required),
    address: this.fb.control('', Validators.required),
    term: this.fb.control('', Validators.required),
    dob: this.fb.control(new Date(2000, 2, 20)),
    gender: this.fb.control('Female'),
    status: this.fb.control(true),
  });

  saveCustomer() {
    console.log(this.customerForm.value);

   
  }
  clearForm(){
      this.customerForm.reset()
  }
}
