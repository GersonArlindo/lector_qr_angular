import {QrScannerComponent} from 'angular2-qrscanner';
import {Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'scanner-ceu';

  @ViewChild(QrScannerComponent, { static: false }) qrScannerComponent!: QrScannerComponent;
 
  constructor() {
  }

  ngOnInit() {
  
  }

  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          console.log(videoDevices)
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
            console.log(choosenDev)
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[1]);
          }
      }
  });

  this.qrScannerComponent.capturedQr.subscribe(result => {
    this.title = result
      alert("Mi valor: " + result)
  });
  }
}
