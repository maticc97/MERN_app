import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "src/app/api-data.service";
import { Customer, Device } from "../customer-master/customer-master.component";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'





@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editDevice_form: FormGroup

  name = new FormControl('')


  constructor(private APIDataService: APIDataService, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  public device!: Device;
  public param!: string;
  public customer!: Customer
  private getCustomerDetail(): void {
    this.APIDataService.getCustomerDetail(this.param).subscribe((customer) => this.customer = customer)
  }

  ngOnInit(): void {

    this.editDevice_form = this.formBuilder.group({
      name: new FormControl()
    })

    console.log(this.editDevice_form)

    console.log()
    this.param = this.route.snapshot.paramMap.get("customerId") as string;
    console.log(this.param)
    this.getCustomerDetail();
    console.log(this.editDevice_form.controls)


  }

  onSubmit() {
    const formData = new FormData();

    console.log(formData.get.arguments)



  }



}
