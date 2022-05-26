import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from "express";

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {

  public customerId: string;
  addDeviceForm: FormGroup;
  constructor(private route: ActivatedRoute, public fb: FormBuilder, private http: HttpClient) {
    this.addDeviceForm = this.fb.group({
      name: [''],
      customer_id: [''],
      type: [''],
      ip_address: [''],
      cli_username: [''],
      cli_password: [''],
      enable_password: ['']
    })
  }



  ngOnInit(): void {
    //get customerId from params
    this.addDeviceForm.patchValue({
      customer_id: [this.change_value()]
    })

    this.addDeviceForm.controls['customer_id'].disable();
  }

  change_value() {
    this.customerId = this.route.snapshot.paramMap.get('customerId')
    return this.customerId
  }

  onSubmit() {

    //build formData from new values
    var formData: any = new FormData();
    formData.append('customer', this.addDeviceForm.get('customer_id').value);
    formData.append('hostname', this.addDeviceForm.get('name').value);
    formData.append('type', this.addDeviceForm.get('type').value);
    formData.append('ip_address', this.addDeviceForm.get('ip_address').value);
    formData.append('cli_username', this.addDeviceForm.get('cli_username').value);
    formData.append('cli_password', this.addDeviceForm.get('cli_password').value);


    //convert to json and preapare for node.js
    const fields = {};
    formData.forEach(function (value, key) {
      fields[key] = value;
    });

    //post to this
    this.http.post('http://localhost:5000/api/v1/customers/' + this.customerId + '/devices', fields).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)


    )

  }

}
