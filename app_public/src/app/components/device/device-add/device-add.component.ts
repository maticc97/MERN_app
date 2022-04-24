import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {

  constructor() { }

  customer = "Customer1"; //get from URL


  ngOnInit(): void {
  }

}
